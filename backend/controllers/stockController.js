const axios = require("axios");
const cheerio = require("cheerio"); // For web scraping
require("dotenv").config();

// API Endpoints
const apiEndpoints = {
    zerodha: `https://api.kite.trade/quote?api_key=${process.env.ZERODHA_API_KEY}&i=NSE:`,
    upstox: `https://api.upstox.com/v2/market/quotes?apiKey=${process.env.UPSTOX_API_KEY}&symbol=`,
    angel: `https://smartapi.angelbroking.com/market/v1/quote?token=${process.env.ANGEL_API_KEY}&symbol=`,
    alphaVantage: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=`,
};

// Fetch stock price from APIs
exports.getStockPrice = async (req, res) => {
    const { stockSymbol } = req.params;
    try {
        let stockData = null;

        // Try fetching from Zerodha
        try {
            const response = await axios.get(apiEndpoints.zerodha + stockSymbol);
            stockData = response.data;
        } catch (error) {
            console.log("❌ Zerodha API Failed. Switching to Upstox...");
        }

        // Try fetching from Upstox if Zerodha fails
        if (!stockData) {
            try {
                const response = await axios.get(apiEndpoints.upstox + stockSymbol);
                stockData = response.data;
            } catch (error) {
                console.log("❌ Upstox API Failed. Switching to Angel One...");
            }
        }

        // Try fetching from Angel One if Upstox fails
        if (!stockData) {
            try {
                const response = await axios.get(apiEndpoints.angel + stockSymbol);
                stockData = response.data;
            } catch (error) {
                console.log("❌ Angel One API Failed. Switching to Alpha Vantage...");
            }
        }

        // Try fetching from Alpha Vantage if all Indian APIs fail
        if (!stockData) {
            try {
                const response = await axios.get(`${apiEndpoints.alphaVantage}${stockSymbol}&apikey=${process.env.ALPHA_VANTAGE_KEY}`);
                stockData = response.data["Global Quote"];
            } catch (error) {
                console.log("❌ Alpha Vantage API Failed. Using Web Scraping...");
            }
        }

        // If all APIs fail, use web scraping
        if (!stockData) {
            stockData = await scrapeStockPrice(stockSymbol);
        }

        if (!stockData) return res.status(500).json({ error: "Failed to fetch stock data" });

        res.json({ stockSymbol, stockData });
    } catch (error) {
        res.status(500).json({ error: "Server error fetching stock data" });
    }
};

// Web Scraping Backup (Only if APIs Fail)
const scrapeStockPrice = async (stockSymbol) => {
    try {
        const url = `https://www.moneycontrol.com/india/stockpricequote/${stockSymbol}`;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const price = $(".stock-price").text();
        return { price };
    } catch (error) {
        console.log("❌ Web Scraping Failed.");
        return null;
    }
};
