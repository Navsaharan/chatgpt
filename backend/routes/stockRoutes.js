const express = require("express");
const router = express.Router();
const { getStockPrice } = require("../controllers/stockController");

router.get("/price/:stockSymbol", getStockPrice);
const cacheMiddleware = require("../middleware/cacheMiddleware");

router.get("/price/:stockSymbol", cacheMiddleware, getStockPrice);

module.exports = router;
