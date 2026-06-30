HF_TOKEN = "hf_PASTE_YOURS_HERE"

import json
from huggingface_hub import login
from datasets import load_dataset

if HF_TOKEN.startswith("hf_"):
    login(HF_TOKEN)

CPP_LANG = 2

def build_eval_set(out_path="eval_set.json", n=100, scan_cap=60000):
    items, scanned = [], 0
    ds = load_dataset("deepmind/code_contests", split="train", streaming=True)
    for ex in ds:
        scanned += 1
        if scanned % 1000 == 0:
            print(f"scanned {scanned}, kept {len(items)}")
        if scanned > scan_cap:
            break
        idx = (ex.get("cf_index") or "").upper()
        if not (idx.startswith("A") or idx.startswith("B")):
            continue
        tests = []
        for bucket in ("public_tests", "private_tests"):
            b = ex.get(bucket) or {}
            for inp, out in zip(b.get("input", []), b.get("output", [])):
                tests.append({"input": inp, "output": out})
        if len(tests) < 1:
            continue
        ref_cpp = None
        sol = ex.get("solutions") or {}
        for lang, code in zip(sol.get("language", []), sol.get("solution", [])):
            if lang == CPP_LANG:
                ref_cpp = code
                break
        if ref_cpp is None:
            continue
        items.append({"name": ex["name"], "description": ex["description"],
                      "tests": tests, "reference_cpp": ref_cpp})
        if len(items) >= n:
            break
    with open(out_path, "w") as f:
        json.dump(items, f)
    total_tests = sum(len(it["tests"]) for it in items)
    print(f"\neval_set.json: {len(items)} problems, {total_tests} total test cases")
    print(f"with reference_cpp: {sum(1 for it in items if it['reference_cpp'])}/{len(items)}")
    return items

build_eval_set()


import re, os, tempfile, subprocess

_CPP_FENCE = re.compile(r"```(?:cpp|c\+\+)?\s*\n(.*?)```", re.DOTALL | re.IGNORECASE)

def extract_cpp(text):
    m = _CPP_FENCE.search(text)
    return m.group(1) if m else text

MEM_LIMIT_KB = 512 * 1024
TIME_LIMIT_S = 2

def judge(cpp_code, tests):
    code = extract_cpp(cpp_code)
    with tempfile.TemporaryDirectory() as d:
        src = os.path.join(d, "sol.cpp")
        binp = os.path.join(d, "sol")
        with open(src, "w") as f:
            f.write(code)
        comp = subprocess.run(
            ["g++", "-O2", "-std=c++17", src, "-o", binp],
            capture_output=True, text=True, timeout=60,
        )
        if comp.returncode != 0:
            return {"status": "CE", "solved": False}
        for t in tests:
            try:
                run = subprocess.run(
                    ["bash", "-c", f"ulimit -v {MEM_LIMIT_KB}; exec '{binp}'"],
                    input=t["input"], capture_output=True, text=True,
                    timeout=TIME_LIMIT_S,
                )
            except subprocess.TimeoutExpired:
                return {"status": "TLE", "solved": False}
            if run.returncode != 0:
                return {"status": "RE", "solved": False}
            got = run.stdout.rstrip()
            exp = (t["output"] or "").rstrip()
            if got != exp:
                return {"status": "WA", "solved": False}
        return {"status": "OK", "solved": True}


def validate_harness():
    data = json.load(open("eval_set.json"))
    have = [it for it in data if it["reference_cpp"]]
    solved = 0
    for it in have:
        solved += judge(it["reference_cpp"], it["tests"])["solved"]
    rate = solved / len(have) if have else 0.0
    print(f"Harness validation on references: {solved}/{len(have)} = {rate:.1%}")
    return rate

validate_harness()


import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

PROMPT_TEMPLATE = """Ești un tutore de programare competitivă. Pentru problema de mai jos, răspunde EXACT în acest format, în limba română:
[Enunț] <reformulează pe scurt problema>
[Abordare] <explică ideea de rezolvare>
[Complexitate] O(...) timp, O(...) spațiu
[Cod]
```cpp
  <soluție C++ completă, care citește din stdin și scrie la stdout>
```

Problemă:
{description}"""

data = json.load(open("eval_set.json"))
model_id = "Qwen/Qwen2.5-1.5B-Instruct"
tok = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id, torch_dtype=torch.bfloat16, device_map="cuda")
model.eval()

completions = []
for idx, it in enumerate(data):
    msg = [{"role": "user", "content": PROMPT_TEMPLATE.format(description=it["description"])}]
    text = tok.apply_chat_template(msg, tokenize=False, add_generation_prompt=True)
    inputs = tok(text, return_tensors="pt").to("cuda")
    with torch.no_grad():
        out = model.generate(**inputs, max_new_tokens=1536, do_sample=False, pad_token_id=tok.eos_token_id)
    gen = out[0][inputs["input_ids"].shape[1]:]
    completions.append(tok.decode(gen, skip_special_tokens=True))
    if (idx + 1) % 10 == 0:
        print(f"generated {idx + 1}/100")

json.dump(completions, open("completions.json", "w"))
print(f"Generated {len(completions)} completions")


_FMT_CHECKS = [
    re.compile(r"\[Enun[țt]\]"),
    re.compile(r"\[Abordare\]"),
    re.compile(r"\[Complexitate\]"),
    re.compile(r"\[Cod\]"),
    re.compile(r"```(?:cpp|c\+\+)?\s*\n.*?```", re.DOTALL | re.IGNORECASE),
    re.compile(r"O\(.*?\)"),
]

def format_ok(text):
    return all(p.search(text) for p in _FMT_CHECKS)

def score_and_report():
    data = json.load(open("eval_set.json"))
    completions = json.load(open("completions.json"))
    results, solved_n, fmt_n = [], 0, 0
    for it, comp in zip(data, completions):
        v = judge(comp, it["tests"])
        f_ok = format_ok(comp)
        solved_n += v["solved"]
        fmt_n += f_ok
        results.append({"name": it["name"], "solved": v["solved"],
                        "status": v["status"], "format_ok": f_ok})
    json.dump(results, open("baseline_results.json", "w"), indent=2)
    n = len(data)
    print("=" * 40)
    print(f"pass@1           = {solved_n}/{n} = {solved_n/n:.1%}")
    print(f"format_adherence = {fmt_n}/{n} = {fmt_n/n:.1%}")
    print("=" * 40)

score_and_report()
