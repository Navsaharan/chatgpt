import React, { useState } from "react";
import axios from "axios";

function TradingStrategies() {
    const [name, setName] = useState("");
    const [buyCondition, setBuyCondition] = useState("");
    const [sellCondition, setSellCondition] = useState("");
    const [capitalAllocation, setCapitalAllocation] = useState(1000);

    const createStrategy = async () => {
        try {
            await axios.post(`http://localhost:5000/api/strategies/create`, {
                userId: "USER_ID_HERE", 
                name,
                buyCondition,
                sellCondition,
                capitalAllocation
            });
            alert("✅ Strategy Created Successfully!");
        } catch (error) {
            console.error("Error creating strategy", error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Create Custom AI Trading Strategy</h3>

            <input type="text" className="form-control mb-2" placeholder="Strategy Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" className="form-control mb-2" placeholder="Buy Condition (e.g. RSI < 30)" value={buyCondition} onChange={(e) => setBuyCondition(e.target.value)} />
            <input type="text" className="form-control mb-2" placeholder="Sell Condition (e.g. RSI > 70)" value={sellCondition} onChange={(e) => setSellCondition(e.target.value)} />
            <input type="number" className="form-control mb-2" placeholder="Capital Allocation (₹)" value={capitalAllocation} onChange={(e) => setCapitalAllocation(e.target.value)} />

            <button className="btn btn-success" onClick={createStrategy}>Create Strategy</button>
        </div>
    );
}

export default TradingStrategies;
