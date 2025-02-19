import numpy as np

class MarketMaker:
    def __init__(self, spread=0.05):
        self.spread = spread

    def place_orders(self, stock_price):
        bid_price = stock_price - (self.spread / 2)
        ask_price = stock_price + (self.spread / 2)
        return {"bid": bid_price, "ask": ask_price}

mm = MarketMaker()
print(mm.place_orders(100))  # Expected Output: {'bid': 99.975, 'ask': 100.025}
