const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Load Routes
const authRoutes = require("./routes/authRoutes");
const tradingRoutes = require("./routes/tradingRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/trade", tradingRoutes);

const PORT = process.env.PORT || 5000;

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// Load Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
const cors = require("cors");

app.use(cors({ origin: "*" }));  // Allows frontend to access backend

// Load Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/trade", require("./routes/tradeRoutes"));
app.use("/api/stock", require("./routes/stockRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// Load Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/trade", require("./routes/tradeRoutes"));
app.use("/api/stock", require("./routes/stockRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Load Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/trade", require("./routes/tradeRoutes"));
app.use("/api/stock", require("./routes/stockRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
const getSecret = require("./config/secretsManager");

(async () => {
    const secrets = await getSecret("familyhvsdn-secrets");
    process.env.ZERODHA_API_KEY = secrets.ZERODHA_API_KEY;
    process.env.UPSTOX_API_KEY = secrets.UPSTOX_API_KEY;
})();

// Load Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/trade", require("./routes/tradeRoutes"));
app.use("/api/stock", require("./routes/stockRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.use("/api/admin", require("./routes/adminRoutes"));

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("🔥 MongoDB Connected"))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
app.use("/api/mobile", require("./routes/mobileRoutes"));
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("📡 New WebSocket Connection Established");

    ws.on("message", (message) => {
        console.log(`📩 Received Message: ${message}`);
    });

    setInterval(() => {
        ws.send(JSON.stringify({ stockSymbol: "RELIANCE", price: (Math.random() * 100).toFixed(2) }));
    }, 2000);
});
const compression = require("compression");
const redis = require("redis");

const redisClient = redis.createClient();
app.use(compression());

const cacheMiddleware = (req, res, next) => {
    redisClient.get(req.originalUrl, (err, data) => {
        if (data) return res.json(JSON.parse(data));
        res.sendResponse = res.json;
        res.json = (body) => {
            redisClient.setex(req.originalUrl, 60, JSON.stringify(body));
            res.sendResponse(body);
        };
        next();
    });
};

app.use(cacheMiddleware);
const helmet = require("helmet");

app.use(helmet());  // Secure HTTP headers
app.use("/api/", require("./middleware/securityMiddleware").apiLimiter);  // Rate limiting
const { sendAlert } = require("./utils/alertService");

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception", err);
    sendAlert(`Server crashed: ${err.message}`);
});
const redis = require("redis");
const cache = redis.createClient();

const cacheMiddleware = (req, res, next) => {
    cache.get(req.originalUrl, (err, data) => {
        if (data) return res.json(JSON.parse(data));
        res.sendResponse = res.json;
        res.json = (body) => {
            cache.setex(req.originalUrl, 60, JSON.stringify(body));
            res.sendResponse(body);
        };
        next();
    });
};
const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log("📡 New WebSocket Connection");

    setInterval(() => {
        io.emit("trade_update", { stock: "RELIANCE", price: Math.random() * 100 });
    }, 2000);
});

app.use(cacheMiddleware);
