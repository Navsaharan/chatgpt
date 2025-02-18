import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [aiStrategies, setAIStrategies] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/admin/users")
            .then(res => setUsers(res.data))
            .catch(err => console.error("Error fetching users", err));

        axios.get("http://localhost:5000/api/admin/ai-strategies")
            .then(res => setAIStrategies(res.data))
            .catch(err => console.error("Error fetching AI strategies", err));
    }, []);

    return (
        <div className="container mt-4">
            <h2>Admin Panel</h2>

            <h4>Users</h4>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.name} ({user.email})</li>
                ))}
            </ul>

            <h4>AI Trading Strategies</h4>
            <ul>
                {aiStrategies.map(strategy => (
                    <li key={strategy.id}>{strategy.name} - {strategy.description}</li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPanel;
