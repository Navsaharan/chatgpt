import React, { useState } from "react";
import axios from "axios";

function SentimentAnalysis() {
    const [stockSymbol, setStockSymbol] = useState("");
    const [sentiment, setSentiment] = useState(null);

    const fetchSentiment = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/ai/sentiment/${stockSymbol}`);
            setSentiment(response.data);
        } catch (error) {
            console.error("Error fetching sentiment analysis", error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>AI Market Sentiment Analysis</h3>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter Stock Symbol (e.g. RELIANCE)"
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
            />
            <button className="btn btn-primary" onClick={fetchSentiment}>Analyze Sentiment</button>

            {sentiment && (
                <div className="mt-4">
                    <h4>Stock: {sentiment.symbol.toUpperCase()}</h4>
                    <p>Overall Market Sentiment: <strong>{sentiment.sentiment}</strong></p>
                    <h5>Latest News Headlines:</h5>
                    <ul>
                        {sentiment.headlines.map((headline, index) => (
                            <li key={index}>{headline}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SentimentAnalysis;
