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
import numpy as np
import tensorflow as tf

class ReinforcementLearningAI:
    def __init__(self):
        self.model = self.build_model()

    def build_model(self):
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(64, activation="relu", input_dim=4),
            tf.keras.layers.Dense(64, activation="relu"),
            tf.keras.layers.Dense(2, activation="softmax")
        ])
        model.compile(optimizer="adam", loss="mse")
        return model

    def train(self, data):
        X = np.array([d["state"] for d in data])
        Y = np.array([d["reward"] for d in data])
        self.model.fit(X, Y, epochs=5, batch_size=32)

rl_ai = ReinforcementLearningAI()
print("✅ AI Model Ready for Reinforcement Learning")
