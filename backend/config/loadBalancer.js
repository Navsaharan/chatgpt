const express = require("express");
const axios = require("axios");

const servers = [
    "http://backend-instance-1:5000",
    "http://backend-instance-2:5000"
];

let current = 0;

const app = express();

app.use((req, res) => {
    const server = servers[current];
    current = (current + 1) % servers.length;
    axios({ method: req.method, url: `${server}${req.url}`, data: req.body })
        .then(response => res.json(response.data))
        .catch(err => res.status(500).json({ error: "Server Down" }));
});

app.listen(8080, () => console.log("Load Balancer Running on Port 8080"));
