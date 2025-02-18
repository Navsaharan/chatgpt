const { WebClient } = require("@slack/web-api");

const slack = new WebClient("YOUR_SLACK_API_TOKEN");

exports.sendAlert = async (message) => {
    try {
        await slack.chat.postMessage({ channel: "#alerts", text: `🚨 ALERT: ${message}` });
    } catch (error) {
        console.error("Slack Alert Failed", error);
    }
};
