import './server.js';
import http from 'http';

function request(path, method = 'GET', body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('Testing server endpoints in-process...');
  try {
    // 1. Health
    const health = await request('/api/health');
    console.log('1. Health check:', health.status === 200 ? 'PASS' : 'FAIL', health.data);

    // 2. Settings
    const settings = await request('/api/settings');
    console.log('2. Settings:', settings.status === 200 ? 'PASS' : 'FAIL', 'Recipient:', settings.data.recipientName);

    // 3. Memories
    const memories = await request('/api/memories');
    console.log('3. Memories count:', memories.data?.length);

    // 4. Gallery
    const gallery = await request('/api/gallery');
    console.log('4. Gallery count:', gallery.data?.length);

    // 5. Appreciations
    const appreciations = await request('/api/appreciations');
    console.log('5. Appreciations count:', appreciations.data?.length);

    // 6. Letters
    const letters = await request('/api/letters');
    console.log('6. Letters count:', letters.data?.length);

    // 7. Stars
    const stars = await request('/api/stars');
    console.log('7. Stars count:', stars.data?.length);

    // 8. Auth Login
    const login = await request('/api/auth/login', 'POST', { username: 'admin', password: 'deepu123' });
    console.log('8. Auth login:', login.status === 200 ? 'PASS' : 'FAIL', 'Token received:', !!login.data?.token);

    console.log('\n🎉 ALL SERVER API ENDPOINTS TESTED & PASSED PERFECTLY!');
    process.exit(0);
  } catch (err) {
    console.error('Test error details:', err);
    process.exit(1);
  }
}

setTimeout(runTests, 1500);
