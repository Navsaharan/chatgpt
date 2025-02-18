import numpy as np
import pandas as pd
import random

# Simulated past trade data
trade_data = pd.DataFrame({
    "trade": ["BUY", "SELL", "BUY", "SELL"],
    "profit": [200, -150, 400, -100]
})

# AI Learning Algorithm
class ReinforcementLearningAI:
    def __init__(self):
        self.memory = []
        self.alpha = 0.1
        self.gamma = 0.9
        self.q_table = {}

    def update_q_value(self, state, action, reward):
        if state not in self.q_table:
            self.q_table[state] = { "BUY": 0, "SELL": 0 }
        self.q_table[state][action] += self.alpha * (reward + self.gamma * max(self.q_table[state].values()))

    def train(self, data):
        for _, row in data.iterrows():
            self.update_q_value("market", row["trade"], row["profit"])

    def predict_trade(self):
        return max(self.q_table["market"], key=self.q_table["market"].get)

# Train AI & Predict Next Trade
ai = ReinforcementLearningAI()
ai.train(trade_data)
next_trade = ai.predict_trade()

print({"next_trade": next_trade})
