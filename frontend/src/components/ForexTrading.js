import React, { useState } from "react";
import axios from "axios";

function ForexTrading() {
    const [pair, setPair] = useState("EUR/USD");
    const [tradeResult, setTradeResult] = useState(null);

    const executeForexTrade = async () => {
        const response = await axios.post("http://localhost:5000/api/trade/forex", { pair, tradeType: "BUY", quantity: 1000 });
        setTradeResult(response.data);
    };

    return (
        <div className="container mt-4">
            <h3>AI Forex Trading</h3>
            <input type="text" className="form-control mb-2" value={pair} onChange={(e) => setPair(e.target.value)} />
            <button className="btn btn-primary" onClick={executeForexTrade}>Buy Forex</button>
            {tradeResult && <p>{tradeResult.msg}</p>}
        </div>
    );
}

export default ForexTrading;
