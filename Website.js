// ==========================================
// STYLENEST - Full Flagship E-Commerce Engine
// ==========================================

const products = [
  { id:1, handle:"led-high-tops", name:"LED High Tops", price:80, description:"Black high top shoes with green LED lights in the sole, tied up with laces and a buckle.", gender:"men", image:"assets/putting-on-your-shoes.jpg", sizes:["7","8","9","10","11"], colors:[{name:"Black",hex:"#1A1A1A"},{name:"Green",hex:"#22c55e"}] },
  { id:2, handle:"striped-skirt-and-top", name:"Striped Skirt and Top", price:50, description:"Black cotton top with matching striped skirt.", gender:"women", image:"assets/striped-blouse-fashion.jpg", sizes:["XS","S","M","L"], colors:[{name:"Black",hex:"#1A1A1A"},{name:"White",hex:"#FFFFFF"}] },
  { id:3, handle:"red-sports-tee", name:"Red Sports Tee", price:50, description:"Women's red sporty t-shirt with colorful details on the sleeves and a small white pocket.", gender:"women", image:"assets/Red Sports Tee.jpg", sizes:["XS","S","M","L"], colors:[{name:"Red",hex:"#ef4444"},{name:"White",hex:"#FFFFFF"}] },
  { id:4, handle:"blue-silk-tuxedo", name:"Blue Silk Tuxedo", price:70, description:"Blue silk tuxedo with marbled aquatic pattern and dark lining. Sleeves are complete with rounded hem and black buttons.", gender:"men", image:"assets/Blue Silk Tuxedo.jpg", sizes:["S","M","L","XL"], colors:[{name:"Blue",hex:"#3b82f6"},{name:"Black",hex:"#1A1A1A"}] },
  { id:5, handle:"olive-green-jacket", name:"Olive Green Jacket", price:65, description:"Loose fitting olive green jacket with buttons and large pockets. Multicoloured pattern on the front of the shoulders.", gender:"women", image:"assets/urban-fashion.jpg", sizes:["XS","S","M","L"], colors:[{name:"Olive",hex:"#6b7f3e"},{name:"Black",hex:"#1A1A1A"}] },
  { id:6, handle:"white-cotton-shirt", name:"White Cotton Shirt", price:30, description:"Plain white cotton long sleeved shirt with loose collar. Small buttons and front pocket.", gender:"women", image:"assets/White Cotton Shirt.jpg", sizes:["XS","S","M","L"], colors:[{name:"White",hex:"#FFFFFF"},{name:"Cream",hex:"#fef3c7"}] },
  { id:7, handle:"chequered-red-shirt", name:"Chequered Red Shirt", price:50, description:"Classic mens plaid flannel shirt with long sleeves, in chequered style, with two chest pockets.", gender:"men", image:"assets/red-plaid-shirt.jpg", sizes:["S","M","L","XL"], colors:[{name:"Red",hex:"#ef4444"},{name:"Black",hex:"#1A1A1A"}] },
  { id:8, handle:"longsleeve-cotton-top", name:"Long Sleeve Cotton Top", price:50, description:"Black cotton womens top, with long sleeves, no collar and a thick hem.", gender:"women", image:"assets/Long Sleeve Cotton Top.jpg", sizes:["XS","S","M","L"], colors:[{name:"Black",hex:"#1A1A1A"},{name:"Grey",hex:"#6b7280"}] },
  { id:9, handle:"silk-summer-top", name:"Silk Summer Top", price:70, description:"Silk womens top with short sleeves and number pattern.", gender:"women", image:"assets/Silk Summer Top.jpg", sizes:["XS","S","M","L"], colors:[{name:"White",hex:"#FFFFFF"},{name:"Pink",hex:"#ec4899"}] },
  { id:10, handle:"zipped-jacket", name:"Zipped Jacket", price:65, description:"Dark navy and light blue men's zipped waterproof jacket with an outer zipped chestpocket for easy storeage.", gender:"men", image:"assets/Zipped Jacket.jpg", sizes:["S","M","L","XL"], colors:[{name:"Navy",hex:"#1e3a5f"},{name:"Blue",hex:"#3b82f6"}] },
  { id:11, handle:"black-leather-bag", name:"Black Leather Bag", price:30, description:"Womens black leather bag, with ample space. Can be worn over the shoulder, or remove straps to carry in your hand.", gender:"women", image:"assets/Black Leather Bag.jpg", sizes:["One Size"], colors:[{name:"Black",hex:"#1A1A1A"},{name:"Brown",hex:"#92400e"}] },
  { id:12, handle:"dark-winter-jacket", name:"Soft Winter Jacket", price:50, description:"Thick black winter jacket, with soft fleece lining. Perfect for those cold weather days.", gender:"women", image:"assets/smiling-woman-on-snowy-afternoon.jpg", sizes:["XS","S","M","L"], colors:[{name:"Black",hex:"#1A1A1A"},{name:"Grey",hex:"#6b7280"}] },
  { id:13, handle:"navy-sport-jacket", name:"Navy Sports Jacket", price:60, description:"Long-sleeved navy waterproof jacket in thin, polyester fabric with a soft mesh inside.", gender:"men", image:"assets/Navy Sports Jacket.jpg", sizes:["S","M","L","XL"], colors:[{name:"Navy",hex:"#1e3a5f"},{name:"Black",hex:"#1A1A1A"}] },
  { id:14, handle:"dark-denim-top", name:"Dark Denim Top", price:60, description:"Classic dark denim top with chest pockets, long sleeves with buttoned cuffs, and a ripped hem effect.", gender:"women", image:"assets/Dark Denim Top.jpg", sizes:["XS","S","M","L"], colors:[{name:"Denim",hex:"#1e40af"},{name:"Black",hex:"#1A1A1A"}] },
  { id:15, handle:"classic-leather-jacket", name:"Classic Leather Jacket", price:80, description:"Womans zipped leather jacket. Adjustable belt for a comfortable fit, complete with shoulder pads and front zip pocket.", gender:"women", image:"assets/Classic Leather Jacket.jpg", sizes:["XS","S","M","L"], colors:[{name:"Black",hex:"#1A1A1A"},{name:"Brown",hex:"#92400e"}] },
  { id:16, handle:"striped-silk-blouse", name:"Striped Silk Blouse", price:50, description:"Ultra-stylish black and red striped silk blouse with buckle collar and matching button pants.", gender:"women", image:"assets/striped-blouse-fashion.jpg", sizes:["XS","S","M","L"], colors:[{name:"Red",hex:"#ef4444"},{name:"Black",hex:"#1A1A1A"}] },
  { id:17, handle:"floral-white-top", name:"Floral White Top", price:75, description:"Stylish sleeveless white top with a floral pattern.", gender:"women", image:"assets/Floral White Top.jpg", sizes:["XS","S","M","L"], colors:[{name:"White",hex:"#FFFFFF"},{name:"Black",hex:"#1A1A1A"}] },
  { id:18, handle:"yellow-wool-jumper", name:"Yellow Wool Jumper", price:80, description:"Knitted jumper in a soft wool blend with low dropped shoulders and wide sleeves and think cuffs. Perfect for keeping warm during Fall.", gender:"women", image:"assets/Yellow Wool Jumper.jpg", sizes:["XS","S","M","L"], colors:[{name:"Yellow",hex:"#eab308"},{name:"Brown",hex:"#92400e"}] },
  { id:19, handle:"classic-varsity-top", name:"Classic Varsity Top", price:60, description:"Womens casual varsity top, This grey and black buttoned top is a sport-inspired piece complete with an embroidered letter.", gender:"women", image:"assets/Classic Varsity Top.jpg", sizes:["XS","S","M","L"], colors:[{name:"Grey",hex:"#6b7280"},{name:"Black",hex:"#1A1A1A"}] },
  { id:20, handle:"ocean-blue-shirt", name:"Ocean Blue Shirt", price:50, description:"Ocean blue cotton shirt with a narrow collar and buttons down the front and long sleeves. Comfortable fit and tiled kalidoscope patterns.", gender:"men", image:"assets/Ocean Blue Shirt.jpg", sizes:["S","M","L","XL"], colors:[{name:"Blue",hex:"#3b82f6"},{name:"White",hex:"#FFFFFF"}] }
];

