import numpy as np
import pandas as pd
import yfinance as yf
import json

# Load stock data (live or historical)
def fetch_stock_data(symbol, period="6mo"):
    stock = yf.Ticker(symbol)
    data = stock.history(period=period)
    return data

# Simulate AI Trading
def simulate_trading(symbol, initial_balance=100000):
    data = fetch_stock_data(symbol)
    balance = initial_balance
    holdings = 0
    trades = []

    for index, row in data.iterrows():
        price = row['Close']
        
        # Simple AI Logic: Buy if price drops 2%, sell if price rises 3%
        if len(trades) > 0 and (price / trades[-1]['price'] - 1) > 0.03:
            balance += holdings * price
            holdings = 0
            trades.append({"date": index, "trade": "SELL", "price": price})

        elif len(trades) == 0 or (price / trades[-1]['price'] - 1) < -0.02:
            qty = balance // price
            balance -= qty * price
            holdings += qty
            trades.append({"date": index, "trade": "BUY", "price": price})

    return {"symbol": symbol, "final_balance": balance, "trades": trades}

# Run Paper Trading Simulation
if __name__ == "__main__":
    result = simulate_trading("RELIANCE.NS")
    print(json.dumps(result, indent=4))
