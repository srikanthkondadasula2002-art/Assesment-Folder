const mongoose = require('mongoose');
const Product = require('../models/Product');
const store = require('./memoryStore');

exports.getProducts = async (req, res) => {
  try {
    const { category, brand, minRating, sort, search, page = 1, limit = 16 } = req.query;

    if (mongoose.connection.readyState === 1) {
      let queryObj = {};
      if (category && category !== 'all') queryObj.category = new RegExp(`^${category}$`, 'i');
      if (brand) queryObj.brand = { $in: brand.split(',').map(b => new RegExp(`^${b.trim()}$`, 'i')) };
      if (minRating) queryObj.avgRating = { $gte: Number(minRating) };
      if (req.query.price) {
        queryObj.price = {};
        if (req.query.price.gte) queryObj.price.$gte = Number(req.query.price.gte);
        if (req.query.price.lte) queryObj.price.$lte = Number(req.query.price.lte);
      }
      if (search) queryObj.$text = { $search: search };

      let sortOption = { createdAt: -1 };
      if (sort === 'price_asc') sortOption = { price: 1 };
      else if (sort === 'price_desc') sortOption = { price: -1 };
      else if (sort === 'rating_desc') sortOption = { avgRating: -1 };
      else if (sort === 'discount_desc') sortOption = { discountPercent: -1 };

      const skip = (Number(page) - 1) * Number(limit);
      const [products, total] = await Promise.all([
        Product.find(queryObj).sort(sortOption).skip(skip).limit(Number(limit)),
        Product.countDocuments(queryObj)
      ]);

      return res.json({
        success: true,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit) || 1,
        products
      });
    }

    // Resilient In-Memory Filter Engine
    let list = [...store.products];

    if (category && category !== 'all') {
      list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (brand) {
      const brands = brand.split(',').map(b => b.trim().toLowerCase());
      list = list.filter(p => brands.includes(p.brand.toLowerCase()));
    }

    if (minRating) {
      list = list.filter(p => (p.avgRating || 0) >= Number(minRating));
    }

    if (req.query.price) {
      if (req.query.price.gte) list = list.filter(p => p.price >= Number(req.query.price.gte));
      if (req.query.price.lte) list = list.filter(p => p.price <= Number(req.query.price.lte));
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }

    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating_desc') list.sort((a, b) => b.avgRating - a.avgRating);
    else if (sort === 'discount_desc') list.sort((a, b) => b.discountPercent - a.discountPercent);

    const total = list.length;
    const start = (Number(page) - 1) * Number(limit);
    const paginated = list.slice(start, start + Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit) || 1,
      products: paginated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const product = await Product.findById(id);
      if (product) return res.json({ success: true, product });
    }

    const memoryProd = store.products.find(p => String(p._id) === String(id)) || store.products[0];
    if (!memoryProd) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product: memoryProd });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, reviewTitle, reviewText, userName } = req.body;

    const newReview = {
      _id: 'rev_' + Date.now(),
      userName: userName || req.user?.name || 'Flipkart Shopper',
      rating: Number(rating) || 5,
      reviewTitle: reviewTitle || 'Verified Purchase',
      reviewText: reviewText || 'Great product!',
      isVerifiedPurchase: true,
      createdAt: new Date().toISOString()
    };

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const prod = await Product.findById(id);
      if (prod) {
        prod.ratings.unshift(newReview);
        await prod.save();
        return res.status(201).json({ success: true, review: newReview });
      }
    }

    const p = store.products.find(prod => String(prod._id) === String(id));
    if (p) {
      if (!p.ratings) p.ratings = [];
      p.ratings.unshift(newReview);
      p.numReviews = (p.numReviews || 0) + 1;
    }
    res.status(201).json({ success: true, review: newReview });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
