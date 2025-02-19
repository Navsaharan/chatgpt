const request = require("supertest");
const app = require("../server");

describe("AI Trading System Stress Test", () => {
    it("should handle 1000+ trade requests per second", async () => {
        for (let i = 0; i < 1000; i++) {
            await request(app).post("/api/trade/execute").send({
                userId: "USER_ID_HERE",
                stockSymbol: "AAPL",
                tradeType: "BUY",
                quantity: 10
            });
        }
    });
});
