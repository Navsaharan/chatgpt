const express = require("express");
const router = express.Router();
const { getAllUsers, getAIStrategies } = require("../controllers/adminController");

router.get("/users", getAllUsers);
router.get("/ai-strategies", getAIStrategies);
const { authenticateAdmin } = require("../middleware/authMiddleware");

router.get("/users", authenticateAdmin, getAllUsers);
router.get("/ai-strategies", authenticateAdmin, getAIStrategies);

module.exports = router;
