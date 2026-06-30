import json, re, os, tempfile, subprocess, torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel

MODEL_ID = "Qwen/Qwen2.5-1.5B-Instruct"
ADAPTER = "qwen_cp_lora"

PROMPT = """Ești un asistent de programare competitivă. Rezolvă problema de mai jos. Răspunde doar cu o soluție C++ completă, care citește din stdin și scrie la stdout, într-un bloc ```cpp.

Problemă:
{description}"""

_CPP_FENCE = re.compile(r"```(?:cpp|c\+\+)?\s*\n(.*?)```", re.DOTALL | re.IGNORECASE)
MEM_LIMIT_KB = 512 * 1024
TIME_LIMIT_S = 2

def extract_cpp(text):
    m = _CPP_FENCE.search(text)
    return m.group(1) if m else text

def judge(cpp_code, tests):
    code = extract_cpp(cpp_code)
    with tempfile.TemporaryDirectory() as d:
        src = os.path.join(d, "sol.cpp"); binp = os.path.join(d, "sol")
        open(src, "w").write(code)
        comp = subprocess.run(["g++","-O2","-std=c++17",src,"-o",binp], capture_output=True, text=True, timeout=60)
        if comp.returncode != 0:
            return {"status":"CE","solved":False}
        for t in tests:
            try:
                run = subprocess.run(["bash","-c",f"ulimit -v {MEM_LIMIT_KB}; exec '{binp}'"],
                                     input=t["input"], capture_output=True, text=True, timeout=TIME_LIMIT_S)
            except subprocess.TimeoutExpired:
                return {"status":"TLE","solved":False}
            if run.returncode != 0:
                return {"status":"RE","solved":False}
            if run.stdout.rstrip() != (t["output"] or "").rstrip():
                return {"status":"WA","solved":False}
        return {"status":"OK","solved":True}

tok = AutoTokenizer.from_pretrained(MODEL_ID)
base = AutoModelForCausalLM.from_pretrained(MODEL_ID, torch_dtype=torch.bfloat16, device_map="cuda")
model = PeftModel.from_pretrained(base, ADAPTER)
model.eval()

data = json.load(open("eval_set.json"))
completions = []
for idx, it in enumerate(data):
    msg = [{"role":"user","content":PROMPT.format(description=it["description"])}]
    text = tok.apply_chat_template(msg, tokenize=False, add_generation_prompt=True)
    inputs = tok(text, return_tensors="pt").to("cuda")
    with torch.no_grad():
        out = model.generate(**inputs, max_new_tokens=1536, do_sample=False, pad_token_id=tok.eos_token_id)
    completions.append(tok.decode(out[0][inputs["input_ids"].shape[1]:], skip_special_tokens=True))
    if (idx+1) % 10 == 0:
        print(f"generated {idx+1}/{len(data)}")

results, solved_n = [], 0
for it, comp in zip(data, completions):
    v = judge(comp, it["tests"])
    solved_n += v["solved"]
    results.append({"name":it["name"], "solved":v["solved"], "status":v["status"]})

json.dump(results, open("finetuned_results.json","w"), indent=2)
n = len(data)
print("="*40)
print(f"pass@1 (fine-tuned) = {solved_n}/{n} = {solved_n/n:.1%}")
print("="*40)
