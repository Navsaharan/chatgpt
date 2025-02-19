const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("📡 New Market Data Connection");

    setInterval(() => {
        ws.send(JSON.stringify({ stock: "AAPL", price: (Math.random() * 100).toFixed(2) }));
    }, 500);
});
