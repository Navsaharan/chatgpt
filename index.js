const API_KEY = "YOUR_ALPHA_VANTAGE_API_KEY"; // Replace with your API key
const stocks = ["RELIANCE.BSE", "TCS.BSE", "INFY.BSE"]; // List of stocks to track

async function fetchStockPrices() {
    stocks.forEach(stock => {
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                if (data["Global Quote"]) {
                    const stockPrice = parseFloat(data["Global Quote"]["05. price"]).toFixed(2);
                    const changePercent = data["Global Quote"]["10. change percent"];
                    updateStockRow(stock, stockPrice, changePercent);
                }
            })
            .catch(error => console.log("Error fetching stock data:", error));
    });
}

function updateStockRow(stock, price, changePercent) {
    const tableBody = document.getElementById("watchlist");
    let row = document.querySelector(`#stock-${stock}`);
    
    if (!row) {
        row = document.createElement("tr");
        row.id = `stock-${stock}`;
        row.innerHTML = `<td>${stock}</td><td>₹ ${price}</td><td>${changePercent}</td>`;
        tableBody.appendChild(row);
    } else {
        row.children[1].innerHTML = `₹ ${price}`;
        row.children[2].innerHTML = changePercent;
    }
}

// Auto-update every 10 seconds
setInterval(fetchStockPrices, 10000);
fetchStockPrices();
const brokerAPIs = {
    zerodha: { name: "Zerodha", baseURL: "https://api.kite.trade/orders/regular" },
    upstox: { name: "Upstox", baseURL: "https://api.upstox.com/v2/order/place" },
    angel: { name: "Angel One", baseURL: "https://smartapi.angelbroking.com/order/v1/placeOrder" }
};

let selectedBroker = "zerodha"; // Default broker

function placeOrder(orderType) {
    const stock = document.getElementById("stockSelector").value;
    const qty = document.getElementById("tradeQty").value;
    const apiURL = brokerAPIs[selectedBroker].baseURL;

    if (!qty || qty <= 0) {
        alert("Please enter a valid quantity!");
        return;
    }

    const orderData = {
        stock: stock,
        quantity: qty,
        transaction_type: orderType,
        exchange: "NSE"
    };

    fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_ACCESS_TOKEN" // Replace with actual token
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            document.getElementById("tradeStatus").innerHTML = `<div class="alert alert-success">Trade Successful: ${orderType} ${qty} shares of ${stock}</div>`;
        } else {
            document.getElementById("tradeStatus").innerHTML = `<div class="alert alert-danger">Trade Failed: ${data.message}</div>`;
        }
    })
    .catch(error => console.error("Error placing order:", error));
}
function changeBroker() {
    selectedBroker = document.getElementById("brokerSelector").value;
    console.log(`Switched to ${brokerAPIs[selectedBroker].name}`);
}

