const Binance = require("node-binance-api");
const binance = new Binance().options({ APIKEY: "YOUR_BINANCE_API_KEY", APISECRET: "YOUR_BINANCE_API_SECRET" });

exports.executeCryptoTrade = async (req, res) => {
    try {
        const { symbol, tradeType, quantity } = req.body;
        const order = await binance.marketBuy(symbol, quantity);
        res.json({ msg: "Crypto trade executed successfully!", order });
    } catch (error) {
        res.status(500).json({ msg: "Crypto trade execution failed", error: error.message });
    }
};
