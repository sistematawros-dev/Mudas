import http from 'k6/http';

export const options = {
  scenarios: {
    spike: {
      executor: 'ramping-vus',
      stages: [
        { duration: '30s', target: 20 },
        { duration: '30s', target: 250 },
        { duration: '1m', target: 20 },
        { duration: '30s', target: 0 }
      ]
    }
  }
};

const baseUrl = __ENV.BASE_URL || 'http://192.168.15.21:3000';

export default function () {
  http.get(`${baseUrl}/api/v1/health`);
}

