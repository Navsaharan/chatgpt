import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="d-flex flex-column p-3 bg-light" style={{ height: "100vh", width: "250px" }}>
            <h4>📊 Dashboard</h4>
            <ul className="nav flex-column">
                <li className="nav-item"><Link className="nav-link" to="/portfolio">Portfolio</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/trading">Trade</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/analytics">AI Insights</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/settings">Settings</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;
