import http from 'k6/http';
import { check, sleep } from 'k6';
import uuid from './libs/uuid.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    // Key configurations for avg load test in this section
    stages: [
        { duration: '5m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
        { duration: '15m', target: 100 }, // stay at 100 users for 30 minutes
        { duration: '5m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2s
    }
};
export function handleSummary(data) {
    return {
      "index.html": htmlReport(data),
    };
  }
export default function () {
    const url = "http://localhost:3333/signup";

    const payload = JSON.stringify({
        email: `${uuid.v4()}@qacademy.io.com.br`,
        password: "password123"
    });

    const headers = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const res = http.post(url, payload, headers);

    // console.log(res.body);

    check(res, {
        "status was 201": (r) => r.status === 201,
    });
    
}
