import tensorflow as tf
import numpy as np
import pandas as pd
import yfinance as yf
import json

# Load stock data
def fetch_stock_data(symbol):
    stock = yf.Ticker(symbol)
    data = stock.history(period="2y")["Close"]
    return data

# Train AI Model on Cloud GPU
def train_ai_model(symbol):
    data = fetch_stock_data(symbol)
    X = np.array([data[i-60:i] for i in range(60, len(data))])
    Y = np.array([1 if data[i] > data[i-1] else 0 for i in range(60, len(data))])

    # Use Google Cloud TPU / AWS GPU
    strategy = tf.distribute.MirroredStrategy()
    with strategy.scope():
        model = tf.keras.Sequential([
            tf.keras.layers.LSTM(64, return_sequences=True, input_shape=(60, 1)),
            tf.keras.layers.LSTM(64),
            tf.keras.layers.Dense(25, activation="relu"),
            tf.keras.layers.Dense(1, activation="sigmoid")
        ])
        model.compile(optimizer="adam", loss="binary_crossentropy")

    model.fit(X, Y, epochs=10, batch_size=32)
    return {"status": "AI Model Training Completed on Cloud GPU"}

if __name__ == "__main__":
    result = train_ai_model("RELIANCE.NS")
    print(json.dumps(result, indent=4))
