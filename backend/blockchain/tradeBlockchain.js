const Web3 = require("web3");
const web3 = new Web3("https://ethereum-node-url");

const contractAddress = "0xYourSmartContractAddress";
const contractABI = [];  // Define your smart contract ABI

const contract = new web3.eth.Contract(contractABI, contractAddress);

exports.logTrade = async (trade) => {
    await contract.methods.recordTrade(trade.stock, trade.price, trade.quantity).send({ from: "0xYourWalletAddress" });
};
