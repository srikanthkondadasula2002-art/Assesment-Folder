import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, ShoppingCart, User as UserIcon, ChevronDown, Package, Heart, LogOut } from 'lucide-react';
import { toggleAuthModal, logout } from '../../redux/slices/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#2874f0] text-white shadow-md">
      <div className="max-w-[1240px] mx-auto px-4 h-14 flex items-center justify-between gap-4 md:gap-8">
        {/* Brand Logo */}
        <Link to="/" className="flex flex-col items-start leading-none group">
          <span className="text-xl font-black italic tracking-wider flex items-center">
            Flipkart
          </span>
          <span className="text-[11px] italic font-semibold text-gray-200 flex items-center gap-0.5">
            Explore <span className="text-[#ffe500] font-bold">Plus</span>
            <span className="text-[#ffe500] text-xs">✦</span>
          </span>
        </Link>

        {/* Global Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-[560px] relative">
          <div className="flex items-center bg-white rounded-xs shadow-inner overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands and more"
              className="w-full py-2 px-4 text-sm text-gray-800 placeholder-gray-400 outline-none"
            />
            <button type="submit" className="px-4 text-[#2874f0] hover:opacity-80">
              <Search size={18} strokeWidth={2.5} />
            </button>
          </div>
        </form>

        {/* Action Controls */}
        <div className="flex items-center gap-6 text-sm font-semibold">
          {/* User Auth Button */}
          {user ? (
            <div 
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="flex items-center gap-1.5 py-1 px-3 hover:text-gray-100 cursor-pointer">
                <span>{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white text-gray-800 shadow-xl rounded-xs py-2 border border-gray-100 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400">Welcome,</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                  </div>
                  <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-xs text-gray-700">
                    <Package size={16} className="text-[#2874f0]" /> Orders
                  </Link>
                  <button 
                    onClick={() => dispatch(logout())}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-xs text-red-600 text-left"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => dispatch(toggleAuthModal(true))}
              className="bg-white text-[#2874f0] px-8 py-1 rounded-xs font-semibold hover:bg-gray-50 transition-colors shadow-xs"
            >
              Login
            </button>
          )}

          {/* Become a Seller */}
          <span className="hidden md:inline-block cursor-pointer hover:text-gray-100">
            Become a Seller
          </span>

          {/* My Orders link */}
          <Link to="/orders" className="flex items-center gap-1 hover:text-gray-100">
            <Package size={17} />
            <span className="hidden md:inline">Orders</span>
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="flex items-center gap-2 hover:text-gray-100 relative">
            <div className="relative">
              <ShoppingCart size={20} />
              {totalCartCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-[#ff6161] border border-white text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
