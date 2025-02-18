import numpy as np
import pandas as pd
import yfinance as yf
from sklearn.ensemble import IsolationForest
import json

# Load historical stock data
def fetch_stock_data(symbol):
    stock = yf.Ticker(symbol)
    data = stock.history(period="6mo")
    return data

# Detect anomalies using Isolation Forest (unsupervised learning)
def detect_anomalies(symbol):
    data = fetch_stock_data(symbol)
    model = IsolationForest(contamination=0.05)
    data["anomaly"] = model.fit_predict(data[["Close"]])

    anomaly_dates = data[data["anomaly"] == -1].index.tolist()
    return {"symbol": symbol, "anomalies": anomaly_dates}

if __name__ == "__main__":
    result = detect_anomalies("RELIANCE.NS")
    print(json.dumps(result, indent=4))
