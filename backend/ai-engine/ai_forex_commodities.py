import numpy as np

class ForexCommodityAI:
    def __init__(self):
        self.trend_data = {"EUR/USD": 1.12, "Gold": 1850}

    def predict_forex_trend(self, pair):
        return "BUY" if self.trend_data[pair] > 1.10 else "SELL"

ai_forex = ForexCommodityAI()
print(ai_forex.predict_forex_trend("EUR/USD"))  # Expected Output: "BUY" or "SELL"
