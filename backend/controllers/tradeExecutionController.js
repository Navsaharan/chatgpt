const axios = require("axios");
const TradingStrategy = require("../models/TradingStrategy");
const User = require("../models/User");

// Execute AI Trade Automatically
exports.executeAutoTrade = async (req, res) => {
    const { userId, stockSymbol } = req.body;

    try {
        // Get user's trading strategy
        const strategy = await TradingStrategy.findOne({ userId });
        if (!strategy) return res.status(404).json({ msg: "No trading strategy found" });

        // Fetch latest stock data
        const stockResponse = await axios.get(`http://localhost:5000/api/stock/price/${stockSymbol}`);
        const stockPrice = stockResponse.data.stockData.price;

        // Check buy/sell conditions
        let tradeType = null;
        if (eval(strategy.buyCondition.replace("PRICE", stockPrice))) {
            tradeType = "BUY";
        } else if (eval(strategy.sellCondition.replace("PRICE", stockPrice))) {
            tradeType = "SELL";
        }

        if (!tradeType) return res.json({ msg: "No trade executed based on current market conditions." });

        // Execute trade
        const tradeResponse = await axios.post("http://localhost:5000/api/trade/execute", {
            userId,
            stockSymbol,
            tradeType,
            quantity: Math.floor(strategy.capitalAllocation / stockPrice)
        });

        res.json({ msg: "Trade executed successfully!", trade: tradeResponse.data });
    } catch (error) {
        res.status(500).json({ msg: "Auto-trade execution failed", error: error.message });
    }
};
const axios = require("axios");
const { Worker } = require("worker_threads");

const executeTradeInWorker = (tradeData) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./workers/tradeWorker.js", { workerData: tradeData });

        worker.on("message", (result) => resolve(result));
        worker.on("error", (error) => reject(error));
    });
};

// Execute Trade with Optimized Speed
exports.executeOptimizedTrade = async (req, res) => {
    const { userId, stockSymbol, tradeType, quantity } = req.body;

    try {
        const tradeData = { userId, stockSymbol, tradeType, quantity };
        const tradeResult = await executeTradeInWorker(tradeData);

        res.json({ msg: "Trade executed successfully!", trade: tradeResult });
    } catch (error) {
        res.status(500).json({ msg: "Trade execution failed", error: error.message });
    }
};
