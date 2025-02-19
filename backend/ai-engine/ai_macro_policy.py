import numpy as np

class CentralBankAI:
    def __init__(self):
        self.data = {"inflation": 2.5, "gdp_growth": 3.2, "unemployment": 4.1}

    def predict_rate_decision(self):
        return "HIKE RATES" if self.data["inflation"] > 2 else "CUT RATES"

ai_macro = CentralBankAI()
print(ai_macro.predict_rate_decision())  # Expected Output: "HIKE RATES" or "CUT RATES"
