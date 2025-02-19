import numpy as np

class DerivativesAI:
    def __init__(self):
        self.positions = {}

    def trade_options(self, underlying_price, strike_price, volatility, risk_free_rate, time_to_expiry):
        d1 = (np.log(underlying_price / strike_price) + (risk_free_rate + (volatility ** 2) / 2) * time_to_expiry) / (volatility * np.sqrt(time_to_expiry))
        return "BUY CALL" if d1 > 0 else "BUY PUT"

ai_derivatives = DerivativesAI()
print(ai_derivatives.trade_options(150, 145, 0.2, 0.01, 0.5))  # Expected Output: "BUY CALL" or "BUY PUT"
