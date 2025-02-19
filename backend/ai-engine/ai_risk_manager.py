import numpy as np

def adjust_risk_level(current_volatility):
    if current_volatility > 5:
        return "Reduce Exposure"
    elif 2 <= current_volatility <= 5:
        return "Maintain Exposure"
    else:
        return "Increase Exposure"

print(adjust_risk_level(4.2))  # Expected Output: Maintain Exposure
