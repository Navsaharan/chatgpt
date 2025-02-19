const axios = require("axios");

const fetchLiquidityData = async (symbol) => {
    const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=YOUR_API_KEY`);
    return response.data;
};

fetchLiquidityData("AAPL").then(data => console.log(data));  // Expected Output: Real-time market liquidity data
