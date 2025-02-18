const axios = require("axios");
const User = require("../models/User");

// Broker API Endpoints
const brokerAPIs = {
    zerodha: "https://api.kite.trade/orders/regular",
    upstox: "https://api.upstox.com/v2/order/place",
    angelOne: "https://smartapi.angelbroking.com/order/v1/placeOrder"
};

// Execute Trade (Buy/Sell)
exports.executeTrade = async (req, res) => {
    const { userId, stockSymbol, tradeType, quantity } = req.body;

    try {
        // Get user's broker API key
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        let selectedBroker = null;
        let apiKey = null;

        // Check available broker API
        if (user.apiKeys.zerodha) {
            selectedBroker = "zerodha";
            apiKey = user.apiKeys.zerodha;
        } else if (user.apiKeys.upstox) {
            selectedBroker = "upstox";
            apiKey = user.apiKeys.upstox;
        } else if (user.apiKeys.angelOne) {
            selectedBroker = "angelOne";
            apiKey = user.apiKeys.angelOne;
        } else {
            return res.json({ redirect: "embedded_browser" });  // No API, redirect to manual trading
        }

        // Prepare trade data
        const tradeData = {
            exchange: "NSE",
            tradingsymbol: stockSymbol,
            transaction_type: tradeType,  // BUY or SELL
            quantity: quantity,
            order_type: "LIMIT",
            product: "MIS"
        };

        // Execute trade via selected broker
        const response = await axios.post(brokerAPIs[selectedBroker], tradeData, {
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }
        });

        res.json({ success: true, message: "Trade executed successfully!", data: response.data });
    } catch (error) {
        res.status(500).json({ msg: "Trade execution failed", error: error.response?.data || error.message });
    }
};
const logger = require("../config/logger");

exports.executeTrade = async (req, res) => {
    try {
        const tradeResult = await placeTrade(req.body);
        logger.info(`Trade Executed: ${JSON.stringify(tradeResult)}`);
        res.json(tradeResult);
    } catch (error) {
        logger.error("Trade Execution Failed", error);
        res.status(500).json({ msg: "Trade execution failed" });
    }
};

