import numpy as np
import pandas as pd
import yfinance as yf
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from sklearn.preprocessing import MinMaxScaler
import json

# Load stock data
def fetch_stock_data(symbol):
    stock = yf.Ticker(symbol)
    data = stock.history(period="2y")['Close']
    return data

# Prepare data for LSTM model
def prepare_data(data):
    scaler = MinMaxScaler(feature_range=(0, 1))
    data_scaled = scaler.fit_transform(data.values.reshape(-1, 1))
    
    X, Y = [], []
    for i in range(60, len(data_scaled)):
        X.append(data_scaled[i-60:i, 0])
        Y.append(data_scaled[i, 0])

    X, Y = np.array(X), np.array(Y)
    X = np.reshape(X, (X.shape[0], X.shape[1], 1))  # LSTM input shape

    return X, Y, scaler

# Train LSTM model
def train_lstm(symbol):
    data = fetch_stock_data(symbol)
    X, Y, scaler = prepare_data(data)

    model = Sequential([
        LSTM(50, return_sequences=True, input_shape=(X.shape[1], 1)),
        LSTM(50, return_sequences=False),
        Dense(25),
        Dense(1)
    ])

    model.compile(optimizer="adam", loss="mean_squared_error")
    model.fit(X, Y, epochs=5, batch_size=32, verbose=1)

    return model, scaler

# Predict future stock prices
def predict_stock(symbol):
    model, scaler = train_lstm(symbol)
    data = fetch_stock_data(symbol)
    X, _, _ = prepare_data(data)

    prediction = model.predict(X[-1].reshape(1, X.shape[1], 1))
    predicted_price = scaler.inverse_transform(prediction)[0][0]

    return {"symbol": symbol, "predicted_price": predicted_price}

if __name__ == "__main__":
    result = predict_stock("RELIANCE.NS")
    print(json.dumps(result, indent=4))
