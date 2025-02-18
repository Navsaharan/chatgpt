import http from "k6/http";
import { check } from "k6";

export default function () {
    const res = http.get("http://localhost:5000/api/stock/price/RELIANCE");
    check(res, { "status is 200": (r) => r.status === 200 });
}
