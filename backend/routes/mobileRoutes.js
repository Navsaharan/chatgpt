const express = require("express");
const router = express.Router();
const { executeAutoTrade } = require("../controllers/tradeExecutionController");

router.post("/trade/auto", executeAutoTrade);

module.exports = router;
