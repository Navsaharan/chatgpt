import React, { useState } from "react";
import axios from "axios";

function HFTTrading() {
    const [stockSymbol, setStockSymbol] = useState("");
    const [tradeSignal, setTradeSignal] = useState(null);

    const fetchHFTTrade = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/ai/hft/${stockSymbol}`);
            setTradeSignal(response.data);
        } catch (error) {
            console.error("Error fetching HFT trade signal", error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>AI High-Frequency Trading</h3>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter Stock Symbol (e.g. RELIANCE)"
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
            />
            <button className="btn btn-primary" onClick={fetchHFTTrade}>Get Trade Signal</button>

            {tradeSignal && (
                <div className="mt-4">
                    <h4>Stock: {tradeSignal.symbol.toUpperCase()}</h4>
                    <p>Recommended Trade: <strong>{tradeSignal.trade_signal}</strong></p>
                </div>
            )}
        </div>
    );
}

export default HFTTrading;
