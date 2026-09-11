const mongoose = require('mongoose');

const ratingSubSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewTitle: { type: String, trim: true },
  reviewText: { type: String, required: true, trim: true },
  images: [{ type: String }],
  isVerifiedPurchase: { type: Boolean, default: true }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is mandatory'],
    trim: true,
    index: 'text'
  },
  brand: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  subCategory: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  images: [{
    public_id: { type: String },
    url: { type: String, required: true }
  }],
  price: {
    type: Number,
    required: true,
    min: 0,
    index: true
  },
  mrp: {
    type: Number,
    required: true,
    min: 0
  },
  discountPercent: {
    type: Number,
    min: 0,
    max: 95,
    default: 0
  },
  stockQuantity: {
    type: Number,
    required: true,
    default: 20
  },
  isAssured: {
    type: Boolean,
    default: true
  },
  highlights: [{ type: String }],
  specifications: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  ratings: [ratingSubSchema],
  avgRating: {
    type: Number,
    default: 4.2,
    min: 0,
    max: 5,
    index: true
  },
  numReviews: {
    type: Number,
    default: 120
  }
}, { timestamps: true });

// Calculate discount percentage before saving
productSchema.pre('save', function (next) {
  if (this.mrp && this.price) {
    this.discountPercent = Math.max(0, Math.round(((this.mrp - this.price) / this.mrp) * 100));
  }
  if (this.ratings && this.ratings.length > 0) {
    const sum = this.ratings.reduce((acc, r) => acc + r.rating, 0);
    this.avgRating = Number((sum / this.ratings.length).toFixed(1));
    this.numReviews = this.ratings.length;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
