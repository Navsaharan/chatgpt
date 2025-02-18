import React, { useState } from "react";
import axios from "axios";

function AutoTrading() {
    const [stockSymbol, setStockSymbol] = useState("");
    const [tradeResult, setTradeResult] = useState(null);

    const executeAutoTrade = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/trade/auto-execute`, {
                userId: "USER_ID_HERE",
                stockSymbol
            });
            setTradeResult(response.data);
        } catch (error) {
            console.error("Error executing auto trade", error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>AI Automated Trade Execution</h3>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter Stock Symbol (e.g. RELIANCE)"
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
            />
            <button className="btn btn-primary" onClick={executeAutoTrade}>Run AI Auto-Trade</button>

            {tradeResult && (
                <div className="mt-4">
                    <h4>Trade Status: {tradeResult.msg}</h4>
                </div>
            )}
        </div>
    );
}

export default AutoTrading;
