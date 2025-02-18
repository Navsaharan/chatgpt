import React, { useState } from "react";
import axios from "axios";

function StockPrice() {
    const [stockSymbol, setStockSymbol] = useState("");
    const [stockData, setStockData] = useState(null);

    const fetchStockPrice = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/stock/price/${stockSymbol}`);
            setStockData(response.data.stockData);
        } catch (error) {
            console.error("Error fetching stock data", error);
        }
    };

    return (
        <div className="container">
            <h2>Live Stock Market Data</h2>
            <input
                type="text"
                className="form-control"
                placeholder="Enter Stock Symbol (e.g. RELIANCE)"
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={fetchStockPrice}>Get Price</button>

            {stockData && (
                <div className="mt-4">
                    <h3>Stock: {stockSymbol.toUpperCase()}</h3>
                    <p>Price: ₹{stockData.price}</p>
                </div>
            )}
        </div>
    );
}

export default StockPrice;
