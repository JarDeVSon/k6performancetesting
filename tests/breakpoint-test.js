import http from 'k6/http';
import { check, sleep } from 'k6';
import uuid from './libs/uuid.js';

export const options = {
    // Key configurations for breakpoint in this section
    executor: 'ramping-arrival-rate', //Assure load increase if the system slows
    stages: [
        { duration: '2h', target: 20000 }, // just slowly ramp-up to a HUGE load
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
