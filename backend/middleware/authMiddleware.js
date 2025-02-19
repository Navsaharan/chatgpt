const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "Access Denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ msg: "Invalid Token" });
    }
};
const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "Unauthorized Access" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ msg: "Invalid Token" });
    }
}

function authenticateAdmin(req, res, next) {
    authenticateUser(req, res, () => {
        if (req.user.role !== "admin") return res.status(403).json({ msg: "Admin Access Required" });
        next();
    });
}

module.exports = { authenticateUser, authenticateAdmin };
const jwt = require("jsonwebtoken");

exports.authenticateUser = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ msg: "Access Denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ msg: "Invalid Token" });
        req.user = user;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") return res.status(403).json({ msg: "Unauthorized" });
    next();
};

module.exports = authMiddleware;
