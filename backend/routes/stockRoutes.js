const express = require("express");
const router = express.Router();
const { getStockPrice } = require("../controllers/stockController");

router.get("/price/:stockSymbol", getStockPrice);

module.exports = router;
