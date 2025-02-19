import numpy as np

class SmartExecutionAI:
    def __init__(self):
        self.exchanges = {"NYSE": 0.8, "NASDAQ": 0.6, "LSE": 1.0}

    def best_execution(self):
        return min(self.exchanges, key=self.exchanges.get)

ai_execution = SmartExecutionAI()
print(ai_execution.best_execution())  # Expected Output: "NASDAQ"
