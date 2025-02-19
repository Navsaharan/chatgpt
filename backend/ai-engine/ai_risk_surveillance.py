import numpy as np

class TradeSurveillanceAI:
    def __init__(self):
        self.trade_logs = []

    def monitor_trade_activity(self, trade):
        risk_score = np.random.uniform(0, 1)  # AI assigns a risk score to each trade
        trade["risk_score"] = risk_score
        self.trade_logs.append(trade)
        return "FLAGGED" if risk_score > 0.8 else "OK"

surveillance_ai = TradeSurveillanceAI()
print(surveillance_ai.monitor_trade_activity({"stock": "TSLA", "volume": 500}))  # Expected Output: "FLAGGED" or "OK"
