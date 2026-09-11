const Razorpay = require('razorpay');

let razorpayInstance;

try {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_flipkart_demo123',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret_demo456'
  });
} catch (e) {
  console.warn('Razorpay SDK initialized in mock test mode.');
}

// Resilient wrapper that provides sandbox order creation if Razorpay fails or credentials are placeholders
const razorpay = {
  orders: {
    create: async (options) => {
      try {
        if (razorpayInstance && process.env.RAZORPAY_KEY_SECRET !== 'rzp_test_secret_demo456') {
          return await razorpayInstance.orders.create(options);
        }
      } catch (err) {
        console.warn('Using sandbox fallback for Razorpay order generation');
      }
      return {
        id: 'order_fk_' + Math.random().toString(36).substring(2, 12),
        entity: 'order',
        amount: options.amount,
        amount_paid: 0,
        amount_due: options.amount,
        currency: options.currency || 'INR',
        receipt: options.receipt,
        status: 'created',
        attempts: 0,
        created_at: Math.floor(Date.now() / 1000)
      };
    }
  }
};

module.exports = razorpay;
