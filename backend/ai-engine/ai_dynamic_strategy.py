import numpy as np
import yfinance as yf
import json

def fetch_market_volatility(symbol):
    stock = yf.Ticker(symbol)
    data = stock.history(period="1mo")
    volatility = np.std(data["Close"].pct_change()) * 100  # Volatility in percentage
    return volatility

def adjust_strategy(symbol):
    volatility = fetch_market_volatility(symbol)
    
    if volatility > 5:
        strategy = "Conservative (Lower Risk)"
    elif 2 <= volatility <= 5:
        strategy = "Moderate (Balanced Risk)"
    else:
        strategy = "Aggressive (High Risk, High Reward)"

    return {"symbol": symbol, "market_volatility": volatility, "ai_strategy": strategy}

if __name__ == "__main__":
    result = adjust_strategy("RELIANCE.NS")
    print(json.dumps(result, indent=4))
