import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import AuthModal from './components/auth/AuthModal';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f1f3f6] flex flex-col font-sans">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
        </Routes>
      </div>

      {/* Global Auth Modal */}
      <AuthModal />

      {/* Footer */}
      <footer className="bg-[#172337] text-white text-xs py-8 border-t border-gray-700 mt-auto">
        <div className="max-w-[1240px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-gray-400 font-bold uppercase tracking-wider mb-3">About</h5>
            <ul className="space-y-1.5 text-gray-300">
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Flipkart Stories</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-gray-400 font-bold uppercase tracking-wider mb-3">Help</h5>
            <ul className="space-y-1.5 text-gray-300">
              <li><a href="#" className="hover:underline">Payments</a></li>
              <li><a href="#" className="hover:underline">Shipping</a></li>
              <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-gray-400 font-bold uppercase tracking-wider mb-3">Consumer Policy</h5>
            <ul className="space-y-1.5 text-gray-300">
              <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
              <li><a href="#" className="hover:underline">Terms Of Use</a></li>
              <li><a href="#" className="hover:underline">Security</a></li>
              <li><a href="#" className="hover:underline">Privacy</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-gray-400 font-bold uppercase tracking-wider mb-3">Mail Us:</h5>
            <p className="text-gray-300 leading-relaxed">
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103, Karnataka, India
            </p>
          </div>
        </div>
        <div className="max-w-[1240px] mx-auto px-4 pt-8 mt-8 border-t border-gray-700/60 flex flex-wrap justify-between items-center text-gray-400 text-[11px]">
          <span>© 2007-2026 Flipkart.com. Full-Stack MERN Architecture Clone.</span>
          <span>Made with ❤️ using React, Redux Toolkit, Tailwind CSS & Node.js</span>
        </div>
      </footer>
    </div>
  );
}
