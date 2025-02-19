const executeTrade = async (req, res) => {
    const { assetType, symbol, tradeType, quantity } = req.body;

    let apiEndpoint = "";
    if (assetType === "stocks") apiEndpoint = "/api/trade/stocks";
    else if (assetType === "forex") apiEndpoint = "/api/trade/forex";
    else if (assetType === "crypto") apiEndpoint = "/api/trade/crypto";

    const response = await axios.post(`http://localhost:5000${apiEndpoint}`, { symbol, tradeType, quantity });
    res.json(response.data);
};
