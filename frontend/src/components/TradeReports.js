import React from "react";

function TradeReports() {
    const downloadReport = () => {
        window.open(`http://localhost:5000/api/report/download/USER_ID_HERE`, "_blank");
    };

    return (
        <div className="container mt-4">
            <h3>Download Trade Report</h3>
            <button className="btn btn-success" onClick={downloadReport}>Download CSV Report</button>
        </div>
    );
}

export default TradeReports;
