import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchTradeHistory = async ({ queryKey }) => {
    const [, page] = queryKey;
    const res = await axios.get(`http://localhost:5000/api/trade/history?page=${page}`);
    return res.data;
};

function TradeHistory() {
    const { data, isLoading } = useQuery(["tradeHistory", 1], fetchTradeHistory);

    return (
        <div>
            <h3>Trade History</h3>
            {isLoading ? <p>Loading...</p> : (
                <ul>
                    {data.results.map((trade, index) => (
                        <li key={index}>{trade.stock} - {trade.tradeType} @ ₹{trade.price}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TradeHistory;
