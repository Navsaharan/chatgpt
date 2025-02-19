import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function LiveTradeUpdates() {
    const [tradeUpdate, setTradeUpdate] = useState(null);

    useEffect(() => {
        const socket = io("http://localhost:5000");

        socket.on("trade_update", (data) => {
            setTradeUpdate(data);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div className="container mt-4">
            <h3>Live AI Trade Updates</h3>
            {tradeUpdate && (
                <div className="alert alert-info">
                    <strong>{tradeUpdate.stock}</strong>: ₹{tradeUpdate.price.toFixed(2)}
                </div>
            )}
        </div>
    );
}

export default LiveTradeUpdates;
