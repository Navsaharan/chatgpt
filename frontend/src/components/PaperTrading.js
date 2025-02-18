import React, { useState } from "react";
import axios from "axios";

function PaperTrading() {
    const [stockSymbol, setStockSymbol] = useState("");
    const [paperTradeResult, setPaperTradeResult] = useState(null);

    const runPaperTrading = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/ai/paper-trade/${stockSymbol}`);
            setPaperTradeResult(response.data);
        } catch (error) {
            console.error("Error running AI Paper Trading", error);
        }
    };
import TradingGraph from "./TradingGraph";

{paperTradeResult && (
    <div className="mt-4">
        <h4>Stock: {paperTradeResult.symbol.toUpperCase()}</h4>
        <p>Final Balance: ₹{paperTradeResult.final_balance.toFixed(2)}</p>
        <h5>Trade History:</h5>
        <ul>
            {paperTradeResult.trades.map((trade, index) => (
                <li key={index}>
                    {trade.date} - {trade.trade} @ ₹{trade.price.toFixed(2)}
                </li>
            ))}
        </ul>
        <TradingGraph tradeHistory={paperTradeResult.trades} />
    </div>
)}

    return (
        <div className="container mt-4">
            <h3>AI Paper Trading Simulation</h3>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter Stock Symbol (e.g. RELIANCE)"
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
            />
            <button className="btn btn-primary" onClick={runPaperTrading}>Run Paper Trading</button>

            {paperTradeResult && (
                <div className="mt-4">
                    <h4>Stock: {paperTradeResult.symbol.toUpperCase()}</h4>
                    <p>Final Balance: ₹{paperTradeResult.final_balance.toFixed(2)}</p>
                    <h5>Trade History:</h5>
                    <ul>
                        {paperTradeResult.trades.map((trade, index) => (
                            <li key={index}>
                                {trade.date} - {trade.trade} @ ₹{trade.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default PaperTrading;
