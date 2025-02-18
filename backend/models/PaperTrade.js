const mongoose = require("mongoose");

const PaperTradeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    stock: { type: String, required: true },
    tradeHistory: [{ date: Date, trade: String, price: Number }],
    finalBalance: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PaperTrade", PaperTradeSchema);