// Enrich products with ratings and sample customer reviews
products.forEach(function(p, idx) {
  p.rating = (4.6 + ((idx * 3) % 4) * 0.1).toFixed(1);
  p.reviewCount = 24 + ((idx * 19) % 150);
  p.reviews = [
    { name: "Jessica R.", rating: 5, date: "2 days ago", comment: "Exceptional quality and fit! The fabric feels truly premium and soft." },
    { name: "Michael T.", rating: 5, date: "1 week ago", comment: "Looks even sharper in person than online. Arrived within 3 days." },
    { name: "Sophia L.", rating: 4, date: "2 weeks ago", comment: "Really stylish wardrobe addition. Highly recommend sizing up for an oversized look." }
  ];
});

// App State
let cart = [];
let wishlist = [];
let currentFilter = 'all';
let selectedSize = null;
let selectedColor = null;
let detailQty = 1;
let currentProduct = null;
let currentRatingInput = 5;

// Promo Codes
const PROMO_CODES = {
  'STYLENEST20': { code: 'STYLENEST20', type: 'percent', val: 0.20, label: '20% OFF' },
  'SAVE10': { code: 'SAVE10', type: 'fixed', val: 10, min: 40, label: '$10 OFF' },
  'VIP50': { code: 'VIP50', type: 'percent', val: 0.50, label: '50% VIP OFF' }
};
let activePromo = null;

// DOM Helper
const $ = (id) => document.getElementById(id);

