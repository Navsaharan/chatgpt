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
const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");
const Trade = require("../models/Trade");

// Generate PDF Report
exports.downloadPDFReport = async (req, res) => {
    const trades = await Trade.find({ userId: req.params.userId });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=trade_report.pdf");

    doc.text("AI Trading Report", { align: "center" });
    trades.forEach(trade => {
        doc.text(`Stock: ${trade.stock} | Type: ${trade.tradeType} | Profit: ₹${trade.profit}`);
    });

    doc.pipe(res);
    doc.end();
};

// Generate Excel Report
exports.downloadExcelReport = async (req, res) => {
    const trades = await Trade.find({ userId: req.params.userId });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Trade Report");
    sheet.addRow(["Stock", "Trade Type", "Profit", "Date"]);

    trades.forEach(trade => {
        sheet.addRow([trade.stock, trade.tradeType, trade.profit, trade.executedAt]);
    });

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=trade_report.xlsx");

    await workbook.xlsx.write(res);
    res.end();
};
