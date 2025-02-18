import React, { useState, useEffect } from "react";
import axios from "axios";

function RiskManagement() {
    const [riskData, setRiskData] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/risk/max-daily-loss/USER_ID_HERE`)
            .then((res) => setRiskData(res.data))
            .catch((err) => console.error("Error checking risk", err));
    }, []);

    return (
        <div className="container mt-4">
            <h3>AI Risk Management Dashboard</h3>
            {riskData && (
                <div className="alert alert-warning">
                    <strong>{riskData.action}</strong>: {riskData.reason}
                </div>
            )}
        </div>
    );
}

export default RiskManagement;
