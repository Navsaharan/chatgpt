import React, { useState } from "react";
import axios from "axios";

function AISignal() {
    const [stockSymbol, setStockSymbol] = useState("");
    const [aiSignal, setAiSignal] = useState(null);

    const fetchTradeSignal = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/ai/trade-signal/${stockSymbol}`);
            setAiSignal(response.data);
        } catch (error) {
            console.error("Error fetching AI trade signal", error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>AI Trade Recommendations</h3>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter Stock Symbol (e.g. RELIANCE)"
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
            />
            <button className="btn btn-primary" onClick={fetchTradeSignal}>Get AI Signal</button>

            {aiSignal && (
                <div className="mt-4">
                    <h4>Stock: {aiSignal.symbol.toUpperCase()}</h4>
                    <p>Recommendation: <strong>{aiSignal.signal}</strong></p>
                    <p>Confidence Level: {aiSignal.confidence}%</p>
                    <p>Market Sentiment: {aiSignal.sentiment > 0 ? "Positive" : "Negative"}</p>
                </div>
            )}
        </div>
    );
}

export default AISignal;
