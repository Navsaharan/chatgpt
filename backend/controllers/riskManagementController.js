const Trade = require("../models/Trade");
const User = require("../models/User");

// AI Stop-Loss Adjustments
exports.checkStopLoss = async (req, res) => {
    const { userId, stockSymbol, currentPrice } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const trade = await Trade.findOne({ userId, stock: stockSymbol }).sort({ executedAt: -1 });
        if (!trade) return res.json({ msg: "No active trades for this stock" });

        const stopLossThreshold = trade.price - (trade.price * user.aiPreferences.stopLossPercentage / 100);
        
        if (currentPrice <= stopLossThreshold) {
            return res.json({ action: "SELL", reason: "Stop-loss triggered" });
        }

        res.json({ action: "HOLD", reason: "Trade is still within limits" });
    } catch (error) {
        res.status(500).json({ msg: "Stop-loss check failed", error: error.message });
    }
};

// AI Max Daily Loss Control
exports.checkMaxDailyLoss = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const trades = await Trade.find({ userId, executedAt: { $gte: new Date().setHours(0, 0, 0, 0) } });
        const totalLoss = trades.reduce((acc, trade) => acc + (trade.price * trade.quantity * (trade.tradeType === "SELL" ? -1 : 1)), 0);

        if (totalLoss <= -user.aiPreferences.maxDailyLoss) {
            return res.json({ action: "STOP_TRADING", reason: "Max daily loss limit reached" });
        }

        res.json({ action: "CONTINUE_TRADING", reason: "Daily loss is within limits" });
    } catch (error) {
        res.status(500).json({ msg: "Max daily loss check failed", error: error.message });
    }
};
