from llama_cpp import Llama

# Load Free AI Model
llm = Llama(model_path="LLaMA-2-7B.ggmlv3.q4_0.bin")

def get_trade_advice(query):
    return llm(query)

print(get_trade_advice("Should I invest in Tesla?"))
