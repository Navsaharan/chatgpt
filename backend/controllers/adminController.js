const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching users", error: error.message });
    }
};

exports.getAIStrategies = async (req, res) => {
    res.json([
        { id: 1, name: "Momentum Trading", description: "Trades stocks with high momentum." },
        { id: 2, name: "Mean Reversion", description: "Buys stocks below average price and sells above average." }
    ]);
};
