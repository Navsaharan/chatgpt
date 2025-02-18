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
