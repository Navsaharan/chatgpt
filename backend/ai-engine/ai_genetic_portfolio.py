import numpy as np

def genetic_portfolio_optimization(portfolio):
    best_portfolio = max(portfolio, key=lambda x: x["return"] / x["risk"])
    return best_portfolio

portfolios = [{"assets": ["AAPL", "GOOGL"], "return": 10, "risk": 5}, {"assets": ["TSLA", "MSFT"], "return": 8, "risk": 3}]
print(genetic_portfolio_optimization(portfolios))  # Expected Output: Optimal Portfolio