// ==========================================
// 1. Toast Notification System
// ==========================================
function showToast(title, message, type) {
  const container = $('toastContainer');
  if (!container) return;
  const card = document.createElement('div');
  card.className = 'toast-card';
  
  let iconHtml = '🛍️';
  let iconClass = '';
  if (type === 'heart') { iconHtml = '❤️'; iconClass = 'heart'; }
  else if (type === 'coupon') { iconHtml = '🏷️'; iconClass = 'coupon'; }
  else if (type === 'star') { iconHtml = '⭐'; }
  else if (type === 'info') { iconHtml = '✨'; }

  card.innerHTML = 
    '<div class="toast-icon ' + iconClass + '">' + iconHtml + '</div>' +
    '<div class="toast-content">' +
      '<h5>' + title + '</h5>' +
      '<p>' + message + '</p>' +
    '</div>';

  container.appendChild(card);

  setTimeout(function() {
    card.classList.add('hide');
    setTimeout(function() { card.remove(); }, 300);
  }, 3200);
}

// ==========================================
// 2. Dark / Light Theme Switcher
// ==========================================
let currentTheme = 'dark';
try {
  currentTheme = localStorage.getItem('stylenest_theme') || 'dark';
} catch (e) {}

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  const icon = $('themeIcon');
  if (icon) icon.textContent = theme === 'dark' ? '🌙' : '☀️';
  try { localStorage.setItem('stylenest_theme', theme); } catch (e) {}
}

function toggleTheme() {
  const next = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  showToast('Theme Updated', 'Switched to ' + (next === 'dark' ? 'Dark Slate' : 'Luxury Light') + ' mode', 'info');
}

const themeBtn = $('themeToggle');
if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

// ==========================================
// 3. Wishlist System
// ==========================================
function saveWishlist() {
  try { localStorage.setItem('stylenest_wishlist', JSON.stringify(wishlist)); } catch (e) {}
}

function loadWishlist() {
  try {
    const saved = localStorage.getItem('stylenest_wishlist');
    if (saved) wishlist = JSON.parse(saved);
  } catch (e) {}
  updateWishlistBadge();
}

function updateWishlistBadge() {
  const count = wishlist.length;
  if ($('wishlistBadge')) $('wishlistBadge').textContent = count;
  if ($('wishlistHeaderCount')) $('wishlistHeaderCount').textContent = count;
}

function toggleWishlist(id) {
  const p = products.find(prod => prod.id === id);
  const idx = wishlist.indexOf(id);
  if (idx !== -1) {
    wishlist.splice(idx, 1);
    showToast('Wishlist', (p ? p.name : 'Item') + ' removed from your wishlist', 'heart');
  } else {
    wishlist.push(id);
    showToast('Added to Wishlist ❤️', (p ? p.name : 'Item') + ' saved to your favorites', 'heart');
  }
  saveWishlist();
  updateWishlistBadge();
  renderProducts();
  if ($('wishlistPanel') && $('wishlistPanel').classList.contains('open')) renderWishlist();
}

function openWishlist() {
  renderWishlist();
  if ($('wishlistPanel')) $('wishlistPanel').classList.add('open');
  if ($('wishlistOverlay')) $('wishlistOverlay').classList.add('open');
}

function closeWishlist() {
  if ($('wishlistPanel')) $('wishlistPanel').classList.remove('open');
  if ($('wishlistOverlay')) $('wishlistOverlay').classList.remove('open');
}

function renderWishlist() {
  const container = $('wishlistItems');
  if (!container) return;
  if (wishlist.length === 0) {
    container.innerHTML = '<div class="wishlist-empty"><p>&#9825;</p><h3>Your wishlist is empty</h3><p>Click the heart icon on any product to save it here.</p></div>';
    return;
  }
  const wishProducts = products.filter(p => wishlist.indexOf(p.id) !== -1);
  container.innerHTML = wishProducts.map(function(p) {
    return '<div class="cart-item">' +
      '<img src="' + p.image + '" alt="' + p.name + '">' +
      '<div class="cart-item-info">' +
        '<h4>' + p.name + '</h4>' +
        '<span class="card-category">' + p.gender.toUpperCase() + '</span>' +
        '<div class="item-price">$' + p.price.toFixed(2) + '</div>' +
        '<button class="move-to-cart-btn" data-id="' + p.id + '">View & Add to Cart</button>' +
      '</div>' +
      '<button class="remove-item remove-wish-item" data-id="' + p.id + '" title="Remove">&times;</button>' +
    '</div>';
  }).join('');

  container.querySelectorAll('.move-to-cart-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      closeWishlist();
      openProductDetail(parseInt(this.dataset.id));
    });
  });

  container.querySelectorAll('.remove-wish-item').forEach(function(btn) {
    btn.addEventListener('click', function() {
      toggleWishlist(parseInt(this.dataset.id));
    });
  });
}

if ($('wishlistBtn')) $('wishlistBtn').addEventListener('click', openWishlist);
if ($('closeWishlist')) $('closeWishlist').addEventListener('click', closeWishlist);
if ($('wishlistOverlay')) $('wishlistOverlay').addEventListener('click', closeWishlist);

