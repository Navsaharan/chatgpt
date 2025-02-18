const mongoose = require("mongoose");

const TradingStrategySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    buyCondition: { type: String, required: true },  // e.g., "RSI < 30"
    sellCondition: { type: String, required: true }, // e.g., "RSI > 70"
    capitalAllocation: { type: Number, required: true }
});

module.exports = mongoose.model("TradingStrategy", TradingStrategySchema);
