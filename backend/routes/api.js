const express = require('express');
const router = express.Router();
const db = require('../db');

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    service: 'StyleNest REST API'
  });
});

// Products
router.get('/products', (req, res) => {
  try {
    const { category, search, q, sort } = req.query;
    const products = db.getProducts({
      category,
      search: search || q,
      sort
    });
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/products/:id', (req, res) => {
  try {
    const product = db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    const reviews = db.getReviews(product.id);
    res.json({
      success: true,
      data: {
        ...product,
        reviews
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Customer Reviews
router.get('/reviews/:productId', (req, res) => {
  try {
    const reviews = db.getReviews(req.params.productId);
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/reviews', (req, res) => {
  try {
    const { productId, name, rating, comment } = req.body;
    if (!productId || !comment) {
      return res.status(400).json({
        success: false,
        error: 'Product ID and comment are required.'
      });
    }

    const review = db.addReview({
      productId,
      name,
      rating,
      comment
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully!',
      data: review
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Promo Voucher Validation
router.post('/promos/validate', (req, res) => {
  try {
    const { code, subtotal } = req.body;
    const result = db.validatePromo(code, Number(subtotal) || 0);
    if (!result.valid) {
      return res.status(400).json({ success: false, ...result });
    }
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Orders
router.get('/orders', (req, res) => {
  try {
    const orders = db.getOrders();
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/orders/:id', (req, res) => {
  try {
    const order = db.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found.' });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/orders', (req, res) => {
  try {
    const { customer, items, promoCode, paymentMethod } = req.body;
    const order = db.createOrder({
      customer,
      items,
      promoCode,
      paymentMethod
    });
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: order
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.patch('/orders/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const order = db.updateOrderStatus(req.params.id, status);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found.' });
    }
    res.json({ success: true, message: 'Status updated', data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin Analytics
router.get('/admin/stats', (req, res) => {
  try {
    const stats = db.getAdminStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
