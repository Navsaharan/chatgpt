import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest

def detect_anomalies(trade_data):
    model = IsolationForest(contamination=0.05)
    trade_data["anomaly"] = model.fit_predict(trade_data[["volume", "price_change"]])
    return trade_data[trade_data["anomaly"] == -1]  # Anomalous Trades

data = pd.DataFrame({"volume": [100, 500, 10000, 200], "price_change": [0.1, 0.2, 5.0, 0.15]})
print(detect_anomalies(data))  # Expected Output: Anomalous trades
