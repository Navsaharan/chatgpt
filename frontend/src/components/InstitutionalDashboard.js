import React, { useEffect, useState } from "react";
import axios from "axios";

function InstitutionalDashboard() {
    const [aiStats, setAiStats] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/ai/performance")
            .then(res => setAiStats(res.data))
            .catch(err => console.error("Error fetching AI stats", err));
    }, []);

    return (
        <div className="container mt-4">
            <h3>Institutional AI Trading Dashboard</h3>
            {aiStats && (
                <ul>
                    <li>AI Win Rate: {aiStats.winRate}%</li>
                    <li>AI Avg Profit per Trade: ₹{aiStats.avgProfit.toFixed(2)}</li>
                    <li>Total Institutional Trades Executed: {aiStats.totalTrades}</li>
                </ul>
            )}
        </div>
    );
}

export default InstitutionalDashboard;
