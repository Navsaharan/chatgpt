const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 }); // Cache for 60 seconds

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;
    const cachedData = cache.get(key);
    if (cachedData) return res.json(cachedData);
    res.sendResponse = res.json;
    res.json = (body) => {
        cache.set(key, body);
        res.sendResponse(body);
    };
    next();
}

module.exports = cacheMiddleware;
