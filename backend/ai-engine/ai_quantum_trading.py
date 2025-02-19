import numpy as np

def quantum_superposition(probabilities):
    return np.random.choice(["BUY", "SELL"], p=probabilities)

trade_decision = quantum_superposition([0.6, 0.4])  # 60% Buy, 40% Sell
print(trade_decision)  # Expected Output: "BUY" or "SELL"
