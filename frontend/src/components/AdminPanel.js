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
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/admin/users")
            .then(res => setUsers(res.data))
            .catch(err => console.error("Error fetching users", err));
    }, []);

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
        setUsers(users.filter(user => user._id !== id));
    };

    return (
        <div className="container mt-4">
            <h3>Admin Panel - Manage Users</h3>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.name} ({user.email}) 
                        <button onClick={() => deleteUser(user._id)} className="btn btn-danger btn-sm ms-2">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPanel;


