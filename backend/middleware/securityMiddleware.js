const rateLimit = require("express-rate-limit");
const bcrypt = require("bcryptjs");

// Rate Limit API Requests
exports.apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "Too many requests, please try again later."
});

// Encrypt API Keys Before Storing in DB
exports.encryptAPIKey = async (apiKey) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(apiKey, salt);
};
