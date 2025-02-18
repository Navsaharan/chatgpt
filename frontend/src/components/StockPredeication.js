import React, { useState } from "react";
import axios from "axios";

function StockPrediction() {
    const [stockSymbol, setStockSymbol] = useState("");
    const [prediction, setPrediction] = useState(null);

    const fetchPrediction = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/ai/predict/${stockSymbol}`);
            setPrediction(response.data);
        } catch (error) {
            console.error("Error fetching stock prediction", error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>AI Stock Price Prediction</h3>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter Stock Symbol (e.g. RELIANCE)"
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
            />
            <button className="btn btn-primary" onClick={fetchPrediction}>Predict Price</button>

            {prediction && (
                <div className="mt-4">
                    <h4>Stock: {prediction.symbol.toUpperCase()}</h4>
                    <p>Predicted Price: ₹{prediction.predicted_price.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
}

export default StockPrediction;
