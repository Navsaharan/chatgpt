import numpy as np

def calculate_value_at_risk(returns, confidence_level=0.95):
    var = np.percentile(returns, 100 * (1 - confidence_level))
    return var

historical_returns = np.random.normal(0, 1, 1000)
print(calculate_value_at_risk(historical_returns))  # Expected Output: VAR Value
