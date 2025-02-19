import numpy as np

class OrderFlowAI:
    def __init__(self):
        self.orders = []

    def predict_order_flow(self, recent_trades):
        buy_orders = sum(1 for trade in recent_trades if trade["trade_type"] == "BUY")
        sell_orders = sum(1 for trade in recent_trades if trade["trade_type"] == "SELL")
        return "BUY" if buy_orders > sell_orders else "SELL"

ai_order_flow = OrderFlowAI()
print(ai_order_flow.predict_order_flow([{"trade_type": "BUY"}, {"trade_type": "SELL"}, {"trade_type": "BUY"}]))  # Expected Output: "BUY"
