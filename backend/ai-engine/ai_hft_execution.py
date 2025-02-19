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
import time
import numpy as np

class AIHFTExecution:
    def __init__(self):
        self.order_book = []

    def execute_trade(self, stock, price, quantity):
        execution_time = np.random.uniform(0.1, 0.5)  # Simulating microsecond execution
        time.sleep(execution_time / 1000)
        trade = {"stock": stock, "price": price, "quantity": quantity, "latency": execution_time}
        self.order_book.append(trade)
        return trade

hft_ai = AIHFTExecution()
print(hft_ai.execute_trade("AAPL", 150, 1000))  # Expected Output: Trade Execution Details
