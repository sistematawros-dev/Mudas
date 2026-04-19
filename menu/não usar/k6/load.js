import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    load: {
      executor: 'ramping-vus',
      stages: [
        { duration: '1m', target: 30 },
        { duration: '3m', target: 30 },
        { duration: '1m', target: 0 }
      ]
    }
  },
  thresholds: {
    http_req_duration: ['p(95)<1200', 'p(99)<2000'],
    http_req_failed: ['rate<0.02']
  }
};

const baseUrl = __ENV.BASE_URL || 'http://192.168.15.10:3000';

export default function () {
  const health = http.get(`${baseUrl}/api/v1/health`);
  check(health, { 'health 200': (r) => r.status === 200 });
}

