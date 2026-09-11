const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Seed Products
const INITIAL_PRODUCTS = [
  { id:1, handle:"led-high-tops", name:"LED High Tops", price:80, stock:25, description:"Black high top shoes with green LED lights in the sole, tied up with laces and a buckle.", gender:"men", image:"assets/putting-on-your-shoes.jpg", sizes:["7","8","9","10","11"], colors:[{name:"Black",hex:"#1A1A1A"},{name:"Green",hex:"#22c55e"}] },
  { id:2, handle:"striped-skirt-and-top", name:"Striped Skirt and Top", price:50, stock:18, description:"Black cotton top with matching striped skirt.", gender:"women", image:"assets/striped-blouse-fashion.jpg", sizes:["XS","S","M","L"], colors:[{name:"Black",hex:"#1A1A1A"},{name:"White",hex:"#FFFFFF"}] },
  { id:3, handle:"red-sports-tee", name:"Red Sports Tee", price:50, stock:34, description:"Women's red sporty t-shirt with colorful details on the sleeves and a small white pocket.", gender:"women", image:"assets/Red Sports Tee.jpg", sizes:["XS","S","M","L"], colors:[{name:"Red",hex:"#ef4444"},{name:"White",hex:"#FFFFFF"}] },
  { id:4, handle:"blue-silk-tuxedo", name:"Blue Silk Tuxedo", price:70, stock:12, description:"Blue silk tuxedo with marbled aquatic pattern and dark lining. Sleeves are complete with rounded hem and black buttons.", gender:"men", image:"assets/Blue Silk Tuxedo.jpg", sizes:["S","M","L","XL"], colors:[{name:"Blue",hex:"#3b82f6"},{name:"Black",hex:"#1A1A1A"}] },
  { id:5, handle:"olive-green-jacket", name:"Olive Green Jacket", price:65, stock:22, description:"Loose fitting olive green jacket with buttons and large pockets. Multicoloured pattern on the front of the shoulders.", gender:"women", image:"assets/urban-fashion.jpg", sizes:["XS","S","M","L"], colors:[{name:"Olive",hex:"#6b7f3e"},{name:"Black",hex:"#1A1A1A"}] },
  { id:6, handle:"white-cotton-shirt", name:"White Cotton Shirt", price:30, stock:40, description:"Plain white cotton long sleeved shirt with loose collar. Small buttons and front pocket.", gender:"women", image:"assets/White Cotton Shirt.jpg", sizes:["XS","S","M","L"], colors:[{name:"White",hex:"#FFFFFF"},{name:"Cream",hex:"#fef3c7"}] },
  { id:7, handle:"chequered-red-shirt", name:"Chequered Red Shirt", price:50, stock:30, description:"Classic mens plaid flannel shirt with long sleeves, in chequered style, with two chest pockets.", gender:"men", image:"assets/red-plaid-shirt.jpg", sizes:["S","M","L","XL"], colors:[{name:"Red",hex:"#ef4444"},{name:"Black",hex:"#1A1A1A"}] },
  { id:8, handle:"longsleeve-cotton-top", name:"Long Sleeve Cotton Top", price:50, stock:19, description:"Black cotton womens top, with long sleeves, no collar and a thick hem.", gender:"women", image:"assets/Long Sleeve Cotton Top.jpg", sizes:["XS","S","M","L"], colors:[{name:"Black",hex:"#1A1A1A"},{name:"Grey",hex:"#6b7280"}] },
  { id:9, handle:"silk-summer-top", name:"Silk Summer Top", price:70, stock:16, description:"Silk womens top with short sleeves and number pattern.", gender:"women", image:"assets/Silk Summer Top.jpg", sizes:["XS","S","M","L"], colors:[{name:"White",hex:"#FFFFFF"},{name:"Pink",hex:"#ec4899"}] },
  { id:10, handle:"zipped-jacket", name:"Zipped Jacket", price:65, stock:28, description:"Dark navy and light blue men's zipped waterproof jacket with an outer zipped chestpocket for easy storeage.", gender:"men", image:"assets/Zipped Jacket.jpg", sizes:["S","M","L","XL"], colors:[{name:"Navy",hex:"#1e3a5f"},{name:"Blue",hex:"#3b82f6"}] },
  { id:11, handle:"black-leather-bag", name:"Black Leather Bag", price:30, stock:45, description:"Womens black leather bag, with ample space. Can be worn over the shoulder, or remove straps to carry in your hand.", gender:"women", image:"assets/Black Leather Bag.jpg", sizes:["One Size"], colors:[{name:"Black",hex:"#1A1A1A"},{name:"Brown",hex:"#92400e"}] },
  { id:12, handle:"dark-winter-jacket", name:"Soft Winter Jacket", price:50, stock:20, description:"Thick black winter jacket, with soft fleece lining. Perfect for those cold weather days.", gender:"women", image:"assets/smiling-woman-on-snowy-afternoon.jpg", sizes:["XS","S","M","L"], colors:[{name:"Black",hex:"#1A1A1A"},{name:"Grey",hex:"#6b7280"}] },
  { id:13, handle:"navy-sport-jacket", name:"Navy Sports Jacket", price:60, stock:15, description:"Long-sleeved navy waterproof jacket in thin, polyester fabric with a soft mesh inside.", gender:"men", image:"assets/Navy Sports Jacket.jpg", sizes:["S","M","L","XL"], colors:[{name:"Navy",hex:"#1e3a5f"},{name:"Black",hex:"#1A1A1A"}] },
  { id:14, handle:"dark-denim-top", name:"Dark Denim Top", price:60, stock:26, description:"Classic dark denim top with chest pockets, long sleeves with buttoned cuffs, and a ripped hem effect.", gender:"women", image:"assets/Dark Denim Top.jpg", sizes:["XS","S","M","L"], colors:[{name:"Denim",hex:"#1e40af"},{name:"Black",hex:"#1A1A1A"}] },
  { id:15, handle:"classic-leather-jacket", name:"Classic Leather Jacket", price:80, stock:14, description:"Womans zipped leather jacket. Adjustable belt for a comfortable fit, complete with shoulder pads and front zip pocket.", gender:"women", image:"assets/Classic Leather Jacket.jpg", sizes:["XS","S","M","L"], colors:[{name:"Black",hex:"#1A1A1A"},{name:"Brown",hex:"#92400e"}] },
  { id:16, handle:"striped-silk-blouse", name:"Striped Silk Blouse", price:50, stock:31, description:"Ultra-stylish black and red striped silk blouse with buckle collar and matching button pants.", gender:"women", image:"assets/striped-blouse-fashion.jpg", sizes:["XS","S","M","L"], colors:[{name:"Red",hex:"#ef4444"},{name:"Black",hex:"#1A1A1A"}] },
  { id:17, handle:"floral-white-top", name:"Floral White Top", price:75, stock:17, description:"Stylish sleeveless white top with a floral pattern.", gender:"women", image:"assets/Floral White Top.jpg", sizes:["XS","S","M","L"], colors:[{name:"White",hex:"#FFFFFF"},{name:"Black",hex:"#1A1A1A"}] },
  { id:18, handle:"yellow-wool-jumper", name:"Yellow Wool Jumper", price:80, stock:21, description:"Knitted jumper in a soft wool blend with low dropped shoulders and wide sleeves and think cuffs. Perfect for keeping warm during Fall.", gender:"women", image:"assets/Yellow Wool Jumper.jpg", sizes:["XS","S","M","L"], colors:[{name:"Yellow",hex:"#eab308"},{name:"Brown",hex:"#92400e"}] },
  { id:19, handle:"classic-varsity-top", name:"Classic Varsity Top", price:60, stock:27, description:"Womens casual varsity top, This grey and black buttoned top is a sport-inspired piece complete with an embroidered letter.", gender:"women", image:"assets/Classic Varsity Top.jpg", sizes:["XS","S","M","L"], colors:[{name:"Grey",hex:"#6b7280"},{name:"Black",hex:"#1A1A1A"}] },
  { id:20, handle:"ocean-blue-shirt", name:"Ocean Blue Shirt", price:50, stock:35, description:"Ocean blue cotton shirt with a narrow collar and buttons down the front and long sleeves. Comfortable fit and tiled kalidoscope patterns.", gender:"men", image:"assets/Ocean Blue Shirt.jpg", sizes:["S","M","L","XL"], colors:[{name:"Blue",hex:"#3b82f6"},{name:"White",hex:"#FFFFFF"}] }
];

