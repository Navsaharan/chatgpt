const Trade = require("../models/Trade");

exports.getAIPerformance = async (req, res) => {
    try {
        const trades = await Trade.find();
        const totalTrades = trades.length;
        const successfulTrades = trades.filter(trade => trade.profit > 0).length;
        const winRate = (successfulTrades / totalTrades) * 100;
        const avgProfit = trades.reduce((acc, trade) => acc + trade.profit, 0) / totalTrades;

        res.json({ totalTrades, successfulTrades, winRate, avgProfit });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching AI performance data", error: error.message });
    }
};
