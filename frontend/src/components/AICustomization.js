import React, { useState, useEffect } from "react";
import axios from "axios";

function AICustomization() {
    const [settings, setSettings] = useState({
        enableAutoTrading: false,
        tradingRisk: "Moderate",
        capitalLimit: 10000,
        maxDailyLoss: 500,
        maxDailyProfit: 2000,
        enablePaperTradingLearning: true,
        stockWhitelist: [],
        stockBlacklist: [],
    });

    const userId = "USER_ID_HERE"; // Replace with actual user ID

    useEffect(() => {
        axios.get(`http://localhost:5000/api/ai/settings/${userId}`)
            .then((res) => setSettings(res.data.aiPreferences))
            .catch((err) => console.error("Error fetching AI settings", err));
    }, []);

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/api/ai/settings/${userId}`, settings);
            alert("✅ AI Settings Updated!");
        } catch (error) {
            console.error("Error updating AI settings", error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>AI Trading Customization</h3>

            <label>Auto-Trading</label>
            <select className="form-select mb-2" value={settings.enableAutoTrading} onChange={(e) => setSettings({ ...settings, enableAutoTrading: e.target.value === "true" })}>
                <option value="true">Enabled</option>
                <option value="false">Disabled</option>
            </select>

            <label>Trading Risk Level</label>
            <select className="form-select mb-2" value={settings.tradingRisk} onChange={(e) => setSettings({ ...settings, tradingRisk: e.target.value })}>
                <option value="Conservative">Conservative</option>
                <option value="Moderate">Moderate</option>
                <option value="Aggressive">Aggressive</option>
            </select>

            <label>Capital Limit (₹)</label>
            <input type="number" className="form-control mb-2" value={settings.capitalLimit} onChange={(e) => setSettings({ ...settings, capitalLimit: e.target.value })} />

            <label>Max Daily Loss (₹)</label>
            <input type="number" className="form-control mb-2" value={settings.maxDailyLoss} onChange={(e) => setSettings({ ...settings, maxDailyLoss: e.target.value })} />

            <label>Max Daily Profit (₹)</label>
            <input type="number" className="form-control mb-2" value={settings.maxDailyProfit} onChange={(e) => setSettings({ ...settings, maxDailyProfit: e.target.value })} />

            <label>Enable Paper Trading Learning</label>
            <select className="form-select mb-2" value={settings.enablePaperTradingLearning} onChange={(e) => setSettings({ ...settings, enablePaperTradingLearning: e.target.value === "true" })}>
                <option value="true">Enabled</option>
                <option value="false">Disabled</option>
            </select>

            <button className="btn btn-success" onClick={handleUpdate}>Update AI Settings</button>
        </div>
    );
}

export default AICustomization;
