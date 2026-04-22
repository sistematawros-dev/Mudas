import http from 'k6/http';

export const options = {
  scenarios: {
    stress: {
      executor: 'ramping-vus',
      stages: [
        { duration: '1m', target: 50 },
        { duration: '2m', target: 100 },
        { duration: '2m', target: 150 },
        { duration: '1m', target: 0 }
      ]
    }
  },
  thresholds: {
    http_req_duration: ['p(95)<2500'],
    http_req_failed: ['rate<0.05']
  }
};

const baseUrl = __ENV.BASE_URL || 'http://192.168.15.21:3000';

export default function () {
  http.get(`${baseUrl}/api/v1/readiness`);
}

