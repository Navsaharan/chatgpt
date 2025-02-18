import React, { useState, useEffect } from "react";
import axios from "axios";

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/notifications")
            .then(res => setNotifications(res.data))
            .catch(err => console.error("Error fetching notifications", err));
    }, []);

    return (
        <div className="container mt-4">
            <h3>AI Trade Alerts</h3>
            <ul className="list-group">
                {notifications.map((notification, index) => (
                    <li key={index} className="list-group-item">
                        {notification.message}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Notifications;
