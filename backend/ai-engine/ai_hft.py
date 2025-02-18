import numpy as np
import pandas as pd
import gym
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM
import json
import yfinance as yf

# Fetch live stock data
def fetch_live_data(symbol):
    stock = yf.Ticker(symbol)
    data = stock.history(period="1d", interval="1m")
    return data

# Create AI HFT Model
class HFT_AI:
    def __init__(self):
        self.model = self.build_model()

    def build_model(self):
        model = Sequential([
            LSTM(50, return_sequences=True, input_shape=(60, 1)),
            LSTM(50),
            Dense(25, activation="relu"),
            Dense(1, activation="sigmoid")  # Predict Buy/Sell probability
        ])
        model.compile(optimizer="adam", loss="binary_crossentropy")
        return model

    def train_model(self, data):
        X = np.array([data[i-60:i] for i in range(60, len(data))])
        Y = np.array([1 if data[i] > data[i-1] else 0 for i in range(60, len(data))])
        self.model.fit(X, Y, epochs=5, batch_size=32, verbose=1)

    def predict_trade(self, data):
        X = np.array(data[-60:]).reshape(1, 60, 1)
        prediction = self.model.predict(X)
        return "BUY" if prediction[0][0] > 0.5 else "SELL"

# Run AI HFT Model
def run_hft(symbol):
    ai = HFT_AI()
    data = fetch_live_data(symbol)["Close"].values
    ai.train_model(data)
    trade_signal = ai.predict_trade(data)
    return {"symbol": symbol, "trade_signal": trade_signal}

if __name__ == "__main__":
    result = run_hft("RELIANCE.NS")
    print(json.dumps(result, indent=4))
