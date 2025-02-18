import React from "react";

function UserGuide() {
    return (
        <div className="container mt-4">
            <h3>Welcome to FAMILYHVSDN Trading System</h3>
            <p>Follow these steps to get started:</p>
            <ol>
                <li>Register an account & log in</li>
                <li>Connect your broker API (Zerodha, Upstox, etc.)</li>
                <li>Enable or disable AI auto-trading</li>
                <li>Use Paper Trading mode to test AI strategies</li>
                <li>Monitor real-time stock predictions & AI trades</li>
            </ol>
        </div>
    );
}

export default UserGuide;
