import numpy as np

class AITradeAutomation:
    def __init__(self):
        self.positions = {}

    def execute_trade(self, stock, price, quantity):
        trade_type = "BUY" if np.random.random() > 0.5 else "SELL"
        self.positions[stock] = self.positions.get(stock, 0) + (quantity if trade_type == "BUY" else -quantity)
        return {"stock": stock, "trade_type": trade_type, "quantity": quantity, "new_position": self.positions[stock]}

ai_trader = AITradeAutomation()
print(ai_trader.execute_trade("AAPL", 150, 1000))
