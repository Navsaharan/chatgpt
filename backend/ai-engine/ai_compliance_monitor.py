import pandas as pd
from sklearn.ensemble import IsolationForest

def monitor_trade_compliance(trades):
    model = IsolationForest(contamination=0.05)
    trades["anomaly"] = model.fit_predict(trades[["volume", "price_change"]])
    return trades[trades["anomaly"] == -1]  # Flagged as non-compliant

data = pd.DataFrame({"volume": [100, 500, 10000, 200], "price_change": [0.1, 0.2, 5.0, 0.15]})
print(monitor_trade_compliance(data))  # Expected Output: Anomalous trades flagged