// ==========================================
// 4. Product Catalog Rendering
// ==========================================
const renderProducts = () => {
  const grid = $('productGrid');
  if (!grid) return;
  const query = $('searchInput').value.toLowerCase();
  let filtered = products.slice();

  if (currentFilter !== 'all') {
    filtered = filtered.filter(function(p) { return p.gender === currentFilter; });
  }
  if (query) {
    filtered = filtered.filter(function(p) {
      return p.name.toLowerCase().indexOf(query) !== -1 || p.description.toLowerCase().indexOf(query) !== -1;
    });
  }

  const titles = { all:'All Products', men:'Men\'s Collection', women:'Women\'s Collection' };
  $('catalogTitle').textContent = titles[currentFilter] || 'All Products';
  $('productCount').textContent = filtered.length + ' products';

  if (filtered.length === 0) {
    grid.innerHTML = '';
    $('noResults').style.display = 'block';
    return;
  }
  $('noResults').style.display = 'none';

  grid.innerHTML = filtered.map(function(p) {
    const isWishlisted = wishlist.indexOf(p.id) !== -1;
    return '<div class="product-card" data-id="' + p.id + '">' +
      '<div class="card-img-wrap">' +
        '<img class="card-img" src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
        '<button class="wishlist-card-btn ' + (isWishlisted ? 'active' : '') + '" data-id="' + p.id + '" title="' + (isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist') + '">' +
          (isWishlisted ? '♥' : '♡') +
        '</button>' +
        '<button class="quick-view">Quick View</button>' +
      '</div>' +
      '<div class="card-body">' +
        '<span class="card-category">' + p.gender.charAt(0).toUpperCase() + p.gender.slice(1) + '</span>' +
        '<div class="card-rating"><span>★</span><span>' + p.rating + '</span><span class="card-rating-count">(' + p.reviewCount + ')</span></div>' +
        '<h3 class="card-name">' + p.name + '</h3>' +
        '<div class="card-price">' +
          '<span class="current">$' + p.price.toFixed(2) + '</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  const cards = grid.querySelectorAll('.product-card');
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function(e) {
      if (e.target.closest('.wishlist-card-btn')) return;
      openProductDetail(parseInt(this.dataset.id));
    });
  }

  const wishBtns = grid.querySelectorAll('.wishlist-card-btn');
  for (let i = 0; i < wishBtns.length; i++) {
    wishBtns[i].addEventListener('click', function(e) {
      e.stopPropagation();
      toggleWishlist(parseInt(this.dataset.id));
    });
  }
};

// Filter buttons
function setupFilterButtons() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  for (let i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener('click', function() {
      const allBtns = document.querySelectorAll('.filter-btn');
      for (let j = 0; j < allBtns.length; j++) { allBtns[j].classList.remove('active'); }
      this.classList.add('active');
      currentFilter = this.dataset.filter;
      renderProducts();
    });
  }
}
setupFilterButtons();

function setupFilterLinks() {
  const allLinks = document.querySelectorAll('.nav-links a, .mobile-menu a, .footer-link[data-filter]');
  for (let i = 0; i < allLinks.length; i++) {
    allLinks[i].addEventListener('click', function(e) {
      e.preventDefault();
      const filter = this.dataset.filter;
      if (!filter) return;
      currentFilter = filter;
      const filterBtns = document.querySelectorAll('.filter-btn');
      for (let j = 0; j < filterBtns.length; j++) {
        if (filterBtns[j].dataset.filter === currentFilter) {
          filterBtns[j].classList.add('active');
        } else {
          filterBtns[j].classList.remove('active');
        }
      }
      $('mobileMenu').classList.remove('open');
      $('catalog').scrollIntoView({ behavior: 'smooth' });
      renderProducts();
    });
  }
}
setupFilterLinks();

// Footer info modals
function setupFooterHelpLinks() {
  const helpLinks = document.querySelectorAll('.footer-help-link');
  for (let i = 0; i < helpLinks.length; i++) {
    helpLinks[i].addEventListener('click', function(e) {
      e.preventDefault();
      const page = this.dataset.page;
      openInfoModal(page);
    });
  }
}

