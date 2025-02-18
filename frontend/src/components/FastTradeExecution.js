import React, { useState } from "react";
import axios from "axios";

function FastTradeExecution() {
    const [stockSymbol, setStockSymbol] = useState("");
    const [tradeResult, setTradeResult] = useState(null);

    const executeTrade = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/trade/optimized-execute`, {
                userId: "USER_ID_HERE",
                stockSymbol,
                tradeType: "BUY",
                quantity: 10
            });
            setTradeResult(response.data);
        } catch (error) {
            console.error("Error executing trade", error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>AI High-Speed Trade Execution</h3>
            <input type="text" className="form-control mb-2" placeholder="Enter Stock Symbol" value={stockSymbol} onChange={(e) => setStockSymbol(e.target.value)} />
            <button className="btn btn-primary" onClick={executeTrade}>Execute Trade</button>
            {tradeResult && <div className="mt-4"><h4>Trade Status: {tradeResult.msg}</h4></div>}
        </div>
    );
}

export default FastTradeExecution;
