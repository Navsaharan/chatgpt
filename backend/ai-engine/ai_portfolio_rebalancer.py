import numpy as np

class PortfolioRebalancer:
    def __init__(self):
        self.allocations = {"equities": 50, "bonds": 30, "alternatives": 20}

    def rebalance_portfolio(self, market_conditions):
        if market_conditions == "BULL":
            self.allocations["equities"] += 10
            self.allocations["bonds"] -= 5
        elif market_conditions == "BEAR":
            self.allocations["bonds"] += 10
            self.allocations["equities"] -= 5
        return self.allocations

rebalance_ai = PortfolioRebalancer()
print(rebalance_ai.rebalance_portfolio("BULL"))  # Expected Output: Adjusted Portfolio Allocations
