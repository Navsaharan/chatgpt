const { spawn } = require("child_process");

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
