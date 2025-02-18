const TradingStrategy = require("../models/TradingStrategy");

exports.createStrategy = async (req, res) => {
    const { userId, name, buyCondition, sellCondition, capitalAllocation } = req.body;

    try {
        const strategy = new TradingStrategy({ userId, name, buyCondition, sellCondition, capitalAllocation });
        await strategy.save();
        res.json({ msg: "Trading Strategy Created Successfully", strategy });
    } catch (error) {
        res.status(500).json({ msg: "Error creating strategy", error: error.message });
    }
};
