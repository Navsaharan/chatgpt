const express = require("express");
const router = express.Router();
const { getTradeSignal } = require("../controllers/aiController");

router.get("/trade-signal/:stockSymbol", getTradeSignal);

const { updateAISettings, getAISettings } = require("../controllers/aiController");

router.put("/settings/:userId", updateAISettings);
router.get("/settings/:userId", getAISettings);


module.exports = router;
