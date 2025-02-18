const express = require("express");
const router = express.Router();
const { getTradeSignal } = require("../controllers/aiController");

router.get("/trade-signal/:stockSymbol", getTradeSignal);

module.exports = router;
