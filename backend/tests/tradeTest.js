const axios = require("axios");

async function testTradeExecution() {
    try {
        const response = await axios.post("http://localhost:5000/api/trade/execute", {
            userId: "testUser123",
            stockSymbol: "RELIANCE",
            tradeType: "BUY",
            quantity: 10
        });
        console.log("✅ Trade Test Passed:", response.data);
    } catch (error) {
        console.error("❌ Trade Test Failed:", error.response.data);
    }
}

testTradeExecution();