function openInfoModal(page) {
  const content = {
    faq: {
      title: 'Frequently Asked Questions',
      body: '<div class="info-section"><h4>How do I place an order?</h4><p>Browse our catalog, select your size and color, add items to cart, and proceed to checkout.</p></div>' +
        '<div class="info-section"><h4>Can I change my order after placing it?</h4><p>Please contact us within 1 hour of placing your order and we\'ll do our best to accommodate changes.</p></div>' +
        '<div class="info-section"><h4>What payment methods do you accept?</h4><p>We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery.</p></div>' +
        '<div class="info-section"><h4>How can I track my order?</h4><p>Once shipped, you\'ll receive a tracking number via email and SMS.</p></div>'
    },
    shipping: {
      title: 'Shipping Information',
      body: '<div class="info-section"><h4>Delivery Time</h4><p>Standard delivery takes 5-7 business days. Express delivery is available for 2-3 business days.</p></div>' +
        '<div class="info-section"><h4>Shipping Cost</h4><p>Free shipping on all orders above $50. Orders below $50 have a flat $5 shipping fee.</p></div>' +
        '<div class="info-section"><h4>International Shipping</h4><p>We ship to select international destinations. Delivery takes 10-15 business days.</p></div>'
    },
    returns: {
      title: 'Returns & Exchanges',
      body: '<div class="info-section"><h4>Return Policy</h4><p>We accept returns within 30 days of delivery for unused items in original packaging.</p></div>' +
        '<div class="info-section"><h4>How to Return</h4><p>Contact our support team to initiate a return. We\'ll arrange a pickup or provide a return shipping label.</p></div>' +
        '<div class="info-section"><h4>Refund Timeline</h4><p>Refunds are processed within 5-7 business days after we receive the returned item.</p></div>'
    },
    contact: {
      title: 'Contact Us',
      body: '<div class="info-section"><h4>Email</h4><p>support@stylenest.com</p></div>' +
        '<div class="info-section"><h4>Phone</h4><p>+1 (800) 555-NEST (6378)</p></div>' +
        '<div class="info-section"><h4>Business Hours</h4><p>Monday - Friday: 9:00 AM - 6:00 PM EST<br>Saturday: 10:00 AM - 4:00 PM EST<br>Sunday: Closed</p></div>' +
        '<div class="info-section"><h4>Address</h4><p>123 Fashion Street, Suite 100<br>New York, NY 10001</p></div>'
    }
  };

  const data = content[page];
  if (!data) return;

  $('infoModalTitle').textContent = data.title;
  $('infoModalBody').innerHTML = data.body;
  $('infoModal').classList.add('open');
}

$('closeInfoModal').addEventListener('click', function() {
  $('infoModal').classList.remove('open');
});
$('infoModal').addEventListener('click', function(e) {
  if (e.target === $('infoModal')) $('infoModal').classList.remove('open');
});

setupFooterHelpLinks();

// Search Box
$('searchToggle').addEventListener('click', function() {
  $('searchBox').classList.toggle('open');
  if ($('searchBox').classList.contains('open')) {
    $('searchInput').focus();
  } else {
    $('searchInput').value = '';
    renderProducts();
  }
});
$('searchInput').addEventListener('input', renderProducts);

// Mobile Nav
$('hamburgerBtn').addEventListener('click', function() {
  $('mobileMenu').classList.toggle('open');
});

$('shopNowBtn').addEventListener('click', function() {
  $('catalog').scrollIntoView({ behavior: 'smooth' });
});
$('viewCollectionBtn').addEventListener('click', function() {
  $('catalog').scrollIntoView({ behavior: 'smooth' });
});

// ==========================================
// 5. Product Quick View Modal & Reviews
// ==========================================
function renderReviewsList() {
  const container = $('reviewList');
  if (!container || !currentProduct) return;
  container.innerHTML = currentProduct.reviews.map(function(r) {
    const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
    return '<div class="review-card">' +
      '<div class="review-card-header">' +
        '<h5>' + r.name + ' <span class="stock-badge" style="font-size:0.68rem;padding:1px 6px;">Verified Buyer</span></h5>' +
        '<span class="review-card-stars">' + stars + '</span>' +
      '</div>' +
      '<p>' + r.comment + '</p>' +
    '</div>';
  }).join('');
}

