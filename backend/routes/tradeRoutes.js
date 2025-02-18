const { paginateResults } = require("../utils/pagination");
const Trade = require("../models/Trade");

router.get("/history", paginateResults(Trade), (req, res) => {
    res.json(res.paginatedResults);
});
