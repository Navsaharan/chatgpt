import numpy as np

def ai_trade_decision(predicted_price, current_price):
    confidence_score = np.random.uniform(0.7, 1.0) if predicted_price > current_price else np.random.uniform(0.3, 0.6)
    return "BUY" if confidence_score > 0.75 else "HOLD"

print(ai_trade_decision(2500, 2450))
