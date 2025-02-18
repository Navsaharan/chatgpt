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
const User = require("../models/User");

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
