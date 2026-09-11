const http = require('http');
const app = require('../server');

let server;
const PORT = 5098;

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = http.request({
      hostname: '127.0.0.1',
      port: PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
        ...headers
      }
    }, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(raw) });
        } catch(e) {
          resolve({ status: res.statusCode, raw });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function runTests() {
  console.log('🚀 Running Flipkart Backend REST Tests...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  server = app.listen(PORT, async () => {
    try {
      // 1. Health
      const health = await request('GET', '/api/health');
      assert(health.status === 200 && health.data.status === 'online', 'Health endpoint reachable');

      // 2. Auth OTP Login
      const auth = await request('POST', '/api/v1/auth/login', { identifier: '9876543210', isOtp: true });
      assert(auth.status === 200 && auth.data.success && auth.data.accessToken, 'OTP Login returns user & JWT access token');

      // 3. Products
      const prods = await request('GET', '/api/v1/products');
      assert(prods.status === 200 && prods.data.products.length > 0, `Products endpoint returns ${prods.data.products.length} products`);

      // 4. Products Filter by Category & Brand
      const mobiles = await request('GET', '/api/v1/products?category=mobiles&brand=Apple');
      assert(mobiles.status === 200 && mobiles.data.products.every(p => p.brand === 'Apple'), 'Filters by category=mobiles & brand=Apple');

      // 5. Pincode Check
      const pin = await request('GET', '/api/v1/pincode/560001');
      assert(pin.status === 200 && pin.data.serviceable && pin.data.city === 'Bengaluru', 'Pincode 560001 serviceable in Bengaluru');

      // 6. Order Initiation (COD)
      const order = await request('POST', '/api/v1/orders/initiate', {
        orderItems: [
          {
            product: prods.data.products[0]._id,
            title: prods.data.products[0].title,
            image: prods.data.products[0].images[0].url,
            price: prods.data.products[0].price,
            quantity: 1
          }
        ],
        paymentMethod: 'COD'
      });
      assert(order.status === 201 && order.data.order && order.data.order.orderStatus === 'Ordered', 'COD Order created successfully');

      // 7. Order Initiation (Razorpay)
      const rzpOrder = await request('POST', '/api/v1/orders/initiate', {
        orderItems: [
          {
            product: prods.data.products[0]._id,
            title: prods.data.products[0].title,
            image: prods.data.products[0].images[0].url,
            price: prods.data.products[0].price,
            quantity: 1
          }
        ],
        paymentMethod: 'RAZORPAY'
      });
      assert(rzpOrder.status === 201 && rzpOrder.data.razorpayOrderId, 'Razorpay order options generated');

      console.log(`\n===================================`);
      console.log(`Backend Suite: ${passed} Passed, ${failed} Failed`);
      console.log(`===================================\n`);
    } catch (e) {
      console.error('Test error:', e);
      failed++;
    } finally {
      server.close(() => {
        process.exit(failed > 0 ? 1 : 0);
      });
    }
  });
}

runTests();
