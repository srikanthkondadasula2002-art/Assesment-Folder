const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getMyOrders, getOrderById } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/initiate', protect, createOrder);
router.post('/verify-payment', protect, verifyPayment);
router.get('/', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

module.exports = router;
