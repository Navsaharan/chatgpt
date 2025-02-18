const Trade = require("../models/Trade");
const { Parser } = require("json2csv");

exports.downloadTradeReport = async (req, res) => {
    try {
        const trades = await Trade.find({ userId: req.params.userId });
        const fields = ["stock", "tradeType", "price", "quantity", "executedAt"];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(trades);

        res.attachment("trade_report.csv");
        res.status(200).send(csv);
    } catch (error) {
        res.status(500).json({ msg: "Error generating report", error: error.message });
    }
};
