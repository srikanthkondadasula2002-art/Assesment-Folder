const mongoose = require('mongoose');

const pincodeSchema = new mongoose.Schema({
  pincode: { type: String, required: true, unique: true, index: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  isServiceable: { type: Boolean, default: true },
  codAvailable: { type: Boolean, default: true },
  estimatedDeliveryDays: { type: Number, default: 3 },
  deliveryCharge: { type: Number, default: 0 }
});

module.exports = mongoose.model('Pincode', pincodeSchema);
