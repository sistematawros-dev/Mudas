import http from 'k6/http';

export const options = {
  scenarios: {
    breakpoint: {
      executor: 'ramping-arrival-rate',
      startRate: 20,
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 600,
      stages: [
        { target: 50, duration: '1m' },
        { target: 100, duration: '1m' },
        { target: 200, duration: '1m' },
        { target: 300, duration: '1m' },
        { target: 0, duration: '30s' }
      ]
    }
  }
};

const baseUrl = __ENV.BASE_URL || 'http://192.168.15.26:3000';

export default function () {
  http.get(`${baseUrl}/api/v1/health`);
}

