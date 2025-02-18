import React, { useState } from "react";
import axios from "axios";

function AnomalyDetection() {
    const [stockSymbol, setStockSymbol] = useState("");
    const [anomalies, setAnomalies] = useState(null);

    const fetchAnomalies = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/ai/anomalies/${stockSymbol}`);
            setAnomalies(response.data);
        } catch (error) {
            console.error("Error fetching anomaly data", error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Stock Market Anomaly Detection</h3>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter Stock Symbol (e.g. RELIANCE)"
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
            />
            <button className="btn btn-primary" onClick={fetchAnomalies}>Detect Anomalies</button>

            {anomalies && (
                <div className="mt-4">
                    <h4>Stock: {anomalies.symbol.toUpperCase()}</h4>
                    <h5>Market Manipulation Detected On:</h5>
                    <ul>
                        {anomalies.anomalies.map((date, index) => (
                            <li key={index}>{date}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AnomalyDetection;