// Initial Seed Reviews
const INITIAL_REVIEWS = [
  { id: 1, productId: 1, name: "Jessica R.", rating: 5, date: "2026-03-01", comment: "Exceptional quality and fit! The LED lights are vibrant and the battery lasts surprisingly long." },
  { id: 2, productId: 1, name: "Michael T.", rating: 5, date: "2026-03-05", comment: "Looks even sharper in person than online. Super comfortable for walking around all evening." },
  { id: 3, productId: 2, name: "Sophia L.", rating: 4, date: "2026-02-28", comment: "Really stylish wardrobe addition. The stripes are bold and fabric is super breathable." },
  { id: 4, productId: 4, name: "David K.", rating: 5, date: "2026-03-08", comment: "Wore this to a gala and got compliments all night. Fits tailored out of the box." },
  { id: 5, productId: 15, name: "Elena V.", rating: 5, date: "2026-03-09", comment: "Genuine leather aroma and buttery soft texture. Worth every single penny." }
];

// Initial Seed Orders
const INITIAL_ORDERS = [
  {
    id: "ORD-9842",
    createdAt: "2026-03-10T14:23:10.000Z",
    customer: {
      name: "Marcus Vance",
      email: "marcus.v@example.com",
      address: "742 Evergreen Terrace",
      city: "Springfield",
      postalCode: "97477"
    },
    items: [
      { id: 1, name: "LED High Tops", price: 80, quantity: 1, size: "10", color: "Black" },
      { id: 4, name: "Blue Silk Tuxedo", price: 70, quantity: 1, size: "L", color: "Blue" }
    ],
    subtotal: 150,
    discount: 30,
    promoCode: "STYLENEST20",
    total: 120,
    paymentMethod: "Credit Card (ending in 4242)",
    status: "Delivered"
  },
  {
    id: "ORD-9843",
    createdAt: "2026-03-11T09:12:44.000Z",
    customer: {
      name: "Chloe Dupont",
      email: "chloe.d@example.com",
      address: "12 Avenue Montaigne",
      city: "Paris",
      postalCode: "75008"
    },
    items: [
      { id: 15, name: "Classic Leather Jacket", price: 80, quantity: 1, size: "M", color: "Black" }
    ],
    subtotal: 80,
    discount: 10,
    promoCode: "SAVE10",
    total: 70,
    paymentMethod: "PayPal",
    status: "Shipped"
  }
];

