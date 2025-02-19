import numpy as np

class LiquidityAggregator:
    def __init__(self):
        self.exchanges = {
            "NYSE": {"latency": 0.8, "spread": 0.02},
            "NASDAQ": {"latency": 0.6, "spread": 0.015},
            "LSE": {"latency": 1.0, "spread": 0.025}
        }

    def best_liquidity_source(self):
        return min(self.exchanges, key=lambda x: self.exchanges[x]["latency"] + self.exchanges[x]["spread"])

liquidity_ai = LiquidityAggregator()
print(liquidity_ai.best_liquidity_source())  # Expected Output: "NASDAQ"
