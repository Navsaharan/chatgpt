import React, { useEffect, useState } from "react";
import axios from "axios";

function TradingDashboard() {
    const [aiStats, setAiStats] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/ai/performance")
            .then(res => setAiStats(res.data))
            .catch(err => console.error("Error fetching AI stats", err));
    }, []);

    const executeTrade = async (tradeType) => {
        await axios.post("http://localhost:5000/api/trade/execute", { stockSymbol: "AAPL", tradeType, quantity: 10 });
        alert(`Trade executed: ${tradeType}`);
    };

    return (
        <div className="container mt-4">
            <h3>AI Trading Dashboard</h3>
            {aiStats && (
                <ul>
                    <li>AI Win Rate: {aiStats.winRate}%</li>
                    <li>AI Avg Profit per Trade: ₹{aiStats.avgProfit.toFixed(2)}</li>
                    <li>Total Trades Executed: {aiStats.totalTrades}</li>
                </ul>
            )}
            <button className="btn btn-success" onClick={() => executeTrade("BUY")}>Buy</button>
            <button className="btn btn-danger" onClick={() => executeTrade("SELL")}>Sell</button>
        </div>
    );
}

export default TradingDashboard;
