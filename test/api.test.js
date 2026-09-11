const http = require('http');
const app = require('../server');

let server;
const PORT = 5099;

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = http.request({
      hostname: '127.0.0.1',
      port: PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
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
  console.log('🚀 Starting Full-Stack API Suite Tests...\n');
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
      // 1. Health Check
      const health = await request('GET', '/api/health');
      assert(health.status === 200 && health.data.status === 'online', 'GET /api/health is online');

      // 2. Products List
      const prods = await request('GET', '/api/products');
      assert(prods.status === 200 && prods.data.count >= 14, `GET /api/products returns ${prods.data.count} items`);

      // 3. Products Category Filter
      const menProds = await request('GET', '/api/products?category=men');
      assert(menProds.status === 200 && menProds.data.data.every(p => p.gender === 'men'), 'GET /api/products?category=men filters correctly');

      // 4. Products Search
      const searchProds = await request('GET', '/api/products?search=leather');
      assert(searchProds.status === 200 && searchProds.data.data.length > 0, 'GET /api/products?search=leather finds matches');

      // 5. Single Product
      const singleProd = await request('GET', '/api/products/1');
      assert(singleProd.status === 200 && singleProd.data.data.id === 1, 'GET /api/products/1 returns product details & reviews');

      // 6. Validate Promo Code
      const validPromo = await request('POST', '/api/promos/validate', { code: 'STYLENEST20', subtotal: 100 });
      assert(validPromo.status === 200 && validPromo.data.discount === 20, 'POST /api/promos/validate calculates 20% discount');

      const invalidPromo = await request('POST', '/api/promos/validate', { code: 'FAKECODE', subtotal: 100 });
      assert(invalidPromo.status === 400 && invalidPromo.data.valid === false, 'POST /api/promos/validate rejects fake codes');

      // 7. Post Review
      const newReview = await request('POST', '/api/reviews', {
        productId: 1,
        name: 'Automated Tester',
        rating: 5,
        comment: 'Full-stack testing comment for StyleNest high tops.'
      });
      assert(newReview.status === 201 && newReview.data.data.name === 'Automated Tester', 'POST /api/reviews persists review');

      // 8. Place Order
      const newOrder = await request('POST', '/api/orders', {
        customer: {
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          address: '100 Fashion Boulevard',
          city: 'New York',
          postalCode: '10001'
        },
        items: [
          { id: 1, name: 'LED High Tops', price: 80, quantity: 1, size: '9', color: 'Black' }
        ],
        promoCode: 'STYLENEST20',
        paymentMethod: 'CREDIT CARD'
      });
      assert(newOrder.status === 201 && newOrder.data.data.id.startsWith('ORD-'), `POST /api/orders creates order (${newOrder.data.data?.id})`);

      // 9. Admin Stats
      const stats = await request('GET', '/api/admin/stats');
      assert(stats.status === 200 && stats.data.data.totalOrders >= 3, `GET /api/admin/stats returns aggregated metrics (Total Orders: ${stats.data.data.totalOrders})`);

      // 10. Update Order Status
      const updateStatus = await request('PATCH', `/api/orders/${newOrder.data.data.id}/status`, { status: 'Shipped' });
      assert(updateStatus.status === 200 && updateStatus.data.data.status === 'Shipped', 'PATCH /api/orders/:id/status updates fulfillment state');

      console.log(`\n===================================`);
      console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
      console.log(`===================================\n`);

    } catch (err) {
      console.error('Test execution error:', err);
      failed++;
    } finally {
      server.close(() => {
        process.exit(failed > 0 ? 1 : 0);
      });
    }
  });
}

runTests();
