import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import random

class DeepQLearningTrader:
    def __init__(self):
        self.model = self.build_model()
        self.memory = []

    def build_model(self):
        model = Sequential([
            Dense(64, activation="relu", input_dim=4),
            Dense(64, activation="relu"),
            Dense(2, activation="softmax")  # Buy or Sell Decision
        ])
        model.compile(optimizer="adam", loss="mse")
        return model

    def train(self, data):
        for state, action, reward in data:
            self.memory.append((state, action, reward))
            if len(self.memory) > 1000:
                self.memory.pop(0)

        X = np.array([state for state, _, _ in self.memory])
        Y = np.array([reward for _, _, reward in self.memory])

        self.model.fit(X, Y, epochs=10, batch_size=32)

    def predict_trade(self, state):
        return np.argmax(self.model.predict(state.reshape(1, -1)))

trader = DeepQLearningTrader()
print(trader.predict_trade(np.array([1, 0, 1, 0])))  # Expected Output: 0 (Buy) or 1 (Sell)
