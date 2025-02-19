const axios = require("axios");
const admin = require("firebase-admin");

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert("firebase-adminsdk.json"),
});

const sendTradeAlert = async (message) => {
    const payload = {
        notification: { title: "AI Trade Alert", body: message },
        topic: "trade-alerts"
    };
    await admin.messaging().send(payload);
};

sendTradeAlert("AI suggests buying Tesla stock at $750!");
