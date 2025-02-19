import numpy as np
import pandas as pd
import yfinance as yf
import cvxpy as cp

def optimize_portfolio(stocks):
    data = {s: yf.Ticker(s).history(period="1y")["Close"] for s in stocks}
    df = pd.DataFrame(data)

    returns = df.pct_change().dropna()
    mean_returns = returns.mean()
    cov_matrix = returns.cov()

    weights = cp.Variable(len(stocks))
    expected_return = mean_returns @ weights
    risk = cp.quad_form(weights, cov_matrix)

    problem = cp.Problem(cp.Maximize(expected_return - 0.5 * risk), [cp.sum(weights) == 1, weights >= 0])
    problem.solve()

    return dict(zip(stocks, weights.value))

print(optimize_portfolio(["RELIANCE.NS", "TCS.NS", "INFY.NS"]))
