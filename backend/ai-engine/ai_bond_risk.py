import numpy as np

class BondRiskAI:
    def __init__(self, yield_curve):
        self.yield_curve = yield_curve

    def calculate_duration(self, bond_price, interest_rate, maturity):
        return (1 - (1 / ((1 + interest_rate) ** maturity))) / interest_rate

bond_ai = BondRiskAI([1.5, 2.0, 2.5])
print(bond_ai.calculate_duration(1000, 0.03, 10))  # Expected Output: Approximate Bond Duration
