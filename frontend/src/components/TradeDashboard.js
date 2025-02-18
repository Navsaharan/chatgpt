import React, { useEffect, useState } from "react";
import axios from "axios";

function TradeDashboard() {
    const [trades, setTrades] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/trade/logs")
            .then(res => setTrades(res.data))
            .catch(err => console.error("Error fetching trade logs", err));
    }, []);

    return (
        <div className="container mt-4">
            <h3>Live AI Trade Execution Dashboard</h3>
            <ul>
                {trades.map((trade, index) => (
                    <li key={index}>{trade.timestamp} - {trade.stockSymbol} - {trade.tradeType} @ ₹{trade.price}</li>
                ))}
            </ul>
        </div>
    );
}

export default TradeDashboard;
