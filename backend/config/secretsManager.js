const AWS = require("aws-sdk");

const secretsManager = new AWS.SecretsManager({ region: "us-east-1" });

async function getSecret(secretName) {
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    return JSON.parse(data.SecretString);
}

module.exports = getSecret;
