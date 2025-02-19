import numpy as np

class MarketMakerAI:
    def __init__(self, base_spread=0.05):
        self.base_spread = base_spread

    def adjust_spread(self, volatility):
        return self.base_spread + (volatility * 0.02)

    def place_orders(self, stock_price, volatility):
        spread = self.adjust_spread(volatility)
        bid_price = stock_price - (spread / 2)
        ask_price = stock_price + (spread / 2)
        return {"bid": bid_price, "ask": ask_price, "spread": spread}

market_maker = MarketMakerAI()
print(market_maker.place_orders(100, 2))  # Expected Output: {'bid': 99.98, 'ask': 100.02, 'spread': 0.09}