// Helpers to read/write files safely
function readJSON(filePath, defaultValue) {
  try {
    if (!fs.existsSync(filePath)) {
      writeJSON(filePath, defaultValue);
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultValue;
  }
}

function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

// Initialize database files if missing
function initDB() {
  if (!fs.existsSync(PRODUCTS_FILE)) {
    writeJSON(PRODUCTS_FILE, INITIAL_PRODUCTS);
  }
  if (!fs.existsSync(REVIEWS_FILE)) {
    writeJSON(REVIEWS_FILE, INITIAL_REVIEWS);
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    writeJSON(ORDERS_FILE, INITIAL_ORDERS);
  }
}
initDB();

// Promo code definitions
const PROMO_CODES = {
  'STYLENEST20': { code: 'STYLENEST20', type: 'percent', val: 0.20, label: '20% OFF' },
  'SAVE10': { code: 'SAVE10', type: 'fixed', val: 10, min: 40, label: '$10 OFF' },
  'VIP50': { code: 'VIP50', type: 'percent', val: 0.50, label: '50% VIP OFF' }
};

// Database API methods
const db = {
  // Products
  getProducts({ category, search, sort } = {}) {
    let products = readJSON(PRODUCTS_FILE, INITIAL_PRODUCTS);
    const reviews = readJSON(REVIEWS_FILE, INITIAL_REVIEWS);

    // Compute live average ratings & review counts
    products = products.map(p => {
      const productReviews = reviews.filter(r => r.productId === p.id);
      const avg = productReviews.length > 0
        ? (productReviews.reduce((acc, r) => acc + Number(r.rating), 0) / productReviews.length).toFixed(1)
        : (4.6 + ((p.id * 3) % 4) * 0.1).toFixed(1);
      const count = productReviews.length > 0 ? (20 + productReviews.length) : (24 + ((p.id * 19) % 150));
      return {
        ...p,
        rating: avg,
        reviewCount: count
      };
    });

    if (category && category !== 'all') {
      products = products.filter(p => p.gender.toLowerCase() === category.toLowerCase());
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    if (sort) {
      if (sort === 'price-asc') products.sort((a, b) => a.price - b.price);
      else if (sort === 'price-desc') products.sort((a, b) => b.price - a.price);
      else if (sort === 'name-asc') products.sort((a, b) => a.name.localeCompare(b.name));
      else if (sort === 'rating') products.sort((a, b) => b.rating - a.rating);
    }

    return products;
  },

  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === Number(id)) || null;
  },

  updateProductStock(productId, delta) {
    const products = readJSON(PRODUCTS_FILE, INITIAL_PRODUCTS);
    const item = products.find(p => p.id === Number(productId));
    if (item) {
      item.stock = Math.max(0, (item.stock || 0) + delta);
      writeJSON(PRODUCTS_FILE, products);
      return item;
    }
    return null;
  },

  // Reviews
  getReviews(productId) {
    const reviews = readJSON(REVIEWS_FILE, INITIAL_REVIEWS);
    if (productId) {
      return reviews.filter(r => r.productId === Number(productId));
    }
    return reviews;
  },

  addReview({ productId, name, rating, comment }) {
    const reviews = readJSON(REVIEWS_FILE, INITIAL_REVIEWS);
    const newReview = {
      id: reviews.length ? Math.max(...reviews.map(r => r.id)) + 1 : 1,
      productId: Number(productId),
      name: name.trim() || 'Anonymous Shopper',
      rating: Math.min(5, Math.max(1, Number(rating) || 5)),
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0]
    };
    reviews.unshift(newReview);
    writeJSON(REVIEWS_FILE, reviews);
    return newReview;
  },

  // Promo Engine
  validatePromo(code, subtotal = 0) {
    if (!code) return { valid: false, message: 'Promo code is required.' };
    const clean = code.trim().toUpperCase();
    const promo = PROMO_CODES[clean];
    if (!promo) {
      return { valid: false, message: `Promo code "${clean}" is invalid. Try STYLENEST20 for 20% off!` };
    }

    if (promo.min && subtotal < promo.min) {
      return { 
        valid: false, 
        message: `Code ${promo.code} requires a minimum purchase of $${promo.min.toFixed(2)}.` 
      };
    }

    let discount = 0;
    if (promo.type === 'percent') {
      discount = Math.round(subtotal * promo.val * 100) / 100;
    } else if (promo.type === 'fixed') {
      discount = Math.min(subtotal, promo.val);
    }

    return {
      valid: true,
      code: promo.code,
      label: promo.label,
      discount: discount,
      newTotal: Math.max(0, subtotal - discount)
    };
  },

  // Orders
  createOrder({ customer, items, promoCode, paymentMethod }) {
    if (!items || !items.length) {
      throw new Error('Cart cannot be empty when creating an order.');
    }
    if (!customer || !customer.name || !customer.email || !customer.address) {
      throw new Error('Customer name, email, and shipping address are required.');
    }

    const products = readJSON(PRODUCTS_FILE, INITIAL_PRODUCTS);
    let subtotal = 0;

    const validatedItems = items.map(item => {
      const prod = products.find(p => p.id === Number(item.id));
      const price = prod ? prod.price : (Number(item.price) || 0);
      const qty = Math.max(1, Number(item.quantity) || 1);
      subtotal += price * qty;

      // Reduce product stock in database
      if (prod) {
        prod.stock = Math.max(0, (prod.stock || 20) - qty);
      }

      return {
        id: item.id,
        name: prod ? prod.name : (item.name || 'StyleNest Item'),
        price: price,
        quantity: qty,
        size: item.size || 'M',
        color: item.color || 'Default',
        image: prod ? prod.image : (item.image || '')
      };
    });

    writeJSON(PRODUCTS_FILE, products);

    let discount = 0;
    if (promoCode) {
      const promoResult = this.validatePromo(promoCode, subtotal);
      if (promoResult.valid) {
        discount = promoResult.discount;
      }
    }

    const total = Math.max(0, subtotal - discount);
    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);

    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim(),
        address: customer.address.trim(),
        city: customer.city ? customer.city.trim() : 'Metropolis',
        postalCode: customer.postalCode ? customer.postalCode.trim() : '10001'
      },
      items: validatedItems,
      subtotal: Math.round(subtotal * 100) / 100,
      discount: Math.round(discount * 100) / 100,
      promoCode: promoCode ? promoCode.toUpperCase() : null,
      total: Math.round(total * 100) / 100,
      paymentMethod: paymentMethod || 'Credit Card',
      status: 'Processing'
    };

    const orders = readJSON(ORDERS_FILE, INITIAL_ORDERS);
    orders.unshift(newOrder);
    writeJSON(ORDERS_FILE, orders);

    return newOrder;
  },

  getOrders() {
    return readJSON(ORDERS_FILE, INITIAL_ORDERS);
  },

  getOrderById(id) {
    const orders = this.getOrders();
    return orders.find(o => o.id === id) || null;
  },

  updateOrderStatus(id, status) {
    const orders = readJSON(ORDERS_FILE, INITIAL_ORDERS);
    const order = orders.find(o => o.id === id);
    if (!order) return null;
    order.status = status;
    writeJSON(ORDERS_FILE, orders);
    return order;
  },

  // Admin Dashboard Statistics
  getAdminStats() {
    const orders = readJSON(ORDERS_FILE, INITIAL_ORDERS);
    const products = readJSON(PRODUCTS_FILE, INITIAL_PRODUCTS);
    const reviews = readJSON(REVIEWS_FILE, INITIAL_REVIEWS);

    const totalRevenue = orders.reduce((acc, o) => acc + (Number(o.total) || 0), 0);
    const avgRating = reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + Number(r.rating), 0) / reviews.length).toFixed(1)
      : '4.8';
    const lowStockCount = products.filter(p => (p.stock || 0) < 15).length;

    return {
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalOrders: orders.length,
      totalProducts: products.length,
      totalReviews: reviews.length,
      averageRating: avgRating,
      lowStockProducts: lowStockCount
    };
  }
};

module.exports = db;
