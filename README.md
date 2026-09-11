# Flipkart Clone - Full-Stack MERN E-Commerce Platform

A production-ready, pixel-perfect **Flipkart Clone** architected with the **MERN Stack** (MongoDB/Mongoose, Express.js, React 18, Node.js), featuring **Redux Toolkit**, **Tailwind CSS**, **Vite**, **JWT Authentication with HttpOnly Cookies**, **Razorpay Sandbox Integration**, and a robust zero-config database engine with full Mongoose validation.

---

## 🌟 Key Features & Highlights

### 1. Iconic Flipkart Design & User Experience (Frontend)
- **Flipkart Blue Header**: Pixel-perfect Flipkart Blue (`#2874f0`) navbar with search bar, autocomplete, category exploration, Login button, "Become a Seller", "More" dropdown, and dynamic Cart badge.
- **Top Category Navigation Bar**: Categorized icons for Mobiles, Electronics, Fashion, Home & Furniture, and Appliances with active hover highlights.
- **Deals & Carousel Sections**: Auto-sliding promotional hero banner with side offer banner, "Best of Electronics", and "Trending Fashion & Wearables" horizontal scroll carousels.
- **Flipkart-Style 2-Pane Login Modal**:
  - Left pane: Signature deep blue branding panel (*"Login / Get access to your Orders, Wishlist and Recommendations"*).
  - Right pane: Mobile/Email input with OTP generation and Password toggle options.
- **Product Listing Page (PLP)**:
  - Multi-attribute filter sidebar with real-time price slider, brand multi-select, and minimum rating filters.
  - Sort tabs: Popularity, Price -- Low to High, Price -- High to Low, Newest First.
  - Product cards with discount tags, Flipkart Assured badge, and instant Add to Cart.
- **Product Details Page (PDP)**:
  - Vertical gallery thumbnail switcher with large high-resolution image preview.
  - Flipkart Assured badge, dual pricing with percentage discount tags.
  - Available bank offers & coupons list.
  - **Pincode Delivery Checker**: Real-time delivery date calculation and Cash on Delivery availability lookup.
  - Detailed technical specifications table.
  - Sticky "Add to Cart" and "Buy Now" action buttons.
- **Cart & Sticky Price Summary**:
  - Item listing with quantity increments, decrements, and removal confirmations.
  - Sticky Flipkart Price Details card breaking down Total MRP, Discount savings, Delivery Charges (FREE), and Final Payable Amount.
- **4-Step Flipkart Accordion Checkout**:
  1. Login Status & User Verification.
  2. Delivery Address (stored addresses with default selection + new address form).
  3. Order Summary & Price confirmation.
  4. Payment Options (Cash on Delivery & Razorpay Sandbox UPI / Cards / NetBanking).
- **Order Tracking Timeline**:
  - Flipkart 4-stage tracking stepper (`Ordered` &rarr; `Packed` &rarr; `Shipped` &rarr; `Delivered`) with color-coded completed and active nodes.

---

### 2. High-Performance Backend Architecture (Node.js / Express / MongoDB)
- **MVC Architecture**: Clean separation into `models/`, `controllers/`, `routes/`, and `middleware/`.
- **Database & Schemas**:
  - Mongoose models with validation: `User`, `Product`, `Order`, `Pincode`, `Cart`.
  - **Zero-Setup Database Engine**: Automatically detects local MongoDB daemon; if absent, seamlessly falls back to an internal memory database engine pre-seeded with catalog products, addresses, and serviceable pincodes. Works anywhere with zero external installation.
- **Security & Authentication**:
  - Password hashing with `bcryptjs`.
  - Stateless JWT token signing with cookie parser & authorization header support.
- **Payment Processing**:
  - Native Razorpay Orders API integration (`/api/v1/orders/razorpay-order`) and signature verification.
  - Cash on Delivery (COD) instant order processing.
- **Pincode Serviceability Engine**:
  - Real-time city, state, estimated delivery days, and COD availability lookup.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite | Lightning-fast HMR and modular component architecture |
| **State Management** | Redux Toolkit (`@reduxjs/toolkit`, `react-redux`) | Slices for `auth`, `cart`, `products` with local persistence |
| **Styling** | Tailwind CSS 3 | Pixel-perfect Flipkart design tokens, glassmorphism, responsive breakpoints |
| **Icons & UI** | Lucide React | Consistent modern iconography |
| **Backend** | Node.js (v20+ / v24+), Express.js 4 | Scalable RESTful API with structured routing & error handling |
| **Database** | MongoDB / Mongoose | Relational schemas with embedded documents & zero-config memory fallback |
| **Payments** | Razorpay SDK & Cash on Delivery | Indian payment ecosystem readiness |
| **Testing** | Node.js HTTP Test Suite | Automated end-to-end integration tests (`server/test/api.test.js`) |

---

## 📁 Project Structure

