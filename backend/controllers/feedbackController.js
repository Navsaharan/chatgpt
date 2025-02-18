const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
    try {
        const { feedback, rating } = req.body;
        const newFeedback = new Feedback({ feedback, rating });
        await newFeedback.save();
        res.json({ msg: "Feedback submitted successfully!" });
    } catch (error) {
        res.status(500).json({ msg: "Error submitting feedback", error: error.message });
    }
};
