import numpy as np

def quantum_superposition(probabilities):
    return np.random.choice(["BUY", "SELL"], p=probabilities)

trade_decision = quantum_superposition([0.65, 0.35])  # 65% Buy, 35% Sell
print(trade_decision)  # Expected Output: "BUY" or "SELL"
