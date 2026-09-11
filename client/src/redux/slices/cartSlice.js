import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
  try {
    const saved = localStorage.getItem('fk_cart');
    return saved ? JSON.parse(saved) : [
      {
        product: '65f1a1000000000000000001',
        title: 'Apple iPhone 15 (Blue, 128 GB)',
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop',
        price: 71999,
        mrp: 79900,
        discountPercent: 9,
        quantity: 1,
        seller: 'SuperComNet',
        deliveryDate: 'Delivery by 2 Days'
      }
    ];
  } catch (e) {
    return [];
  }
};

const calculateTotals = (items) => {
  const itemTotal = items.reduce((sum, item) => sum + (item.mrp || item.price) * item.quantity, 0);
  const sellingTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = Math.max(0, itemTotal - sellingTotal);
  const deliveryFee = sellingTotal >= 500 || items.length === 0 ? 0 : 40;
  const totalPayable = sellingTotal + deliveryFee;

  return { itemTotal, totalDiscount, deliveryFee, totalPayable };
};

const initialItems = loadCart();
const initialTotals = calculateTotals(initialItems);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: initialItems,
    ...initialTotals
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.cartItems.find(x => x.product === item.product);
      if (exist) {
        exist.quantity += (item.quantity || 1);
      } else {
        state.cartItems.push(item);
      }
      Object.assign(state, calculateTotals(state.cartItems));
      localStorage.setItem('fk_cart', JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      const item = state.cartItems.find(x => x.product === product);
      if (item) {
        if (quantity <= 0) {
          state.cartItems = state.cartItems.filter(x => x.product !== product);
        } else {
          item.quantity = quantity;
        }
      }
      Object.assign(state, calculateTotals(state.cartItems));
      localStorage.setItem('fk_cart', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(x => x.product !== action.payload);
      Object.assign(state, calculateTotals(state.cartItems));
      localStorage.setItem('fk_cart', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      Object.assign(state, calculateTotals([]));
      localStorage.removeItem('fk_cart');
    }
  }
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
