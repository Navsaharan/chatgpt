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

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("🔥 MongoDB Connected"))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
