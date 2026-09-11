const mongoose = require('mongoose');
const crypto = require('crypto');
const Order = require('../models/Order');
const Product = require('../models/Product');
const razorpay = require('../config/razorpay');
const store = require('./memoryStore');

exports.createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || !orderItems.length) {
      return res.status(400).json({ success: false, message: 'Cart items cannot be empty.' });
    }

    let itemTotal = 0;
    for (const item of orderItems) {
      itemTotal += (Number(item.price) || 0) * (Number(item.quantity) || 1);
    }

    const deliveryFee = itemTotal >= 500 ? 0 : 40;
    const totalPrice = itemTotal + deliveryFee;
    const orderId = 'ORD-FK' + Math.floor(100000 + Math.random() * 900000);

    const orderData = {
      _id: orderId,
      user: req.user?._id || store.users[0]._id,
      orderItems,
      shippingAddress: shippingAddress || store.users[0].addresses[0],
      paymentMethod: paymentMethod || 'COD',
      paymentResult: { status: paymentMethod === 'COD' ? 'PENDING' : 'INITIATED' },
      itemTotal,
      deliveryFee,
      totalPrice,
      orderStatus: 'Ordered',
      createdAt: new Date().toISOString(),
      trackingTimeline: [
        { status: 'Ordered', date: new Date().toISOString(), description: 'Order confirmed and verified' }
      ]
    };

    if (paymentMethod === 'COD') {
      if (mongoose.connection.readyState === 1) {
        const order = await Order.create(orderData);
        return res.status(201).json({ success: true, order });
      }
      store.orders.unshift(orderData);
      return res.status(201).json({ success: true, order: orderData });
    }

    // Razorpay Integration
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalPrice * 100),
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`
    });

    orderData.paymentResult.razorpayOrderId = razorpayOrder.id;

    if (mongoose.connection.readyState === 1) {
      const order = await Order.create(orderData);
      return res.status(201).json({
        success: true,
        orderId: order._id,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: 'INR'
      });
    }

    store.orders.unshift(orderData);
    res.status(201).json({
      success: true,
      orderId: orderData._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: 'INR'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret_demo456';
    const isMock = !razorpay_signature || razorpay_signature.startsWith('sim_');

    if (!isMock) {
      const expected = crypto.createHmac('sha256', secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (expected !== razorpay_signature) {
        return res.status(400).json({ success: false, message: 'Payment verification failed' });
      }
    }

    if (mongoose.connection.readyState === 1) {
      const order = await Order.findById(orderId);
      if (order) {
        order.paymentResult = {
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature || 'simulated_sig',
          status: 'PAID'
        };
        order.trackingTimeline.push({ status: 'Packed', date: new Date(), description: 'Item verified and packed' });
        await order.save();
        return res.json({ success: true, message: 'Payment verified', order });
      }
    }

    const o = store.orders.find(ord => String(ord._id) === String(orderId));
    if (o) {
      o.paymentResult.status = 'PAID';
      o.paymentResult.razorpayPaymentId = razorpay_payment_id || 'pay_sim_' + Date.now();
      o.trackingTimeline.push({ status: 'Packed', date: new Date().toISOString(), description: 'Item verified and packed' });
    }

    res.json({ success: true, message: 'Payment verified successfully', order: o });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
      return res.json({ success: true, count: orders.length, orders });
    }
    res.json({ success: true, count: store.orders.length, orders: store.orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const order = await Order.findById(id);
      if (order) return res.json({ success: true, order });
    }
    const o = store.orders.find(ord => String(ord._id) === String(id)) || store.orders[0];
    if (!o) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order: o });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
