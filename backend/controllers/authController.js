const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        user = new User({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

// Generate 2FA Secret
exports.generate2FA = async (req, res) => {
    const secret = speakeasy.generateSecret({ length: 20 });

    qrcode.toDataURL(secret.otpauth_url, (err, qrCodeImage) => {
        if (err) return res.status(500).json({ msg: "QR Code Generation Failed" });
        res.json({ secret: secret.base32, qrCodeImage });
    });
};

// Verify 2FA Code
exports.verify2FA = async (req, res) => {
    const { secret, token } = req.body;
    const verified = speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token
    });

    if (verified) res.json({ msg: "2FA Verified Successfully" });
    else res.status(401).json({ msg: "Invalid 2FA Code" });
};
