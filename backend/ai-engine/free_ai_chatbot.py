import requests

def get_trade_advice(query):
    url = "https://api.open-assistant.io/generate"
    response = requests.post(url, json={"prompt": query, "max_length": 50})
    return response.json()["text"]

print(get_trade_advice("What are the best stocks to buy this week?"))
