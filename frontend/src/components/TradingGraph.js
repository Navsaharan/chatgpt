import React from "react";
import { Line } from "react-chartjs-2";

function TradingGraph({ tradeHistory }) {
    const data = {
        labels: tradeHistory.map((trade) => trade.date),
        datasets: [
            {
                label: "Stock Price",
                data: tradeHistory.map((trade) => trade.price),
                borderColor: "blue",
                borderWidth: 2,
                fill: false
            }
        ]
    };

    return (
        <div>
            <h4>Stock Price Movement</h4>
            <Line data={data} />
        </div>
    );
}

export default TradingGraph;