function openProductDetail(id) {
  currentProduct = null;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) { currentProduct = products[i]; break; }
  }
  if (!currentProduct) return;
  selectedSize = null;
  selectedColor = null;
  detailQty = 1;

  $('detailImg').src = currentProduct.image;
  $('detailImg').alt = currentProduct.name;
  $('detailCategory').textContent = currentProduct.gender.charAt(0).toUpperCase() + currentProduct.gender.slice(1);
  $('detailName').textContent = currentProduct.name;
  $('detailPrice').textContent = '$' + currentProduct.price.toFixed(2);
  $('detailOriginal').style.display = 'none';
  $('detailDiscount').style.display = 'none';
  $('detailDesc').textContent = currentProduct.description;
  $('qtyValue').textContent = '1';

  // Stars & Reviews in modal
  if ($('detailStars')) $('detailStars').textContent = '★'.repeat(Math.round(currentProduct.rating));
  if ($('detailRatingText')) $('detailRatingText').textContent = currentProduct.rating + ' (' + currentProduct.reviewCount + ' reviews)';

  // Sizes
  $('sizeOptions').innerHTML = currentProduct.sizes.map(function(s) {
    return '<button class="size-btn" data-size="' + s + '">' + s + '</button>';
  }).join('');
  const sizeBtns = $('sizeOptions').querySelectorAll('.size-btn');
  for (let i = 0; i < sizeBtns.length; i++) {
    sizeBtns[i].addEventListener('click', function() {
      const allSizeBtns = $('sizeOptions').querySelectorAll('.size-btn');
      for (let j = 0; j < allSizeBtns.length; j++) { allSizeBtns[j].classList.remove('active'); }
      this.classList.add('active');
      selectedSize = this.dataset.size;
      updateAddBtn();
    });
  }

  // Colors
  $('colorOptions').innerHTML = currentProduct.colors.map(function(c) {
    const border = c.hex === '#FFFFFF' ? 'border:1px solid #ccc;' : '';
    return '<button class="color-btn" data-color="' + c.name + '" style="background:' + c.hex + ';' + border + '" title="' + c.name + '"></button>';
  }).join('');
  const colorBtns = $('colorOptions').querySelectorAll('.color-btn');
  for (let i = 0; i < colorBtns.length; i++) {
    colorBtns[i].addEventListener('click', function() {
      const allColorBtns = $('colorOptions').querySelectorAll('.color-btn');
      for (let j = 0; j < allColorBtns.length; j++) { allColorBtns[j].classList.remove('active'); }
      this.classList.add('active');
      selectedColor = this.dataset.color;
      updateAddBtn();
    });
  }

  renderReviewsList();
  if ($('reviewForm')) $('reviewForm').style.display = 'none';

  updateAddBtn();
  $('productModal').classList.add('open');
}

function updateAddBtn() {
  const btn = $('addToCartBtn');
  if (selectedSize && selectedColor) {
    btn.disabled = false;
    btn.textContent = 'Add to Cart';
  } else {
    btn.disabled = true;
    btn.textContent = 'Select size & color first';
  }
}

$('closeProductModal').addEventListener('click', function() {
  $('productModal').classList.remove('open');
});
$('productModal').addEventListener('click', function(e) {
  if (e.target === $('productModal')) $('productModal').classList.remove('open');
});

$('qtyMinus').addEventListener('click', function() {
  if (detailQty > 1) { detailQty--; $('qtyValue').textContent = detailQty; }
});
$('qtyPlus').addEventListener('click', function() {
  detailQty++;
  $('qtyValue').textContent = detailQty;
});

// Interactive Review Form
if ($('toggleReviewFormBtn')) {
  $('toggleReviewFormBtn').addEventListener('click', function() {
    const form = $('reviewForm');
    form.style.display = form.style.display === 'none' ? 'flex' : 'none';
  });
}

const starSpans = document.querySelectorAll('#ratingInputStars span');
starSpans.forEach(function(span) {
  span.addEventListener('click', function() {
    currentRatingInput = parseInt(this.dataset.star);
    starSpans.forEach(function(s, idx) {
      if (idx < currentRatingInput) s.classList.add('active');
      else s.classList.remove('active');
    });
  });
});

if ($('reviewForm')) {
  $('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!currentProduct) return;
    const name = $('reviewerName').value.trim();
    const comment = $('reviewerComment').value.trim();
    if (!name || !comment) return;

    currentProduct.reviews.unshift({
      name: name,
      rating: currentRatingInput,
      date: 'Just now',
      comment: comment
    });
    currentProduct.reviewCount++;
    renderReviewsList();
    if ($('detailRatingText')) $('detailRatingText').textContent = currentProduct.rating + ' (' + currentProduct.reviewCount + ' reviews)';

    $('reviewerName').value = '';
    $('reviewerComment').value = '';
    $('reviewForm').style.display = 'none';
    showToast('Review Submitted ⭐', 'Thank you, ' + name + '! Your verified feedback was added.', 'star');
    renderProducts();
  });
}

// ==========================================
// 6. Cart & Promo Discount Engine
// ==========================================
function saveCart() {
  try {
    localStorage.setItem('stylenest_cart', JSON.stringify(cart));
  } catch (e) {}
}

function loadCart() {
  try {
    const saved = localStorage.getItem('stylenest_cart');
    if (saved) cart = JSON.parse(saved);
  } catch (e) {}
  updateCartBadge();
}

$('addToCartBtn').addEventListener('click', function() {
  if (!selectedSize || !selectedColor || !currentProduct) return;
  let existing = null;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === currentProduct.id && cart[i].size === selectedSize && cart[i].color === selectedColor) {
      existing = cart[i]; break;
    }
  }
  if (existing) {
    existing.qty += detailQty;
  } else {
    cart.push({ id: currentProduct.id, product: currentProduct, size: selectedSize, color: selectedColor, qty: detailQty });
  }
  saveCart();
  updateCartBadge();
  $('productModal').classList.remove('open');
  showToast('Added to Cart 🛍️', currentProduct.name + ' (' + selectedSize + ', ' + selectedColor + ') x' + detailQty, 'info');
  openCart();
});

function updateCartBadge() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) { total += cart[i].qty; }
  $('cartBadge').textContent = total;
}

