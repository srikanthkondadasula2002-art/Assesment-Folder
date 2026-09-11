# StyleNest - Full-Stack Luxury Fashion E-Commerce Platform & Shopify OS 2.0 Theme

StyleNest is a production-ready, full-stack luxury fashion e-commerce platform built with a high-performance **Node.js / Express.js REST API**, zero-setup persistent database layer, rich glassmorphic storefront, interactive store administrator portal, and full compatibility with **Shopify Online Store 2.0**.

---

## 🌟 Key Features & Capabilities

### 1. Full-Stack REST API & Persistent Database
- **Zero-Setup Database Layer**: Embedded data engine in `data/` managing products, stock balances, verified customer reviews, promo discount vouchers, and order records out of the box with zero external database configuration.
- **RESTful Endpoints**: Full CRUD operations for product filtering, searching, server-side voucher validation, authenticated order processing, and telemetry metrics.
- **Order Tracking & Fulfillment**: Automated order generation (`ORD-XXXX`), stock depletion, delivery status progression (`Processing`, `Shipped`, `Delivered`, `Cancelled`), and receipt generation.

### 2. Store Administrator & Analytics Portal (`/admin`)
- Accessible at `http://localhost:5000/admin`.
- **Live KPI Dashboard**: Instant telemetry on gross revenue, orders processed, catalog stock status, and customer sentiment scores.
- **Orders Management**: Live order fulfillment table with real-time status update selectors (`Processing` &rarr; `Shipped` &rarr; `Delivered`).
- **Inventory Control**: Live stock manager with instant stock balance adjustment and low-stock warning alerts.
- **Reviews Moderation**: Real-time customer review log with star ratings and feedback inspection.

### 3. Flagship Customer Storefront (`/`)
- **Theme Switcher**: Smooth Dark Slate (`#0b0f19`) and Luxury Light mode toggle with persistent preferences.
- **Dynamic Catalog & Filtering**: 20 luxury fashion products across Men and Women categories with real-time text search.
- **Slide-Over Wishlist**: Dedicated side drawer with item counts and quick-add actions.
- **Server-Verified Promo Engine**: Apply codes like `STYLENEST20` (20% off), `SAVE10` ($10 off), and `VIP50` (50% off) with live price recalculation.
- **Multi-Step Checkout**: Complete shipping address verification, payment method selection (UPI, Credit/Debit Card, Net Banking, COD), and immediate order generation.
- **Customer Order Tracking**: "My Orders" modal to track past purchases and shipment statuses in real time.
- **Verified Customer Reviews**: 5-star interactive rating form submitting directly to the backend database.

### 4. Shopify Online Store 2.0 Architecture
- Retains complete compatibility with Shopify Online Store 2.0 guidelines.
- Custom Liquid sections (`sections/stylenest-hero.liquid`, `sections/stylenest-catalog.liquid`).
- Clean separation with `.shopifyignore` to exclude backend files during theme synchronization.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Backend** | Node.js (v20+ / v24+), Express.js 4, CORS, Dotenv |
| **Database** | Persistent JSON / File-backed data store (`data/`) |
| **Frontend** | HTML5, Vanilla CSS3 (CSS Variables, Flexbox, Grid), JavaScript ES6+ |
| **Icons & Fonts** | FontAwesome 6.5.1, Plus Jakarta Sans, Playfair Display |
| **Shopify Engine** | Shopify Liquid, JSON Templates (`templates/index.json`), Theme Schema |
| **Testing** | Node.js Native HTTP Test Suite (`test/api.test.js`) |

---

## 📁 Repository Structure

```
Assesment-Folder/
├── backend/
│   ├── db.js                      # Persistent data store controller (products, orders, reviews)
│   └── routes/
│       └── api.js                 # REST API endpoints
├── data/                          # Auto-seeded persistent data files
│   ├── products.json              # 20 catalog products with stock & pricing
│   ├── orders.json                # Live customer orders & fulfillment history
│   └── reviews.json               # Customer reviews and star ratings
├── test/
│   └── api.test.js                # Automated end-to-end API test suite
├── server.js                      # Express application entry point
├── package.json                   # Dependencies & npm scripts
├── admin.html                     # Store Administrator & Analytics Portal
├── Website.html                   # Luxury Storefront Web Application
├── Website.css                    # Storefront styling & design tokens
├── Website.js                     # Storefront reactive UI & API connector
├── assets/                        # Theme assets & 20 high-res fashion images
├── layout/                        # Shopify theme layout files
├── sections/                      # Shopify Online Store 2.0 sections
├── snippets/                      # Liquid snippets
├── templates/                     # Shopify JSON templates
├── .shopifyignore                 # Ignores backend files during Shopify CLI sync
├── .gitignore                     # Ignores node_modules, logs, and env files
└── README.md                      # Comprehensive documentation
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Full-Stack Server
```bash
npm start
```
*Development mode with file watching:*
```bash
npm run dev
```

Once running, open your browser:
- 🛍️ **Storefront:** [http://localhost:5000/](http://localhost:5000/)
- 📊 **Admin Dashboard:** [http://localhost:5000/admin](http://localhost:5000/admin)
- 🩺 **API Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 3. Run Automated Tests
```bash
npm test
```
Executes the automated integration test suite validating all 11 REST API endpoints.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service uptime and status check |
| `GET` | `/api/products` | Get products (supports `?category=`, `?search=`, `?sort=`) |
| `GET` | `/api/products/:id` | Get single product with verified reviews |
| `GET` | `/api/reviews/:productId` | Get reviews for a specific product |
| `POST` | `/api/reviews` | Submit a customer review with star rating |
| `POST` | `/api/promos/validate` | Validate promo voucher code & compute discount |
| `POST` | `/api/orders` | Place new order, decrement stock, and generate order receipt |
| `GET` | `/api/orders` | Get order list for tracking & history |
| `GET` | `/api/orders/:id` | Get details of a single order |
| `PATCH`| `/api/orders/:id/status` | Update fulfillment state (`Processing`, `Shipped`, `Delivered`) |
| `GET` | `/api/admin/stats` | Aggregate dashboard KPIs (Revenue, Orders, Low Stock) |

---

## 🏷️ Built-in Promo Vouchers

Test the coupon engine at checkout or in the cart drawer:
- **`STYLENEST20`** &rarr; 20% OFF entire cart
- **`SAVE10`** &rarr; $10.00 OFF (minimum purchase $40.00)
- **`VIP50`** &rarr; 50% VIP exclusive discount

---

## 🛍️ Shopify Online Store 2.0 Integration

To test on a Shopify development store:
```bash
# Check theme structure
shopify theme check

# Launch local Shopify theme development server
shopify theme dev --store your-store.myshopify.com

# Push theme to store
shopify theme push
```

---

## 📄 License
MIT License. Developed for fashion e-commerce assessment.