```
Assesment-Folder/
├── client/                        # React Frontend (Vite + Redux + Tailwind)
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/              # AuthModal (Flipkart 2-pane popup)
│   │   │   ├── common/            # Navbar, CategoryBar, Footer
│   │   │   ├── orders/            # OrderTrackingStepper
│   │   │   └── product/           # ProductCard, FilterSidebar, PincodeChecker
│   │   ├── pages/
│   │   │   ├── HomePage.jsx       # Hero carousel, deal sections
│   │   │   ├── ProductListingPage.jsx # PLP with filters & sort
│   │   │   ├── ProductDetailPage.jsx  # PDP with gallery, pincode & specs
│   │   │   ├── CartPage.jsx       # Cart & Price Details card
│   │   │   ├── CheckoutPage.jsx   # 4-Step accordion checkout
│   │   │   └── OrderHistoryPage.jsx # Order history & live tracking
│   │   ├── redux/
│   │   │   ├── slices/            # authSlice, cartSlice, productSlice
│   │   │   └── store.js           # Configured Redux Toolkit store
│   │   ├── services/
│   │   │   └── api.js             # Axios client with interceptors
│   │   ├── App.jsx                # Router & Modal provider
│   │   ├── main.jsx               # Entrypoint
│   │   └── index.css              # Tailwind CSS directives
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js             # Dev server & /api proxy to port 5000
│
├── server/                        # Node.js / Express REST API
│   ├── config/
│   │   └── db.js                  # MongoDB Mongoose connection with fallback
│   ├── controllers/
│   │   ├── authController.js      # OTP, password login, register, profile
│   │   ├── productController.js   # Filter, search, details
│   │   ├── orderController.js     # COD, Razorpay order, status updates
│   │   ├── pincodeController.js   # Delivery estimate & COD check
│   │   └── memoryStore.js         # Embedded zero-config data engine
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT token verification
│   ├── models/
│   │   ├── User.js                # User & address schema
│   │   ├── Product.js             # Product & specs schema
│   │   ├── Order.js               # Order & timeline schema
│   │   ├── Pincode.js             # Serviceability schema
│   │   └── Cart.js                # Cart persistence schema
│   ├── routes/
│   │   ├── authRoutes.js          # /api/v1/auth
│   │   ├── productRoutes.js       # /api/v1/products
│   │   ├── orderRoutes.js         # /api/v1/orders
│   │   └── pincodeRoutes.js       # /api/v1/pincode
│   ├── utils/
│   │   └── seeder.js              # Initial seed data
│   ├── test/
│   │   └── api.test.js            # Automated backend REST test suite
│   ├── server.js                  # Express app entrypoint
│   └── package.json
│
├── package.json                   # Root scripts to control client & server
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### 1. Installation
Install dependencies for both backend and frontend:

```bash
# In root directory:
cd server && npm install
cd ../client && npm install
cd ..
```

### 2. Running Locally

You can launch both the backend and frontend simultaneously:

```bash
# Terminal 1 - Start the Backend Server (Port 5000):
npm run server

# Terminal 2 - Start the React Frontend (Port 5173):
npm run client
```

Now navigate to:
- 🛒 **Storefront**: [http://localhost:5173/](http://localhost:5173/)
- 📡 **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- 📦 **Products Endpoint**: [http://localhost:5000/api/v1/products](http://localhost:5000/api/v1/products)

### 3. Running Automated Tests
Run the comprehensive backend integration test suite:

```bash
npm test
```
*Validates 7 critical endpoints including health, OTP authentication, catalog search/filter, pincode verification, COD order creation, and Razorpay order initialization.*

### 4. Production Build
Build the production bundle for the frontend:

```bash
npm run build:client
```
Generates an optimized, minified production distribution in `client/dist/`.

---

## 📡 API Reference (`/api/v1`)

### Authentication (`/api/v1/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/request-otp` | Generate demo OTP for mobile/email |
| `POST` | `/api/v1/auth/verify-otp` | Verify OTP and return user + JWT token |
| `POST` | `/api/v1/auth/login` | Email/phone & password login |
| `POST` | `/api/v1/auth/register` | Register new user account |
| `GET` | `/api/v1/auth/me` | Fetch authenticated user profile |
| `POST` | `/api/v1/auth/addresses` | Add new shipping address |

### Products (`/api/v1/products`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/products` | Get products (supports `?category=`, `?brand=`, `?search=`, `?sort=`, `?minPrice=`, `?maxPrice=`) |
| `GET` | `/api/v1/products/:id` | Get single product with full specifications |
| `GET` | `/api/v1/products/categories/list` | List all available product categories |

### Orders & Payments (`/api/v1/orders`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/orders` | Place Cash on Delivery order |
| `POST` | `/api/v1/orders/razorpay-order` | Create Razorpay order for online payment |
| `POST` | `/api/v1/orders/verify-payment` | Verify Razorpay payment signature & confirm order |
| `GET` | `/api/v1/orders` | Get user order history |
| `GET` | `/api/v1/orders/:id` | Get order details with live tracking timeline |

### Pincode Serviceability (`/api/v1/pincode`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/pincode/:pincode` | Check delivery estimates & COD availability |

---

## 📄 License
MIT License. Crafted with precision for full-stack e-commerce evaluation.
