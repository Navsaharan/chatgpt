const express = require("express");
const router = express.Router();
const { getAllUsers, getAIStrategies } = require("../controllers/adminController");

router.get("/users", getAllUsers);
router.get("/ai-strategies", getAIStrategies);

module.exports = router;
