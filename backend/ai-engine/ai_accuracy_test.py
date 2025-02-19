import numpy as np
import pandas as pd
import yfinance as yf

class AIPredictionTester:
    def __init__(self, stock_symbol):
        self.stock_symbol = stock_symbol

    def get_real_market_data(self, period="1mo"):
        stock = yf.Ticker(self.stock_symbol)
        return stock.history(period=period)["Close"]

    def ai_predictions(self):
        return np.cumsum(np.random.randn(30) * 2 + 100)  # Simulated AI Predictions

    def compare_results(self):
        real_prices = self.get_real_market_data()
        ai_prices = self.ai_predictions()
        accuracy = np.mean(np.abs(real_prices.values[:30] - ai_prices) / real_prices.values[:30]) * 100
        return f"AI Prediction Accuracy: {100 - accuracy:.2f}%"

ai_tester = AIPredictionTester("AAPL")
print(ai_tester.compare_results())  # Expected Output: AI Prediction Accuracy in %
