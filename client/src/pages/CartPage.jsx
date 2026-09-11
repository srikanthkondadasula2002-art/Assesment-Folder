import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/slices/cartSlice';
import { Shield, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, itemTotal, totalDiscount, deliveryFee, totalPayable } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f1f3f6] py-12 px-4">
        <div className="max-w-[1240px] mx-auto bg-white p-12 text-center rounded-xs shadow-xs space-y-4">
          <div className="w-40 h-40 mx-auto flex items-center justify-center">
            <img
              src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
              alt="Empty Cart"
              className="max-h-full object-contain"
            />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Your cart is empty!</h2>
          <p className="text-xs text-gray-500">Explore our curated collections and add items you like.</p>
          <Link
            to="/products"
            className="inline-block bg-[#2874f0] text-white font-bold text-xs px-8 py-3 rounded-xs uppercase tracking-wider shadow-sm hover:opacity-95"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6] py-4">
      <main className="max-w-[1240px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {/* Deliver to address header */}
          <div className="bg-white p-4 rounded-xs shadow-xs flex justify-between items-center text-xs">
            <div>
              <span className="text-gray-500">Deliver to: </span>
              <span className="font-bold text-gray-900">{user?.name || 'Rohan Sharma'}, {user?.addresses?.[0]?.pincode || '560001'}</span>
              <p className="text-gray-400 text-[11px] mt-0.5">{user?.addresses?.[0]?.locality || 'Koramangala 5th Block, Bengaluru'}</p>
            </div>
            <Link to="/checkout" className="text-[#2874f0] font-bold uppercase hover:underline">
              Change
            </Link>
          </div>

          {/* Items Container */}
          <div className="bg-white rounded-xs shadow-xs divide-y divide-gray-100">
            {cartItems.map((item) => (
              <div key={item.product} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                {/* Product Thumbnail */}
                <div className="w-24 h-24 shrink-0 flex items-center justify-center">
                  <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <Link to={`/products/${item.product}`} className="font-medium text-sm text-gray-900 hover:text-[#2874f0]">
                      {item.title}
                    </Link>
                    <span className="text-[11px] text-gray-500 font-medium">
                      Delivery by 2 Days | <span className="text-[#388e3c] font-bold">FREE</span>
                    </span>
                  </div>

                  <p className="text-gray-400 text-[11px]">Seller: {item.seller || 'SuperComNet'}</p>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                    {item.mrp && item.mrp > item.price && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{(item.mrp * item.quantity).toLocaleString()}
                      </span>
                    )}
                    {item.discountPercent > 0 && (
                      <span className="text-xs font-bold text-[#388e3c]">
                        {item.discountPercent}% Off
                      </span>
                    )}
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center gap-4 pt-3 text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dispatch(updateQuantity({ product: item.product, quantity: item.quantity - 1 }))}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm font-bold hover:bg-gray-50 cursor-pointer"
                      >
                        −
                      </button>
                      <input
                        type="text"
                        readOnly
                        value={item.quantity}
                        className="w-8 text-center text-xs font-semibold outline-none bg-transparent"
                      />
                      <button
                        onClick={() => dispatch(updateQuantity({ product: item.product, quantity: item.quantity + 1 }))}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm font-bold hover:bg-gray-50 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item.product))}
                      className="text-gray-700 hover:text-[#2874f0] uppercase cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Place Order Bar */}
            <div className="p-4 flex justify-end bg-white sticky bottom-0 border-t border-gray-100 shadow-md">
              <button
                onClick={() => navigate('/checkout')}
                className="bg-[#fb641b] hover:bg-[#e85b17] text-white font-bold text-sm px-10 py-3 rounded-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Price Details Card */}
        <div className="sticky top-20 bg-white shadow-xs rounded-xs p-5 space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-3">
            Price Details
          </h3>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Price ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
              <span>₹{itemTotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-[#388e3c] font-medium">
              <span>Discount</span>
              <span>− ₹{totalDiscount.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span>
                {deliveryFee === 0 ? (
                  <span className="text-[#388e3c] font-bold">FREE</span>
                ) : (
                  `₹${deliveryFee}`
                )}
              </span>
            </div>

            <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between font-bold text-base text-gray-900">
              <span>Total Amount</span>
              <span>₹{totalPayable.toLocaleString()}</span>
            </div>

            <p className="text-xs text-[#388e3c] font-bold pt-1">
              You will save ₹{totalDiscount.toLocaleString()} on this order!
            </p>
          </div>

          <div className="pt-2 text-[11px] text-gray-400 flex items-center gap-2 border-t border-gray-100">
            <Shield size={18} className="text-gray-400 shrink-0" />
            <span>Safe and Secure Payments. 100% Authentic products.</span>
          </div>
        </div>
      </main>
    </div>
  );
}
