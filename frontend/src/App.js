import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [hasAPI, setHasAPI] = useState(null);

    useEffect(() => {
        const userId = "USER_ID_HERE"; // Replace with dynamic user ID
        axios.get(`http://localhost:5000/api/trade/check-api/${userId}`)
            .then(res => setHasAPI(res.data.hasAPI))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container mt-5">
            <h2>Welcome to FAMILYHVSDN Trading System</h2>
            {hasAPI === null ? <p>Loading...</p> : (
                hasAPI ? <p>✅ You have API access. AI Trading Enabled.</p> 
                       : <button onClick={() => window.location.href = "https://kite.zerodha.com"} className="btn btn-primary">Open Broker</button>
            )}
        </div>
    );
}
import React from "react";
import StockPrice from "./components/StockPrice";

function App() {
    return (
        <div>
            <StockPrice />
        </div>
    );
}

export default App;


