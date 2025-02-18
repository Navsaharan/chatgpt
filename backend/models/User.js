const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    apiKeys: {
        zerodha: { type: String, default: null },
        upstox: { type: String, default: null },
        angelOne: { type: String, default: null },
    },
    aiPreferences: {
        enableAutoTrading: { type: Boolean, default: false },
        enableGreyArea: { type: Boolean, default: false },
        capitalLimit: { type: Number, default: 10000 },
        stockWhitelist: [String],  // List of stocks AI is allowed to trade
        stockBlacklist: [String],  // List of stocks AI should avoid
        maxDailyLoss: { type: Number, default: 500 },
        maxDailyProfit: { type: Number, default: 2000 },
    },
    createdAt: { type: Date, default: Date.now }
});
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    apiKeys: {
        zerodha: { type: String, default: null },
        upstox: { type: String, default: null },
        angelOne: { type: String, default: null },
    },
    aiPreferences: {
        enableAutoTrading: { type: Boolean, default: false },
        tradingRisk: { type: String, enum: ["Conservative", "Moderate", "Aggressive"], default: "Moderate" },
        capitalLimit: { type: Number, default: 10000 },
        stockWhitelist: [String],  // List of stocks AI is allowed to trade
        stockBlacklist: [String],  // List of stocks AI should avoid
        maxDailyLoss: { type: Number, default: 500 },
        maxDailyProfit: { type: Number, default: 2000 },
        enablePaperTradingLearning: { type: Boolean, default: true },
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);

