import numpy as np
import pandas as pd
import yfinance as yf
import cvxpy as cp
import json

# Fetch historical stock data
def fetch_stock_data(symbols):
    data = {}
    for symbol in symbols:
        stock = yf.Ticker(symbol)
        data[symbol] = stock.history(period="1y")["Close"]
    return pd.DataFrame(data)

# Optimize portfolio using Modern Portfolio Theory (MPT)
def optimize_portfolio(symbols):
    data = fetch_stock_data(symbols)
    returns = data.pct_change().dropna()

    # Calculate expected returns and covariance matrix
    mean_returns = returns.mean()
    cov_matrix = returns.cov()

    # Define optimization variables
    weights = cp.Variable(len(symbols))
    expected_return = mean_returns @ weights
    risk = cp.quad_form(weights, cov_matrix)

    # Optimization objective: maximize return while minimizing risk
    objective = cp.Maximize(expected_return - 0.5 * risk)
    constraints = [cp.sum(weights) == 1, weights >= 0]  # Ensure weights sum to 1

    problem = cp.Problem(objective, constraints)
    problem.solve()

    optimized_weights = weights.value
    portfolio = {symbols[i]: optimized_weights[i] for i in range(len(symbols))}
    return {"optimized_portfolio": portfolio}

# Run AI Portfolio Optimization
if __name__ == "__main__":
    symbols = ["RELIANCE.NS", "TCS.NS", "INFY.NS"]
    result = optimize_portfolio(symbols)
    print(json.dumps(result, indent=4))
