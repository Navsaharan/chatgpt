const { spawn } = require("child_process");
const User = require("../models/User");
exports.getTradeSignal = async (req, res) => {
    const { stockSymbol } = req.params;

    try {
        const pythonProcess = spawn("python", ["./ai-engine/ai_trade_signals.py", stockSymbol]);

        let output = "";
        pythonProcess.stdout.on("data", (data) => {
            output += data.toString();
        });

        pythonProcess.on("close", () => {
            res.json(JSON.parse(output));
        });
    } catch (error) {
        res.status(500).json({ msg: "AI Trade Signal Generation Failed", error: error.message });
    }
};


// Update AI Settings
exports.updateAISettings = async (req, res) => {
    const { userId } = req.params;
    const updatedSettings = req.body;

    try {
        let user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        user.aiPreferences = { ...user.aiPreferences, ...updatedSettings };
        await user.save();

        res.json({ msg: "AI Settings Updated Successfully", aiPreferences: user.aiPreferences });
    } catch (error) {
        res.status(500).json({ msg: "Error updating AI settings", error: error.message });
    }
};
const { spawn } = require("child_process");

exports.runPaperTrading = async (req, res) => {
    const { stockSymbol } = req.params;

    try {
        const pythonProcess = spawn("python", ["./ai-engine/ai_paper_trading.py", stockSymbol]);

        let output = "";
        pythonProcess.stdout.on("data", (data) => {
            output += data.toString();
        });

        pythonProcess.on("close", () => {
            res.json(JSON.parse(output));
        });
    } catch (error) {
        res.status(500).json({ msg: "Paper Trading Failed", error: error.message });
    }
};
exports.runBacktesting = async (req, res) => {
    const { stockSymbol } = req.params;

    try {
        const pythonProcess = spawn("python", ["./ai-engine/ai_backtest.py", stockSymbol]);

        let output = "";
        pythonProcess.stdout.on("data", (data) => {
            output += data.toString();
        });

        pythonProcess.on("close", () => {
            res.json(JSON.parse(output));
        });
    } catch (error) {
        res.status(500).json({ msg: "Backtesting Failed", error: error.message });
    }
};
const { spawn } = require("child_process");

exports.getStockPrediction = async (req, res) => {
    const { stockSymbol } = req.params;

    try {
        const pythonProcess = spawn("python", ["./ai-engine/ai_stock_prediction.py", stockSymbol]);

        let output = "";
        pythonProcess.stdout.on("data", (data) => {
            output += data.toString();
        });

        pythonProcess.on("close", () => {
            res.json(JSON.parse(output));
        });
    } catch (error) {
        res.status(500).json({ msg: "Stock Prediction Failed", error: error.message });
    }
};

// Get AI Settings
exports.getAISettings = async (req, res) => {
    const { userId } = req.params;

    try {
        let user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json({ aiPreferences: user.aiPreferences });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching AI settings", error: error.message });
    }
};
const { spawn } = require("child_process");

exports.getMarketSentiment = async (req, res) => {
    const { stockSymbol } = req.params;

    try {
        const pythonProcess = spawn("python", ["./ai-engine/ai_sentiment_analysis.py", stockSymbol]);

        let output = "";
        pythonProcess.stdout.on("data", (data) => {
            output += data.toString();
        });

        pythonProcess.on("close", () => {
            res.json(JSON.parse(output));
        });
    } catch (error) {
        res.status(500).json({ msg: "Sentiment Analysis Failed", error: error.message });
    }
};
exports.detectMarketAnomalies = async (req, res) => {
    const { stockSymbol } = req.params;

    try {
        const pythonProcess = spawn("python", ["./ai-engine/ai_anomaly_detection.py", stockSymbol]);

        let output = "";
        pythonProcess.stdout.on("data", (data) => {
            output += data.toString();
        });

        pythonProcess.on("close", () => {
            res.json(JSON.parse(output));
        });
    } catch (error) {
        res.status(500).json({ msg: "Anomaly Detection Failed", error: error.message });
    }
};
