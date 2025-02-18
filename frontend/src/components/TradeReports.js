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
import React from "react";

function TradeReports() {
    const downloadReport = (format) => {
        window.open(`http://localhost:5000/api/report/download/${format}/USER_ID_HERE`, "_blank");
    };

    return (
        <div className="container mt-4">
            <h3>Download Trade Report</h3>
            <button className="btn btn-danger me-2" onClick={() => downloadReport("pdf")}>Download PDF</button>
            <button className="btn btn-success" onClick={() => downloadReport("excel")}>Download Excel</button>
        </div>
    );
}

export default TradeReports;

