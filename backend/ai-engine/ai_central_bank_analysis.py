import requests
import json

def fetch_central_bank_news():
    response = requests.get("https://newsapi.org/v2/everything?q=central%20bank&apiKey=YOUR_NEWS_API_KEY")
    return json.loads(response.text)["articles"][:5]

news = fetch_central_bank_news()
print(news)  # Expected Output: Top 5 News Articles on Central Banks
