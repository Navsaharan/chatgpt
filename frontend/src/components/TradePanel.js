import React, { useState } from "react";
import axios from "axios";

function TradePanel() {
    const [stockSymbol, setStockSymbol] = useState("");
    const [tradeType, setTradeType] = useState("BUY");
    const [quantity, setQuantity] = useState(1);
    const [tradeMessage, setTradeMessage] = useState("");

    const executeTrade = async () => {
        try {
            const userId = "USER_ID_HERE"; // Replace with actual user ID
            const response = await axios.post("http://localhost:5000/api/trade/execute", {
                userId,
                stockSymbol,
                tradeType,
                quantity
            });

            if (response.data.redirect === "embedded_browser") {
                window.location.href = "https://kite.zerodha.com";
            } else {
                setTradeMessage(response.data.message);
            }
        } catch (error) {
            setTradeMessage("Trade execution failed. Try again.");
        }
    };

    return (
        <div className="container mt-4">
            <h3>Trade Execution</h3>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter Stock Symbol (e.g. RELIANCE)"
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
            />
            <select className="form-select mb-2" onChange={(e) => setTradeType(e.target.value)}>
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
            </select>
            <input
                type="number"
                className="form-control mb-2"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <button className="btn btn-success" onClick={executeTrade}>Execute Trade</button>

            {tradeMessage && <p className="mt-3">{tradeMessage}</p>}
        </div>
    );
}

export default TradePanel;
