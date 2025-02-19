import numpy as np

class VWAPExecution:
    def __init__(self):
        self.trades = []

    def execute_trade(self, stock, price, volume, market_volume):
        vwap_price = sum(trade["price"] * trade["volume"] for trade in self.trades) / sum(trade["volume"] for trade in self.trades)
        self.trades.append({"stock": stock, "price": price, "volume": volume})
        return vwap_price

vwap = VWAPExecution()
print(vwap.execute_trade("AAPL", 150, 1000, 500000))  # Expected Output: VWAP Price
