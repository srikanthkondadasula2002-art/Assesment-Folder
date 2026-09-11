const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  selectedAttributes: { type: Map, of: String }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  orderItems: [orderItemSchema],
  shippingAddress: {
    name: String,
    phone: String,
    pincode: String,
    locality: String,
    addressLine: String,
    city: String,
    state: String,
    addressType: String
  },
  paymentMethod: {
    type: String,
    enum: ['RAZORPAY', 'COD'],
    required: true
  },
  paymentResult: {
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    status: { type: String, default: 'PENDING' }
  },
  itemTotal: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  deliveryFee: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: ['Ordered', 'Packed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Ordered'
  },
  trackingTimeline: [
    {
      status: { type: String, required: true },
      date: { type: Date, default: Date.now },
      description: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
