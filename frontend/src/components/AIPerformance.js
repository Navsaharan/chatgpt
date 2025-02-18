import React, { useEffect, useState } from "react";
import axios from "axios";

function AIPerformance() {
    const [performance, setPerformance] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/ai/performance")
            .then(res => setPerformance(res.data))
            .catch(err => console.error("Error fetching AI performance data", err));
    }, []);

    return (
        <div className="container mt-4">
            <h3>AI Trading Performance</h3>
            {performance && (
                <ul>
                    <li>Total Trades: {performance.totalTrades}</li>
                    <li>Successful Trades: {performance.successfulTrades}</li>
                    <li>Win Rate: {performance.winRate}%</li>
                    <li>Average Profit: ₹{performance.avgProfit.toFixed(2)}</li>
                </ul>
            )}
        </div>
    );
}

export default AIPerformance;
