const axios = require("axios");

exports.executeForexTrade = async (req, res) => {
    try {
        const { pair, tradeType, quantity } = req.body;
        const order = await axios.post("https://api-fxtrade.oanda.com/v3/orders", {
            instrument: pair,
            units: quantity,
            type: tradeType.toUpperCase()
        }, {
            headers: { Authorization: `Bearer YOUR_OANDA_API_KEY` }
        });

        res.json({ msg: "Forex trade executed successfully!", order: order.data });
    } catch (error) {
        res.status(500).json({ msg: "Forex trade execution failed", error: error.message });
    }
};
