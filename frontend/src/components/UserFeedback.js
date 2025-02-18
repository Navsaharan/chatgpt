import React, { useState } from "react";
import axios from "axios";

function UserFeedback() {
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(5);

    const submitFeedback = async () => {
        await axios.post("http://localhost:5000/api/feedback", { feedback, rating });
        alert("Thank you for your feedback!");
    };

    return (
        <div className="container mt-4">
            <h3>Provide Your Feedback</h3>
            <textarea className="form-control" value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Your feedback..." />
            <input type="number" className="form-control mt-2" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" />
            <button className="btn btn-primary mt-2" onClick={submitFeedback}>Submit</button>
        </div>
    );
}

export default UserFeedback;
