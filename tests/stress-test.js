import http from 'k6/http';
import { check, sleep } from 'k6';
import uuid from './libs/uuid.js';

export const options = {
    // Key configurations for Stress in this section
    stages: [
        { duration: '10m', target: 200 }, // traffic ramp-up from 1 to a higher 200 users over 10 minutes.
        { duration: '30m', target: 200 }, // stay at higher 200 users for 30 minutes
        { duration: '5m', target: 0 }, // ramp-down to 0 users
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
