import pandas as pd
import yfinance as yf
from transformers import pipeline

sentiment_analyzer = pipeline("sentiment-analysis", model="ProsusAI/finbert")

def generate_market_report(symbol):
    stock = yf.Ticker(symbol)
    price_data = stock.history(period="1mo")["Close"]
    sentiment = sentiment_analyzer([f"Stock {symbol} latest news shows strong growth"])
    return {"stock": symbol, "price_trend": price_data.pct_change().sum(), "sentiment": sentiment[0]["label"]}

print(generate_market_report("AAPL"))  # Expected Output: Market Trend & Sentiment Report
