const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Check if user has API access
router.get("/check-api/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        if (user.brokerAPI.zerodha || user.brokerAPI.upstox || user.brokerAPI.angel) {
            res.json({ hasAPI: true });
        } else {
            res.json({ hasAPI: false });
        }
    } catch (err) {
        res.status(500).send("Server error");
    }
});

module.exports = router;
