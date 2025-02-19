import React, { useState } from "react";
import axios from "axios";

function HedgeFundStrategyBuilder() {
    const [name, setName] = useState("");
    const [buyCondition, setBuyCondition] = useState("");
    const [sellCondition, setSellCondition] = useState("");
    const [riskLevel, setRiskLevel] = useState("Medium");

    const createStrategy = async () => {
        await axios.post("http://localhost:5000/api/hedgefund/strategy", { name, buyCondition, sellCondition, riskLevel });
        alert("AI Strategy Created Successfully!");
    };

    return (
        <div className="container mt-4">
            <h3>AI Hedge Fund Strategy Builder</h3>
            <input type="text" className="form-control mb-2" placeholder="Strategy Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" className="form-control mb-2" placeholder="Buy Condition (e.g. RSI < 30)" value={buyCondition} onChange={(e) => setBuyCondition(e.target.value)} />
            <input type="text" className="form-control mb-2" placeholder="Sell Condition (e.g. RSI > 70)" value={sellCondition} onChange={(e) => setSellCondition(e.target.value)} />
            <select className="form-control mb-2" value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)}>
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Risk</option>
            </select>
            <button className="btn btn-success" onClick={createStrategy}>Create Strategy</button>
        </div>
    );
}

export default HedgeFundStrategyBuilder;
