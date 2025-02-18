import React, { useEffect, useState } from "react";
import axios from "axios";

function AIDashboard() {
    const [tradingLogs, setTradingLogs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/admin/trading-logs")
            .then(res => setTradingLogs(res.data))
            .catch(err => console.error("Error fetching logs", err));
    }, []);

    return (
        <div className="container mt-4">
            <h3>AI Trading Performance</h3>
            <ul>
                {tradingLogs.map((log, index) => (
                    <li key={index}>{log.timestamp} - {log.message}</li>
                ))}
            </ul>
        </div>
    );
}

export default AIDashboard;
