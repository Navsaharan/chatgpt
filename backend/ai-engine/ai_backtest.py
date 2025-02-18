import numpy as np
import pandas as pd
import yfinance as yf
import json

# Load historical stock data
def fetch_stock_data(symbol):
    stock = yf.Ticker(symbol)
    data = stock.history(period="2y")
    return data

# Backtest AI Strategy
def backtest_ai(symbol):
    data = fetch_stock_data(symbol)
    
    balance = 100000
    holdings = 0
    trades = []
    win_count, loss_count = 0, 0

    for index, row in data.iterrows():
        price = row['Close']

        # AI Trading Logic: Buy if RSI < 30, Sell if RSI > 70
        rsi = np.random.randint(20, 80)  # Placeholder RSI value
        if rsi < 30 and balance > price:
            qty = balance // price
            balance -= qty * price
            holdings += qty
            trades.append({"date": index, "trade": "BUY", "price": price})

        elif rsi > 70 and holdings > 0:
            balance += holdings * price
            holdings = 0
            trades.append({"date": index, "trade": "SELL", "price": price})

            # Track performance
            if trades[-1]['price'] > trades[-2]['price']:
                win_count += 1
            else:
                loss_count += 1

    win_rate = (win_count / (win_count + loss_count)) * 100 if win_count + loss_count > 0 else 0

    return {"symbol": symbol, "win_rate": win_rate, "final_balance": balance, "trades": trades}

# Run Backtesting
if __name__ == "__main__":
    result = backtest_ai("RELIANCE.NS")
    print(json.dumps(result, indent=4))
