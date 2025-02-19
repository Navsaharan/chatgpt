import numpy as np
import time

class HighFrequencyTrading:
    def __init__(self):
        self.order_book = []

    def execute_trade(self, stock, trade_type, price, quantity):
        execution_time = np.random.uniform(0.1, 1.0)  # Simulate latency in milliseconds
        time.sleep(execution_time / 1000)
        trade = {"stock": stock, "trade_type": trade_type, "price": price, "quantity": quantity, "latency": execution_time}
        self.order_book.append(trade)
        return trade

hft = HighFrequencyTrading()
print(hft.execute_trade("AAPL", "BUY", 150, 100))
