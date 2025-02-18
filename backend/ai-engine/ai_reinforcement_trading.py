import numpy as np
import pandas as pd
import gym
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import random
import json

class RL_AutoTrader:
    def __init__(self):
        self.model = self.build_model()
        self.q_table = {}

    def build_model(self):
        model = Sequential([
            Dense(64, activation="relu", input_dim=4),
            Dense(64, activation="relu"),
            Dense(2, activation="softmax")  # 2 actions: Buy, Sell
        ])
        model.compile(optimizer="adam", loss="mse")
        return model

    def train(self, data):
        for _ in range(1000):
            state = random.choice(data)
            action = random.choice(["BUY", "SELL"])
            reward = state[2] if action == "BUY" else -state[2]
            self.q_table[state] = reward

    def predict_trade(self, state):
        return "BUY" if self.q_table.get(state, 0) > 0 else "SELL"

def train_rl_trader():
    data = np.random.rand(100, 4)  # Simulated stock data
    trader = RL_AutoTrader()
    trader.train(data)
    return {"trade_signal": trader.predict_trade(data[0])}

if __name__ == "__main__":
    result = train_rl_trader()
    print(json.dumps(result, indent=4))
import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import random

# Load Trade Data
def load_trade_data():
    return pd.DataFrame({
        "trade": ["BUY", "SELL", "BUY", "SELL"],
        "profit": [200, -150, 400, -100]
    })

# Deep Q-Learning AI Model
class AIReinforcementTrader:
    def __init__(self):
        self.model = self.build_model()
        self.q_table = {}

    def build_model(self):
        model = Sequential([
            Dense(64, activation="relu", input_dim=4),
            Dense(64, activation="relu"),
            Dense(2, activation="softmax")  # Buy or Sell Decision
        ])
        model.compile(optimizer="adam", loss="mse")
        return model

    def train(self, data):
        for _, row in data.iterrows():
            state = row["trade"]
            action = "BUY" if row["profit"] > 0 else "SELL"
            reward = row["profit"]
            self.q_table[state] = reward

    def predict_trade(self):
        return max(self.q_table, key=self.q_table.get)

# Train AI & Predict Next Trade
ai = AIReinforcementTrader()
data = load_trade_data()
ai.train(data)
next_trade = ai.predict_trade()

print({"next_trade": next_trade})
