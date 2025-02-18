import React, { useEffect, useState } from "react";

function LiveMarketData() {
    const [stockData, setStockData] = useState(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        ws.onmessage = (event) => {
            setStockData(JSON.parse(event.data));
        };

        return () => ws.close();
    }, []);

    return (
        <div className="container mt-4">
            <h3>Live Market Data</h3>
            {stockData && (
                <div className="alert alert-info">
                    <strong>{stockData.stockSymbol}</strong>: ₹{stockData.price}
                </div>
            )}
        </div>
    );
}

export default LiveMarketData;
