const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password"
    }
});

exports.sendEmailAlert = async (subject, message, recipient) => {
    const mailOptions = {
        from: "your-email@gmail.com",
        to: recipient,
        subject: subject,
        text: message
    };

    await transporter.sendMail(mailOptions);
};
