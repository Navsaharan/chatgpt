import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";

function AIAnalytics() {
    const [tradeData, setTradeData] = useState([]);
    const [profitLoss, setProfitLoss] = useState([]);
    const [winRate, setWinRate] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:5000/api/trade/analytics")
            .then((res) => {
                setTradeData(res.data.trades);
                setProfitLoss(res.data.profitLoss);
                setWinRate(res.data.winRate);
            })
            .catch((err) => console.error("Error fetching AI analytics", err));
    }, []);

    return (
        <div className="container">
            <h3>AI Trading Performance</h3>
            <div className="row">
                <div className="col-md-6">
                    <h5>Win Rate: {winRate}%</h5>
                    <Bar data={{
                        labels: tradeData.map(trade => trade.date),
                        datasets: [{ label: "Trade Success Rate", data: tradeData.map(trade => trade.successRate), backgroundColor: "blue" }]
                    }} />
                </div>
                <div className="col-md-6">
                    <h5>Profit & Loss Trend</h5>
                    <Line data={{
                        labels: profitLoss.map(pl => pl.date),
                        datasets: [{ label: "Profit/Loss (₹)", data: profitLoss.map(pl => pl.amount), borderColor: "green" }]
                    }} />
                </div>
            </div>
        </div>
    );
}

export default AIAnalytics;
