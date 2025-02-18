import React, { useState } from "react";
import axios from "axios";

function Backtesting() {
    const [stockSymbol, setStockSymbol] = useState("");
    const [backtestResult, setBacktestResult] = useState(null);

    const runBacktesting = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/ai/backtest/${stockSymbol}`);
            setBacktestResult(response.data);
        } catch (error) {
            console.error("Error running AI Backtesting", error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>AI Backtesting</h3>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter Stock Symbol (e.g. RELIANCE)"
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
            />
            <button className="btn btn-primary" onClick={runBacktesting}>Run Backtest</button>

            {backtestResult && (
                <div className="mt-4">
                    <h4>Stock: {backtestResult.symbol.toUpperCase()}</h4>
                    <p>Win Rate: {backtestResult.win_rate.toFixed(2)}%</p>
                    <p>Final Balance: ₹{backtestResult.final_balance.toFixed(2)}</p>
                    <h5>Trade History:</h5>
                    <ul>
                        {backtestResult.trades.map((trade, index) => (
                            <li key={index}>
                                {trade.date} - {trade.trade} @ ₹{trade.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Backtesting;
