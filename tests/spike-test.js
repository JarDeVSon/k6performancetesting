import http from 'k6/http';
import { check, sleep } from 'k6';
import uuid from './libs/uuid.js';

export const options = {
    // Key configurations for spike in this section
    stages: [
        { duration: '2m', target: 2000 }, // fast ramp-up to a high point
        // No plateau
        { duration: '1m', target: 0 }, // quick ramp-down to 0 users
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
