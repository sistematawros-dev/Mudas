import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<800'],
    http_req_failed: ['rate<0.01']
  }
};

const baseUrl = __ENV.BASE_URL || 'http://192.168.15.21:3000';

export default function () {
  const res = http.get(`${baseUrl}/api/v1/health`);
  check(res, {
    'status 200': (r) => r.status === 200
  });
  sleep(1);
}

