import React, { useState } from "react";
import axios from "axios";

function PortfolioOptimization() {
    const [stockSymbols, setStockSymbols] = useState("");
    const [optimizedPortfolio, setOptimizedPortfolio] = useState(null);

    const fetchPortfolioOptimization = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/ai/optimize-portfolio`, {
                stockSymbols: stockSymbols.split(",")
            });
            setOptimizedPortfolio(response.data);
        } catch (error) {
            console.error("Error fetching portfolio optimization", error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>AI Smart Portfolio Optimization</h3>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter Stock Symbols (e.g. RELIANCE,TCS,INFY)"
                value={stockSymbols}
                onChange={(e) => setStockSymbols(e.target.value)}
            />
            <button className="btn btn-primary" onClick={fetchPortfolioOptimization}>Optimize Portfolio</button>

            {optimizedPortfolio && (
                <div className="mt-4">
                    <h4>Optimized Portfolio Allocation:</h4>
                    <ul>
                        {Object.entries(optimizedPortfolio.optimized_portfolio).map(([stock, weight]) => (
                            <li key={stock}>{stock}: {(weight * 100).toFixed(2)}%</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default PortfolioOptimization;
