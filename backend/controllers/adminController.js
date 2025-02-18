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
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching users", error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting user", error: error.message });
    }
};
