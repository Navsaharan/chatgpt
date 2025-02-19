import numpy as np
import pandas as pd
import yfinance as yf
import tensorflow as tf

def fetch_market_data(symbol):
    stock = yf.Ticker(symbol)
    return stock.history(period="6mo")["Close"]

def train_ai_model(symbol):
    data = fetch_market_data(symbol)
    X = np.array([data[i-60:i] for i in range(60, len(data))])
    Y = np.array([data[i] for i in range(60, len(data))])

    model = tf.keras.Sequential([
        tf.keras.layers.LSTM(50, return_sequences=True, input_shape=(60, 1)),
        tf.keras.layers.LSTM(50),
        tf.keras.layers.Dense(25),
        tf.keras.layers.Dense(1)
    ])

    model.compile(optimizer="adam", loss="mean_squared_error")
    model.fit(X, Y, epochs=10, batch_size=32, verbose=1)

    model.save(f"./models/{symbol}_ai_model.h5")

if __name__ == "__main__":
    train_ai_model("RELIANCE.NS")
