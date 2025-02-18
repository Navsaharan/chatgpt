const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    stock: { type: String, required: true },
    tradeType: { type: String, enum: ["BUY", "SELL"], required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    executedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Trade", TradeSchema);
