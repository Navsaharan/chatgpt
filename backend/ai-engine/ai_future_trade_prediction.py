import numpy as np
import pandas as pd
import yfinance as yf
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

# Fetch Stock Data
def fetch_stock_data(symbol):
    stock = yf.Ticker(symbol)
    data = stock.history(period="2y")["Close"]
    return data

# Train LSTM Model
def train_lstm(symbol):
    data = fetch_stock_data(symbol)
    X = np.array([data[i-60:i] for i in range(60, len(data))])
    Y = np.array([data[i] for i in range(60, len(data))])

    model = Sequential([
        LSTM(50, return_sequences=True, input_shape=(60, 1)),
        LSTM(50),
        Dense(25),
        Dense(1)
    ])

    model.compile(optimizer="adam", loss="mean_squared_error")
    model.fit(X, Y, epochs=5, batch_size=32, verbose=1)

    return model

# Predict Future Price
def predict_price(symbol):
    model = train_lstm(symbol)
    data = fetch_stock_data(symbol)
    X = np.array(data[-60:]).reshape(1, 60, 1)
    prediction = model.predict(X)
    return {"symbol": symbol, "predicted_price": float(prediction[0][0])}

if __name__ == "__main__":
    print(predict_price("RELIANCE.NS"))
