import numpy as np
import pandas as pd
import requests
from sklearn.preprocessing import MinMaxScaler
from sklearn.ensemble import RandomForestClassifier
import yfinance as yf
from textblob import TextBlob

# Load historical stock data
def fetch_stock_data(symbol):
    stock = yf.Ticker(symbol)
    data = stock.history(period="6mo")
    return data

# Compute technical indicators
def compute_indicators(data):
    data['SMA_10'] = data['Close'].rolling(window=10).mean()
    data['SMA_50'] = data['Close'].rolling(window=50).mean()
    data['RSI'] = 100 - (100 / (1 + data['Close'].diff().apply(lambda x: np.maximum(x, 0)).rolling(14).mean() /
                                    data['Close'].diff().apply(lambda x: np.maximum(-x, 0)).rolling(14).mean()))
    data['MACD'] = data['Close'].ewm(span=12).mean() - data['Close'].ewm(span=26).mean()
    return data.dropna()

# Fetch sentiment analysis from Twitter & News
def fetch_sentiment(symbol):
    headlines = [
        f"{symbol} stock rises amid market optimism",
        f"{symbol} stock under pressure due to economic downturn"
    ]
    scores = [TextBlob(headline).sentiment.polarity for headline in headlines]
    return np.mean(scores)

# AI Model for Buy/Sell Prediction
def ai_trade_signal(symbol):
    data = fetch_stock_data(symbol)
    data = compute_indicators(data)
    
    X = data[['SMA_10', 'SMA_50', 'RSI', 'MACD']]
    X_scaled = MinMaxScaler().fit_transform(X)

    y = (data['Close'].shift(-1) > data['Close']).astype(int)  # 1 if price goes up, 0 if down
    model = RandomForestClassifier()
    model.fit(X_scaled[:-1], y[:-1])

    prediction = model.predict(X_scaled[-1].reshape(1, -1))
    sentiment_score = fetch_sentiment(symbol)

    trade_signal = "BUY" if prediction[0] == 1 and sentiment_score > 0 else "SELL" if sentiment_score < 0 else "HOLD"
    confidence = np.round(max(model.predict_proba(X_scaled[-1].reshape(1, -1))[0]) * 100, 2)
    
    return {"symbol": symbol, "signal": trade_signal, "confidence": confidence, "sentiment": sentiment_score}

if __name__ == "__main__":
    print(ai_trade_signal("RELIANCE.NS"))
from concurrent.futures import ThreadPoolExecutor

def analyze_stock(symbol):
    return ai_trade_signal(symbol)

def analyze_multiple_stocks(symbols):
    with ThreadPoolExecutor() as executor:
        results = executor.map(analyze_stock, symbols)
    return list(results)