function openCart() {
  renderCart();
  $('cartPanel').classList.add('open');
  $('cartOverlay').classList.add('open');
}

function closeCart() {
  $('cartPanel').classList.remove('open');
  $('cartOverlay').classList.remove('open');
}

$('cartBtn').addEventListener('click', openCart);
$('closeCart').addEventListener('click', closeCart);
$('cartOverlay').addEventListener('click', closeCart);

// Promo Code Handlers
function applyPromoCode(code) {
  const clean = code.trim().toUpperCase();
  if (!clean) return;
  const promo = PROMO_CODES[clean];
  if (!promo) {
    showToast('Invalid Promo', 'Code "' + clean + '" is invalid. Try STYLENEST20 for 20% off!', 'coupon');
    return;
  }
  activePromo = promo;
  showToast('Promo Applied! 🏷️', promo.label + ' successfully applied to your order', 'coupon');
  if ($('cartPromoInput')) $('cartPromoInput').value = '';
  renderCart();
}

function removePromoCode() {
  activePromo = null;
  showToast('Promo Removed', 'Discount coupon has been removed', 'coupon');
  renderCart();
}

if ($('applyPromoBtn')) {
  $('applyPromoBtn').addEventListener('click', function() {
    const input = $('cartPromoInput');
    if (input) applyPromoCode(input.value);
  });
}
if ($('cartPromoInput')) {
  $('cartPromoInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyPromoCode(this.value);
    }
  });
}
if ($('removePromoBtn')) {
  $('removePromoBtn').addEventListener('click', removePromoCode);
}

