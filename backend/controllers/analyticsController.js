const Trade = require("../models/Trade");

exports.getTradeAnalytics = async (req, res) => {
    try {
        const trades = await Trade.find({ userId: req.params.userId }).sort({ executedAt: -1 });
        
        const winRate = (trades.filter(trade => trade.profit > 0).length / trades.length) * 100;
        const profitLoss = trades.map(trade => ({ date: trade.executedAt, amount: trade.profit }));

        res.json({ winRate, profitLoss, trades });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching AI analytics", error: error.message });
    }
};
