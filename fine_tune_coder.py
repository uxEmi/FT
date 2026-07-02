import json, torch
from datasets import Dataset
from transformers import (AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig,
                          TrainingArguments, Trainer, DataCollatorForSeq2Seq)
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training

MODEL_ID = "Qwen/Qwen2.5-Coder-7B-Instruct"
MAXLEN = 1024

tok = AutoTokenizer.from_pretrained(MODEL_ID)
if tok.pad_token is None:
    tok.pad_token = tok.eos_token

data = json.load(open("train.json"))
ds = Dataset.from_list(data)

def tokenize(ex):
    text = tok.apply_chat_template(ex["messages"], tokenize=False, add_generation_prompt=False)
    out = tok(text, truncation=True, max_length=MAXLEN)
    out["labels"] = out["input_ids"].copy()
    return out

ds = ds.map(tokenize, remove_columns=ds.column_names)

bnb = BitsAndBytesConfig(
    load_in_4bit=True, bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16, bnb_4bit_use_double_quant=True,
)
model = AutoModelForCausalLM.from_pretrained(MODEL_ID, quantization_config=bnb, device_map={"": 0})
model.config.use_cache = False
model = prepare_model_for_kbit_training(model, use_gradient_checkpointing=True)

lora = LoraConfig(
    r=16, lora_alpha=32, lora_dropout=0.05, task_type="CAUSAL_LM",
    target_modules=["q_proj","k_proj","v_proj","o_proj","gate_proj","up_proj","down_proj"],
)
model = get_peft_model(model, lora)
model.print_trainable_parameters()

args = TrainingArguments(
    output_dir="lora_out",
    per_device_train_batch_size=1,
    gradient_accumulation_steps=16,
    num_train_epochs=1,
    learning_rate=2e-4,
    warmup_ratio=0.03,
    lr_scheduler_type="cosine",
    bf16=True,
    logging_steps=10,
    save_strategy="epoch",
    report_to="none",
)

collator = DataCollatorForSeq2Seq(tok, padding=True, label_pad_token_id=-100)
trainer = Trainer(model=model, args=args, train_dataset=ds, data_collator=collator)
trainer.train()

model.save_pretrained("coder_cp_lora")
tok.save_pretrained("coder_cp_lora")
print("Saved LoRA adapter to coder_cp_lora/")
