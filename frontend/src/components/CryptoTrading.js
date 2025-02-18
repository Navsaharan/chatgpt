import React, { useState } from "react";
import axios from "axios";

function CryptoTrading() {
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [tradeResult, setTradeResult] = useState(null);

    const executeCryptoTrade = async () => {
        const response = await axios.post("http://localhost:5000/api/trade/crypto", { symbol, tradeType: "BUY", quantity: 0.01 });
        setTradeResult(response.data);
    };

    return (
        <div className="container mt-4">
            <h3>AI Crypto Trading</h3>
            <input type="text" className="form-control mb-2" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
            <button className="btn btn-primary" onClick={executeCryptoTrade}>Buy Crypto</button>
            {tradeResult && <p>{tradeResult.msg}</p>}
        </div>
    );
}

export default CryptoTrading;
