# StyleNest - E-Commerce Storefront & Shopify Online Store 2.0 Theme

This project is developed as part of an assessment task. It involves creating a responsive, interactive static e-commerce website (**StyleNest**) using HTML5, CSS3, and Vanilla JavaScript, and converting it into a full **Shopify Online Store 2.0** compatible theme structure.

---

## 🚀 Key Highlights

- **Dual-Mode Project**:
  1. **Standalone Web Storefront** (`Website.html`, `Website.css`, `Website.js`): Pure vanilla web application with zero external framework dependencies.
  2. **Shopify Online Store 2.0 Theme**: Modular Liquid architecture with sections, blocks, JSON templates, and theme editor settings schema based on Shopify's modern theme standards.
- **Dark Mode Design System**: Premium `#0f172a` slate aesthetics with glassmorphic sticky navigation, vibrant accents, and smooth micro-animations.
- **Product Catalog & Live Filtering**: Real-time category filtering (Men, Women, All) and live text search across 20 curated fashion essentials.
- **Interactive Quick View Modal**: Dynamic product view with size selector, color swatches, quantity incrementer, and add-to-cart validation.
- **Slide-Over Shopping Cart**: Side drawer with item badges, quantity increment/decrement, item removal, live subtotal computation, and **localStorage persistence**.
- **Multi-Step Checkout Simulation**: Form validation across Shipping Address, Payment Methods (UPI, Credit/Debit Card, Net Banking, COD), and Order Confirmation with unique Order IDs.
- **Shopify Liquid Sections**:
  - `sections/stylenest-hero.liquid`: Customizable hero banner with merchant schema controls.
  - `sections/stylenest-catalog.liquid`: Dynamic product grid looping over Shopify collections with category filters and fallback catalog support.
  - `assets/stylenest.css`: Reusable dark-mode styling loaded directly through `snippets/stylesheets.liquid`.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design Tokens, Flexbox, CSS Grid), Vanilla JavaScript (ES6+)
- **Icons**: FontAwesome 6.5.1
- **E-Commerce Platform**: Shopify Online Store 2.0
- **Templating Engine**: Shopify Liquid
- **Theme Configuration**: Shopify Theme Settings Schema (`config/settings_schema.json`, `templates/*.json`)

---

## 📁 Repository Structure

```
Assesment-Folder/
├── .shopifyignore                 # Ignores non-theme prototype files during theme sync
├── README.md                      # Project documentation
├── Website.html                   # Standalone StyleNest storefront prototype
├── Website.css                    # Standalone prototype styling
├── Website.js                     # Standalone client-side data, filtering, cart & checkout logic
│
├── assets/                        # Shopify theme assets (images, stylesheets, JS runtime)
│   ├── stylenest.css              # Custom StyleNest theme stylesheet
│   ├── base.css                   # Core Shopify theme CSS
│   └── *.jpg                      # 20 high-res product images
│
├── layout/                        # Theme layout shells
│   ├── theme.liquid               # Master HTML document & asset injector
│   └── password.liquid            # Password protection layout
│
├── sections/                      # Modular Shopify sections
│   ├── stylenest-hero.liquid      # Custom StyleNest hero section with schema
│   ├── stylenest-catalog.liquid   # Custom StyleNest product grid & filters
│   └── ...                        # Additional theme sections (slideshow, marquee, etc.)
│
├── blocks/                        # Reusable theme blocks
├── snippets/                      # Shared Liquid snippets
│   └── stylesheets.liquid         # Stylesheet loader registering stylenest.css
│
├── templates/                     # Shopify JSON templates
│   └── index.json                 # Home page structure mounting StyleNest sections
│
├── config/                        # Theme settings schema (settings_schema.json)
└── locales/                       # Multi-language translation dictionaries
```

---

## 💻 How to Run & Preview

### 1. Previewing the Standalone Prototype
Simply open `Website.html` directly in any modern web browser, or serve it locally using any static file server:

```powershell
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```
Then visit `http://localhost:8000/Website.html` (or `http://localhost:3000/Website.html`).

### 2. Testing / Deploying the Shopify Theme
Make sure you have the [Shopify CLI](https://shopify.dev/docs/themes/tools/cli) installed:

```bash
# Check theme structure for any syntax or guideline issues
shopify theme check

# Preview theme on a Shopify development store
shopify theme dev --store your-store.myshopify.com

# Push theme to your store
shopify theme push
```

---

## 🛡️ Enhancements & Bug Fixes Applied

1. **Asset Directory Standardization**: Renamed misspelled folder `Assests/` &rarr; `assets/`, resolving Shopify asset pipeline loading failures.
2. **Shopify Integration**: Implemented `sections/stylenest-hero.liquid` and `sections/stylenest-catalog.liquid`, integrated `stylenest.css`, and mounted them into `templates/index.json`.
3. **Shopify CLI Validation**: Added `.shopifyignore` to cleanly isolate prototype files (`Website.*`) from theme uploads.
4. **FontAwesome CDN Added**: Fixed missing stylesheet link in `Website.html`, restoring footer social icons (Instagram, X, Facebook).
5. **Product Image & Case Corrections**: 
   - Replaced mismatched image for LED High Tops (`putting-on-your-shoes.jpg`).
   - Corrected image reference for Classic Varsity Top (`Classic Varsity Top.jpg`).
   - Fixed Linux case-sensitivity bug on Classic Leather Jacket (`Classic Leather Jacket.jpg`).
6. **Cart State Persistence**: Integrated `localStorage` synchronization so user carts persist across page refreshes.
7. **Checkout Validation**: Added validation checks for UPI IDs and Card details (Number, Expiry, CVV) before confirming orders.
8. **Modern JavaScript Cleanups**: Replaced deprecated `substr()` with `substring()`.