function renderCart() {
  const container = $('cartItems');
  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty"><p>&#128722;</p><h3>Your cart is empty</h3><p>Discover our collections to find your style</p></div>';
    $('cartFooter').style.display = 'none';
    return;
  }
  $('cartFooter').style.display = 'block';
  
  let subtotal = 0;
  for (let i = 0; i < cart.length; i++) { subtotal += cart[i].product.price * cart[i].qty; }

  let discount = 0;
  if (activePromo) {
    if (activePromo.type === 'percent') {
      discount = subtotal * activePromo.val;
    } else if (activePromo.type === 'fixed') {
      if (subtotal >= (activePromo.min || 0)) discount = activePromo.val;
    }
  }
  const finalTotal = Math.max(0, subtotal - discount);

  if ($('cartSubtotal')) $('cartSubtotal').textContent = '$' + subtotal.toFixed(2);

  if (discount > 0 && activePromo) {
    if ($('cartDiscountRow')) $('cartDiscountRow').style.display = 'flex';
    if ($('cartDiscountLabel')) $('cartDiscountLabel').textContent = activePromo.label;
    if ($('cartDiscountAmount')) $('cartDiscountAmount').textContent = '-$' + discount.toFixed(2);
    if ($('activePromoContainer')) $('activePromoContainer').style.display = 'flex';
    if ($('activePromoLabel')) $('activePromoLabel').textContent = '🏷️ ' + activePromo.code + ' (' + activePromo.label + ') applied';
  } else {
    if ($('cartDiscountRow')) $('cartDiscountRow').style.display = 'none';
    if ($('activePromoContainer')) $('activePromoContainer').style.display = 'none';
  }

  $('cartTotal').textContent = '$' + finalTotal.toFixed(2);

  container.innerHTML = cart.map(function(item, idx) {
    return '<div class="cart-item">' +
      '<img src="' + item.product.image + '" alt="' + item.product.name + '">' +
      '<div class="cart-item-info">' +
        '<h4>' + item.product.name + '</h4>' +
        '<p>' + item.size + ' &middot; ' + item.color + '</p>' +
        '<span class="item-price">$' + (item.product.price * item.qty).toFixed(2) + '</span>' +
        '<div class="cart-item-actions">' +
          '<button data-idx="' + idx + '" class="cart-minus">-</button>' +
          '<span>' + item.qty + '</span>' +
          '<button data-idx="' + idx + '" class="cart-plus">+</button>' +
          '<button data-idx="' + idx + '" class="remove-item">&times;</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  const minusBtns = container.querySelectorAll('.cart-minus');
  const plusBtns = container.querySelectorAll('.cart-plus');
  const removeBtns = container.querySelectorAll('.remove-item');

  for (let i = 0; i < minusBtns.length; i++) {
    minusBtns[i].addEventListener('click', function() {
      const idx = parseInt(this.dataset.idx);
      if (cart[idx].qty > 1) { cart[idx].qty--; } else { cart.splice(idx, 1); }
      saveCart();
      updateCartBadge();
      renderCart();
    });
  }
  for (let i = 0; i < plusBtns.length; i++) {
    plusBtns[i].addEventListener('click', function() {
      cart[parseInt(this.dataset.idx)].qty++;
      saveCart();
      updateCartBadge();
      renderCart();
    });
  }
  for (let i = 0; i < removeBtns.length; i++) {
    removeBtns[i].addEventListener('click', function() {
      cart.splice(parseInt(this.dataset.idx), 1);
      saveCart();
      updateCartBadge();
      renderCart();
    });
  }
}

// ==========================================
// 7. Multi-Step Checkout Flow
// ==========================================
$('checkoutBtn').addEventListener('click', function() {
  closeCart();
  $('step1').style.display = 'block';
  $('step2').style.display = 'none';
  $('step3').style.display = 'none';
  $('checkoutModal').classList.add('open');
});

$('closeCheckout').addEventListener('click', function() {
  $('checkoutModal').classList.remove('open');
});
$('checkoutModal').addEventListener('click', function(e) {
  if (e.target === $('checkoutModal')) $('checkoutModal').classList.remove('open');
});

$('toPaymentBtn').addEventListener('click', function() {
  const fields = ['fullName', 'phone', 'address', 'city', 'state', 'pincode'];
  let valid = true;
  for (let i = 0; i < fields.length; i++) {
    const el = $(fields[i]);
    if (!el.value.trim()) {
      el.style.borderColor = '#ef4444';
      valid = false;
    } else {
      el.style.borderColor = '';
    }
  }
  if (!valid) return;

  let subtotal = 0;
  for (let i = 0; i < cart.length; i++) { subtotal += cart[i].product.price * cart[i].qty; }

  let discount = 0;
  if (activePromo) {
    if (activePromo.type === 'percent') {
      discount = subtotal * activePromo.val;
    } else if (activePromo.type === 'fixed') {
      if (subtotal >= (activePromo.min || 0)) discount = activePromo.val;
    }
  }
  const finalTotal = Math.max(0, subtotal - discount);

  $('checkoutSubtotal').textContent = '$' + subtotal.toFixed(2);
  if (discount > 0 && activePromo) {
    if ($('checkoutDiscountRow')) $('checkoutDiscountRow').style.display = 'flex';
    if ($('checkoutDiscountLabel')) $('checkoutDiscountLabel').textContent = activePromo.label;
    if ($('checkoutDiscountAmount')) $('checkoutDiscountAmount').textContent = '-$' + discount.toFixed(2);
  } else {
    if ($('checkoutDiscountRow')) $('checkoutDiscountRow').style.display = 'none';
  }
  $('checkoutTotal').textContent = '$' + finalTotal.toFixed(2);

  $('step1').style.display = 'none';
  $('step2').style.display = 'block';
});

// Payment method selection
const paymentRadios = document.querySelectorAll('input[name="payment"]');
for (let i = 0; i < paymentRadios.length; i++) {
  paymentRadios[i].addEventListener('change', function() {
    $('upiField').style.display = this.value === 'upi' ? 'flex' : 'none';
    $('cardFields').style.display = this.value === 'card' ? 'flex' : 'none';
    $('placeOrderBtn').disabled = false;
    $('placeOrderBtn').textContent = 'Place Order';
  });
}

$('placeOrderBtn').addEventListener('click', function() {
  const selectedPayment = document.querySelector('input[name="payment"]:checked');
  if (!selectedPayment) return;

  if (selectedPayment.value === 'upi') {
    const upiInput = $('upiId');
    if (!upiInput.value.trim() || !upiInput.value.includes('@')) {
      upiInput.style.borderColor = '#ef4444';
      upiInput.focus();
      return;
    }
    upiInput.style.borderColor = '';
  } else if (selectedPayment.value === 'card') {
    const num = $('cardNumber');
    const exp = $('cardExpiry');
    const cvv = $('cardCvv');
    let cardValid = true;
    [num, exp, cvv].forEach(function(input) {
      if (!input.value.trim()) {
        input.style.borderColor = '#ef4444';
        cardValid = false;
      } else {
        input.style.borderColor = '';
      }
    });
    if (!cardValid) return;
  }

  $('step2').style.display = 'none';
  $('step3').style.display = 'block';
  const orderId = 'Order #SN' + Math.random().toString(36).substring(2, 10).toUpperCase();
  $('orderId').textContent = orderId;
  cart = [];
  activePromo = null;
  saveCart();
  updateCartBadge();
  showToast('Order Placed Successfully! 🎉', orderId + ' is confirmed and will ship soon.', 'info');
});

$('continueShopping').addEventListener('click', function() {
  $('checkoutModal').classList.remove('open');
  const fields = ['fullName', 'phone', 'address', 'city', 'state', 'pincode'];
  for (let i = 0; i < fields.length; i++) { $(fields[i]).value = ''; }
  for (let i = 0; i < paymentRadios.length; i++) { paymentRadios[i].checked = false; }
  $('upiField').style.display = 'none';
  $('cardFields').style.display = 'none';
  $('placeOrderBtn').disabled = true;
  $('placeOrderBtn').textContent = 'Select a payment method';
});

// ==========================================
// 8. Application Initialization
// ==========================================
applyTheme(currentTheme);
loadWishlist();
loadCart();
renderProducts();
