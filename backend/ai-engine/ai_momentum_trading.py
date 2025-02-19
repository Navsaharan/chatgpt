import numpy as np
import pandas as pd

def momentum_strategy(prices):
    returns = prices.pct_change()
    momentum = returns.rolling(window=10).sum()
    return "BUY" if momentum.iloc[-1] > 0 else "SELL"

data = pd.Series([100, 102, 105, 110, 108, 112, 115, 120, 125, 130])
print(momentum_strategy(data))  # Expected Output: "BUY" or "SELL"
