const Portfolio = require("../models/Portfolio");

exports.managePortfolio = async (req, res) => {
    try {
        const { userId, stocks } = req.body;
        const portfolio = await Portfolio.findOne({ userId }) || new Portfolio({ userId, stocks: [] });

        portfolio.stocks = stocks;
        await portfolio.save();

        res.json({ msg: "AI Portfolio Updated Successfully", portfolio });
    } catch (error) {
        res.status(500).json({ msg: "Error updating AI portfolio", error: error.message });
    }
};
