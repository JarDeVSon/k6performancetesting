import http from "k6/http";
import { check, sleep } from "k6";
import uuid from './libs/uuid.js';

export const options = {
    // Key for Smoke test. Keep it at 1, 2, 3, max 10 VUs
    stages: [
        { duration: "1m", target: 1 }, // This can be shorter or just a few iterations
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2s
    }
};

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
    sleep(1);
}
