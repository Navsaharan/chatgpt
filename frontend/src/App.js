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
import React from "react";
import TradePanel from "./components/TradePanel";

function App() {
    return (
        <div>
            <TradePanel />
        </div>
    );
}
import React from "react";
import AISignal from "./components/AISignal";

function App() {
    return (
        <div>
            <AISignal />
        </div>
    );
import React from "react";
import PaperTrading from "./components/PaperTrading";
import Backtesting from "./components/Backtesting";

function App() {
    return (
        <div>
            <PaperTrading />
            <Backtesting />
        </div>
    );
}

export default App;

}
import React from "react";
import AICustomization from "./components/AICustomization";

function App() {
    return (
        <div>
            <AICustomization />
        </div>
    );
}

export default App;


import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Portfolio from "./components/Portfolio";
import Trading from "./components/Trading";
import AIAnalytics from "./components/AIAnalytics";
import Settings from "./components/Settings";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="d-flex">
                <Sidebar />
                <div className="container-fluid p-4">
                    <Routes>
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/trading" element={<Trading />} />
                        <Route path="/analytics" element={<AIAnalytics />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;



