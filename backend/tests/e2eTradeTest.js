const request = require("supertest");
const app = require("../server");

describe("End-to-End AI Trade Execution Tests", () => {
    it("should correctly execute a trade and validate profit/loss", async () => {
        const tradeResponse = await request(app).post("/api/trade/execute").send({
            userId: "USER_ID_HERE",
            stockSymbol: "RELIANCE",
            tradeType: "BUY",
            quantity: 10
        });

        expect(tradeResponse.status).toBe(200);
        expect(tradeResponse.body.msg).toBe("Trade executed successfully!");

        const profitLossResponse = await request(app).get("/api/trade/profit-loss/USER_ID_HERE");
        expect(profitLossResponse.status).toBe(200);
        expect(profitLossResponse.body.totalProfit).toBeGreaterThanOrEqual(0);
    });
});
