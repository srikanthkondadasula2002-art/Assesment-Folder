const mongoose = require('mongoose');
const Product = require('../models/Product');
const Pincode = require('../models/Pincode');
const User = require('../models/User');

const SEED_PRODUCTS = [
  {
    _id: new mongoose.Types.ObjectId('65f1a1000000000000000001'),
    title: 'Apple iPhone 15 (Blue, 128 GB)',
    brand: 'Apple',
    category: 'mobiles',
    subCategory: 'smartphones',
    images: [
      { url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop' }
    ],
    price: 71999,
    mrp: 79900,
    discountPercent: 9,
    stockQuantity: 45,
    isAssured: true,
    highlights: [
      '128 GB ROM',
      '15.49 cm (6.1 inch) Super Retina XDR Display',
      '48MP + 12MP Dual Rear Camera | 12MP Front Camera',
      'A16 Bionic Chip, 6 Core Processor',
      'Dynamic Island Innovation'
    ],
    specifications: {
      'General': {
        'In The Box': 'Handset, USB-C Charge Cable (1m), Documentation',
        'Model Number': 'MTP43HN/A',
        'Model Name': 'iPhone 15',
        'Color': 'Blue',
        'SIM Type': 'Dual SIM (Nano + eSIM)'
      },
      'Display Features': {
        'Display Size': '15.49 cm (6.1 inch)',
        'Resolution': '2556 x 1179 Pixels',
        'Resolution Type': 'Super Retina XDR Display',
        'Other Display Features': 'HDR Display, True Tone, Wide Color (P3)'
      },
      'Battery & Power': {
        'Battery Type': 'Lithium-Ion',
        'Quick Charging': 'Yes'
      }
    },
    avgRating: 4.6,
    numReviews: 4820,
    ratings: [
      {
        userName: 'Aditya Verma',
        rating: 5,
        reviewTitle: 'Must Buy! Pure Innovation',
        reviewText: 'Upgraded from iPhone 11 and the difference is night and day. The Dynamic Island and camera clarity are stellar.',
        isVerifiedPurchase: true
      },
      {
        userName: 'Rohan Sharma',
        rating: 4,
        reviewTitle: 'Value for Money',
        reviewText: 'USB-C makes traveling much easier. Battery easily lasts 1.5 days under moderate usage.',
        isVerifiedPurchase: true
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('65f1a1000000000000000002'),
    title: 'Samsung Galaxy S24 5G (Onyx Black, 256 GB)',
    brand: 'Samsung',
    category: 'mobiles',
    subCategory: 'smartphones',
    images: [
      { url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop' }
    ],
    price: 79999,
    mrp: 89999,
    discountPercent: 11,
    stockQuantity: 30,
    isAssured: true,
    highlights: [
      '8 GB RAM | 256 GB ROM',
      '15.75 cm (6.2 inch) Dynamic AMOLED 2X Display',
      '50MP + 12MP + 10MP Triple Camera | 12MP Front Camera',
      'Galaxy AI Built-in with Circle to Search',
      'Exynos 2400 Processor'
    ],
    specifications: {
      'General': {
        'Model Name': 'Galaxy S24 5G',
        'Color': 'Onyx Black',
        'SIM Type': 'Dual SIM'
      },
      'Camera': {
        'Primary Camera': '50MP + 12MP + 10MP',
        'Optical Zoom': '3x'
      }
    },
    avgRating: 4.5,
    numReviews: 2150,
    ratings: [
      {
        userName: 'Kunal Patil',
        rating: 5,
        reviewTitle: 'Mindblowing camera!',
        reviewText: 'Galaxy AI is not just a gimmick; live translation and photo editing are game changers.',
        isVerifiedPurchase: true
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('65f1a1000000000000000003'),
    title: 'OnePlus 12 (Silky Black, 256 GB)',
    brand: 'OnePlus',
    category: 'mobiles',
    subCategory: 'smartphones',
    images: [
      { url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop' }
    ],
    price: 64999,
    mrp: 69999,
    discountPercent: 7,
    stockQuantity: 28,
    isAssured: true,
    highlights: [
      '12 GB RAM | 256 GB ROM',
      '17.32 cm (6.82 inch) 2K 120 Hz ProXDR Display',
      '50MP + 64MP + 48MP Hasselblad Camera',
      'Snapdragon 8 Gen 3 Flagship Chipset',
      '5400 mAh Battery with 100W SUPERVOOC Charging'
    ],
    specifications: {
      'General': {
        'Model Name': 'OnePlus 12',
        'Color': 'Silky Black'
      }
    },
    avgRating: 4.7,
    numReviews: 1890,
    ratings: [
      {
        userName: 'Vikram Mehta',
        rating: 5,
        reviewTitle: 'Best flagship under 65k!',
        reviewText: 'Charges in 25 minutes! Display is the brightest I have ever seen.',
        isVerifiedPurchase: true
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('65f1a1000000000000000004'),
    title: 'Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones',
    brand: 'Sony',
    category: 'electronics',
    subCategory: 'audio',
    images: [
      { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop' }
    ],
    price: 26990,
    mrp: 34990,
    discountPercent: 22,
    stockQuantity: 15,
    isAssured: true,
    highlights: [
      'Industry Leading Active Noise Cancellation with 8 Mics',
      'Up to 30 Hours Battery Life with Quick Charging (3 min = 3 hrs)',
      'Magnificent Sound Engineered with High-Resolution Audio',
      'Crystal Clear Hands-Free Calling with 4 Beamforming Microphones',
      'Ultra-Comfortable Lightweight Design with Soft Fit Leather'
    ],
    specifications: {
      'General': {
        'Headphone Type': 'Over the Ear',
        'Connectivity': 'Bluetooth 5.2'
      }
    },
    avgRating: 4.8,
    numReviews: 3100,
    ratings: [
      {
        userName: 'Sneha Roy',
        rating: 5,
        reviewTitle: 'Silence in chaotic flights!',
        reviewText: 'ANC is unmatched. Comfort is so good I forget I am wearing them.',
        isVerifiedPurchase: true
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('65f1a1000000000000000005'),
    title: 'Apple MacBook Pro M3 (14-inch, Space Grey, 512 GB SSD)',
    brand: 'Apple',
    category: 'electronics',
    subCategory: 'laptops',
    images: [
      { url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop' }
    ],
    price: 159900,
    mrp: 169900,
    discountPercent: 5,
    stockQuantity: 10,
    isAssured: true,
    highlights: [
      'Apple M3 Chip with 8-Core CPU and 10-Core GPU',
      '8 GB Unified Memory | 512 GB Superfast SSD',
      '35.97 cm (14.2 inch) Liquid Retina XDR Display with 1000 nits',
      'Up to 22 Hours Battery Life',
      'Backlit Magic Keyboard with Touch ID'
    ],
    specifications: {
      'General': {
        'Model Name': 'MacBook Pro',
        'Operating System': 'macOS Sonoma'
      }
    },
    avgRating: 4.9,
    numReviews: 640,
    ratings: [
      {
        userName: 'Priya Iyer',
        rating: 5,
        reviewTitle: 'Powerhouse for creatives',
        reviewText: 'Renders 4K video seamlessly without breaking a sweat or turning on fans.',
        isVerifiedPurchase: true
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('65f1a1000000000000000006'),
    title: 'Nike Air Max SC Men Running Shoes',
    brand: 'Nike',
    category: 'fashion',
    subCategory: 'footwear',
    images: [
      { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop' }
    ],
    price: 4495,
    mrp: 5995,
    discountPercent: 25,
    stockQuantity: 50,
    isAssured: true,
    highlights: [
      'Visible Air Cushioning in Sole',
      'Leather, Textile and Mesh Blend for Durable Breathability',
      'Rubber Outsole with Waffle Traction Pattern',
      'Flex Grooves Let Foot Move Naturally'
    ],
    specifications: {
      'General': {
        'Ideal For': 'Men',
        'Occasion': 'Sports / Casual'
      }
    },
    avgRating: 4.4,
    numReviews: 9200,
    ratings: [
      {
        userName: 'Aman Deep',
        rating: 5,
        reviewTitle: 'Classic style with top comfort',
        reviewText: 'True to size and very comfortable for daily runs.',
        isVerifiedPurchase: true
      }
    ]
  }
];

const SEED_PINCODES = [
  { pincode: '560001', city: 'Bengaluru', state: 'Karnataka', isServiceable: true, codAvailable: true, estimatedDeliveryDays: 1, deliveryCharge: 0 },
  { pincode: '110001', city: 'New Delhi', state: 'Delhi', isServiceable: true, codAvailable: true, estimatedDeliveryDays: 2, deliveryCharge: 0 },
  { pincode: '400001', city: 'Mumbai', state: 'Maharashtra', isServiceable: true, codAvailable: true, estimatedDeliveryDays: 2, deliveryCharge: 0 },
  { pincode: '600001', city: 'Chennai', state: 'Tamil Nadu', isServiceable: true, codAvailable: true, estimatedDeliveryDays: 2, deliveryCharge: 0 },
  { pincode: '500001', city: 'Hyderabad', state: 'Telangana', isServiceable: true, codAvailable: true, estimatedDeliveryDays: 2, deliveryCharge: 0 },
  { pincode: '700001', city: 'Kolkata', state: 'West Bengal', isServiceable: true, codAvailable: true, estimatedDeliveryDays: 3, deliveryCharge: 40 }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/flipkart_db';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
    }
    await Product.deleteMany({});
    await Pincode.deleteMany({});
    await Product.insertMany(SEED_PRODUCTS);
    await Pincode.insertMany(SEED_PINCODES);
    console.log('✅ Flipkart Database Seeded Successfully with Flagship Catalog!');
  } catch (err) {
    console.warn('Seeder skipped or using in-memory store:', err.message);
  }
};

if (require.main === module) {
  seedDatabase().then(() => process.exit());
}

module.exports = { SEED_PRODUCTS, SEED_PINCODES, seedDatabase };
