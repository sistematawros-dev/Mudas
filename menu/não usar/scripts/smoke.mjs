const base = process.env.BASE_URL ?? 'http://192.168.15.10:3000';

async function run() {
  const res = await fetch(`${base}/api/v1/health`);
  if (!res.ok) {
    console.error('health failed', res.status);
    process.exit(1);
  }
  const body = await res.json();
  console.log('smoke ok', body?.data?.status);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

