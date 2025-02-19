const Strategy = require("../models/Strategy");

exports.createStrategy = async (req, res) => {
    const { userId, name, buyCondition, sellCondition, riskLevel } = req.body;

    try {
        const strategy = new Strategy({ userId, name, buyCondition, sellCondition, riskLevel });
        await strategy.save();
        res.json({ msg: "AI Strategy Created Successfully!", strategy });
    } catch (error) {
        res.status(500).json({ msg: "Error Creating AI Strategy", error: error.message });
    }
};
