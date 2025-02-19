const speakeasy = require("speakeasy");

exports.generateMFA = async (req, res) => {
    const secret = speakeasy.generateSecret({ length: 20 });
    res.json({ secret: secret.base32, otpUrl: secret.otpauth_url });
};

exports.verifyMFA = async (req, res) => {
    const { secret, token } = req.body;
    const verified = speakeasy.totp.verify({ secret, encoding: "base32", token });
    res.json({ verified });
};
