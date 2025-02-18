const { parentPort, workerData } = require("worker_threads");
const axios = require("axios");

async function executeTrade(tradeData) {
    try {
        const response = await axios.post("http://localhost:5000/api/trade/execute", tradeData);
        parentPort.postMessage(response.data);
    } catch (error) {
        parentPort.postMessage({ error: "Trade execution failed" });
    }
}

executeTrade(workerData);
