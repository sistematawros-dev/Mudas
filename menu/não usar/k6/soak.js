import http from 'k6/http';

export const options = {
  scenarios: {
    soak: {
      executor: 'constant-vus',
      vus: 25,
      duration: '30m'
    }
  },
  thresholds: {
    http_req_duration: ['p(95)<1500'],
    http_req_failed: ['rate<0.02']
  }
};

const baseUrl = __ENV.BASE_URL || 'http://192.168.15.21:3000';

export default function () {
  http.get(`${baseUrl}/api/v1/health`);
}

