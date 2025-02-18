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
const request = require("supertest");
const app = require("../server");

describe("AI Trade Execution Tests", () => {
    it("should execute a buy trade successfully", async () => {
        const response = await request(app).post("/api/trade/execute").send({
            userId: "USER_ID_HERE",
            stockSymbol: "RELIANCE",
            tradeType: "BUY",
            quantity: 10
        });
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe("Trade executed successfully!");
    });

    it("should trigger stop-loss if price falls below limit", async () => {
        const response = await request(app).post("/api/risk/check-stop-loss").send({
            userId: "USER_ID_HERE",
            stockSymbol: "RELIANCE",
            currentPrice: 2200  // Assume stop-loss threshold is 2250
        });
        expect(response.body.action).toBe("SELL");
    });

    it("should prevent trading if max daily loss is reached", async () => {
        const response = await request(app).get("/api/risk/max-daily-loss/USER_ID_HERE");
        expect(response.body.action).toBe("STOP_TRADING");
    });
});
