import requests
from bs4 import BeautifulSoup
from transformers import pipeline
import json

# Load FinBERT model
sentiment_analyzer = pipeline("sentiment-analysis", model="ProsusAI/finbert")

# Fetch financial news headlines
def get_financial_news(symbol):
    url = f"https://www.moneycontrol.com/news/tags/{symbol}.html"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    headlines = [headline.text for headline in soup.find_all("h2", class_="article_title")[:5]]
    return headlines

# Analyze sentiment of news headlines
def analyze_sentiment(symbol):
    headlines = get_financial_news(symbol)
    sentiments = sentiment_analyzer(headlines)

    positive_count = sum(1 for sentiment in sentiments if sentiment["label"] == "POSITIVE")
    negative_count = sum(1 for sentiment in sentiments if sentiment["label"] == "NEGATIVE")

    overall_sentiment = "BULLISH" if positive_count > negative_count else "BEARISH"

    return {"symbol": symbol, "sentiment": overall_sentiment, "headlines": headlines}

if __name__ == "__main__":
    result = analyze_sentiment("RELIANCE")
    print(json.dumps(result, indent=4))
import requests
from transformers import pipeline

sentiment_analyzer = pipeline("sentiment-analysis", model="ProsusAI/finbert")

def analyze_sentiment(news_headlines):
    sentiments = sentiment_analyzer(news_headlines)
    positive_count = sum(1 for s in sentiments if s["label"] == "POSITIVE")
    negative_count = sum(1 for s in sentiments if s["label"] == "NEGATIVE")
    return "BULLISH" if positive_count > negative_count else "BEARISH"

news = ["Apple releases strong earnings report", "Market crashes due to economic concerns"]
print(analyze_sentiment(news))  # Expected Output: "BULLISH" or "BEARISH"
