import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { addAddressSuccess } from '../redux/slices/authSlice';
import api from '../services/api';
import { ShieldCheck, Plus, Check } from 'lucide-react';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems, itemTotal, totalDiscount, deliveryFee, totalPayable } = useSelector((state) => state.cart);

  // Accordion Step: 1 = Login, 2 = Address, 3 = Order Summary, 4 = Payment
  const [activeStep, setActiveStep] = useState(user ? 2 : 1);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('RAZORPAY');
  const [loading, setLoading] = useState(false);

  // Add Address Form State
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    addressLine: '',
    city: '',
    state: '',
    addressType: 'HOME'
  });

  const handleAddNewAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/addresses', newAddr);
      if (res.data.success) {
        dispatch(addAddressSuccess(res.data.addresses));
        setShowAddAddress(false);
      }
    } catch (err) {
      alert('Error saving address');
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    const selectedAddress = user?.addresses?.[selectedAddressIndex] || {
      name: 'Rohan Sharma',
      phone: '9876543210',
      pincode: '560001',
      locality: 'Koramangala',
      addressLine: 'Flat 402, Prestige Towers',
      city: 'Bengaluru',
      state: 'Karnataka',
      addressType: 'HOME'
    };

    try {
      const res = await api.post('/orders/initiate', {
        orderItems: cartItems.map(item => ({
          product: item.product,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: item.quantity
        })),
        shippingAddress: selectedAddress,
        paymentMethod
      });

      if (paymentMethod === 'COD') {
        dispatch(clearCart());
        window.location.href = `/orders`;
        return;
      }

      // Razorpay Checkout Modal
      const options = {
        key: 'rzp_test_flipkart_demo123',
        amount: res.data.amount,
        currency: res.data.currency || 'INR',
        name: 'Flipkart Clone',
        description: 'Order Payment',
        order_id: res.data.razorpayOrderId,
        handler: async function (response) {
          await api.post('/orders/verify-payment', {
            orderId: res.data.orderId,
            razorpay_order_id: response.razorpay_order_id || res.data.razorpayOrderId,
            razorpay_payment_id: response.razorpay_payment_id || 'pay_sim_' + Date.now(),
            razorpay_signature: response.razorpay_signature || 'sim_sig_valid'
          });
          dispatch(clearCart());
          window.location.href = `/orders`;
        },
        prefill: {
          name: selectedAddress.name,
          contact: selectedAddress.phone,
          email: user?.email || 'rohan@example.com'
        },
        theme: { color: '#2874f0' }
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Direct sandbox fallback
        await api.post('/orders/verify-payment', {
          orderId: res.data.orderId,
          razorpay_order_id: res.data.razorpayOrderId,
          razorpay_payment_id: 'pay_sim_' + Date.now(),
          razorpay_signature: 'sim_sig_valid'
        });
        dispatch(clearCart());
        window.location.href = `/orders`;
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Order creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] py-4">
      <main className="max-w-[1240px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Left Column: 4-Step Accordion */}
        <div className="lg:col-span-2 space-y-3">
          {/* STEP 1: Login Verification */}
          <div className="bg-white rounded-xs shadow-xs overflow-hidden">
            <div className={`p-4 flex justify-between items-center ${activeStep === 1 ? 'bg-[#2874f0] text-white' : 'bg-white'}`}>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 bg-white text-[#2874f0] rounded-full text-xs font-bold flex items-center justify-center">1</span>
                <span className="font-bold text-xs uppercase tracking-wide">Login</span>
                {user && activeStep !== 1 && <span className="text-xs text-gray-500 font-normal">✓ {user.phone || user.email}</span>}
              </div>
              {user && activeStep > 1 && (
                <button onClick={() => setActiveStep(1)} className="text-xs font-bold text-[#2874f0] bg-white px-3 py-1 border border-gray-200 uppercase cursor-pointer">
                  Change
                </button>
              )}
            </div>
            {activeStep === 1 && (
              <div className="p-4 text-xs text-gray-700 flex justify-between items-center">
                <div>
                  <span className="font-bold text-gray-900">{user?.name}</span> ({user?.phone})
                </div>
                <button
                  onClick={() => setActiveStep(2)}
                  className="bg-[#fb641b] text-white font-bold text-xs px-6 py-2 rounded-xs uppercase cursor-pointer"
                >
                  Continue Checkout
                </button>
              </div>
            )}
          </div>

          {/* STEP 2: Delivery Address */}
          <div className="bg-white rounded-xs shadow-xs overflow-hidden">
            <div className={`p-4 flex justify-between items-center ${activeStep === 2 ? 'bg-[#2874f0] text-white' : 'bg-white'}`}>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 bg-white text-[#2874f0] rounded-full text-xs font-bold flex items-center justify-center">2</span>
                <span className="font-bold text-xs uppercase tracking-wide">Delivery Address</span>
              </div>
              {activeStep > 2 && (
                <button onClick={() => setActiveStep(2)} className="text-xs font-bold text-[#2874f0] bg-white px-3 py-1 border border-gray-200 uppercase cursor-pointer">
                  Change
                </button>
              )}
            </div>

            {activeStep === 2 && (
              <div className="p-4 space-y-4">
                {(user?.addresses || []).map((addr, idx) => (
                  <label
                    key={idx}
                    className={`flex items-start gap-3 p-4 border rounded-xs cursor-pointer ${
                      selectedAddressIndex === idx ? 'border-[#2874f0] bg-blue-50/20' : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="addrRadio"
                      checked={selectedAddressIndex === idx}
                      onChange={() => setSelectedAddressIndex(idx)}
                      className="mt-1 accent-[#2874f0]"
                    />
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900">{addr.name}</span>
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded-xs">{addr.addressType}</span>
                        <span className="font-bold text-gray-900">{addr.phone}</span>
                      </div>
                      <p className="text-gray-600">{addr.addressLine}, {addr.locality}, {addr.city}, {addr.state} - <span className="font-bold text-gray-900">{addr.pincode}</span></p>
                      {selectedAddressIndex === idx && (
                        <button
                          onClick={() => setActiveStep(3)}
                          className="mt-3 bg-[#fb641b] text-white font-bold px-6 py-2 text-xs uppercase tracking-wider rounded-xs shadow-xs cursor-pointer"
                        >
                          Deliver Here
                        </button>
                      )}
                    </div>
                  </label>
                ))}

                {/* Add New Address Modal Toggle */}
                {!showAddAddress ? (
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="flex items-center gap-2 text-[#2874f0] font-bold text-xs p-2 hover:bg-blue-50/30 rounded-xs cursor-pointer"
                  >
                    <Plus size={16} /> Add a new address
                  </button>
                ) : (
                  <form onSubmit={handleAddNewAddress} className="border border-gray-200 p-4 rounded-xs bg-gray-50 space-y-3 text-xs">
                    <h4 className="font-bold text-gray-900">Add New Address</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Name"
                        value={newAddr.name}
                        onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                        className="p-2 border border-gray-300 rounded-xs outline-none bg-white"
                      />
                      <input
                        type="text"
                        required
                        placeholder="10-digit mobile number"
                        value={newAddr.phone}
                        onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                        className="p-2 border border-gray-300 rounded-xs outline-none bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Pincode"
                        value={newAddr.pincode}
                        onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                        className="p-2 border border-gray-300 rounded-xs outline-none bg-white"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Locality"
                        value={newAddr.locality}
                        onChange={(e) => setNewAddr({ ...newAddr, locality: e.target.value })}
                        className="p-2 border border-gray-300 rounded-xs outline-none bg-white"
                      />
                    </div>
                    <textarea
                      required
                      placeholder="Address (Area and Street)"
                      value={newAddr.addressLine}
                      onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-xs outline-none bg-white"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="City/District/Town"
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        className="p-2 border border-gray-300 rounded-xs outline-none bg-white"
                      />
                      <input
                        type="text"
                        required
                        placeholder="State"
                        value={newAddr.state}
                        onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                        className="p-2 border border-gray-300 rounded-xs outline-none bg-white"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="bg-[#2874f0] text-white font-bold px-6 py-2 rounded-xs uppercase cursor-pointer"
                      >
                        Save and Deliver Here
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddAddress(false)}
                        className="text-gray-500 font-bold px-4 py-2 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* STEP 3: Order Summary */}
          <div className="bg-white rounded-xs shadow-xs overflow-hidden">
            <div className={`p-4 flex justify-between items-center ${activeStep === 3 ? 'bg-[#2874f0] text-white' : 'bg-white'}`}>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 bg-white text-[#2874f0] rounded-full text-xs font-bold flex items-center justify-center">3</span>
                <span className="font-bold text-xs uppercase tracking-wide">Order Summary ({cartItems.length} items)</span>
              </div>
              {activeStep > 3 && (
                <button onClick={() => setActiveStep(3)} className="text-xs font-bold text-[#2874f0] bg-white px-3 py-1 border border-gray-200 uppercase cursor-pointer">
                  Change
                </button>
              )}
            </div>

            {activeStep === 3 && (
              <div className="p-4 divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.product} className="py-4 flex gap-4">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                    <div className="text-xs space-y-1">
                      <h4 className="font-semibold text-sm text-gray-900">{item.title}</h4>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="font-bold text-sm text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                        <span className="text-gray-400 line-through">₹{(item.mrp * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveStep(4)}
                    className="bg-[#fb641b] text-white font-bold px-8 py-3 rounded-xs uppercase text-xs shadow-md cursor-pointer"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* STEP 4: Payment Options */}
          <div className="bg-white rounded-xs shadow-xs overflow-hidden">
            <div className={`p-4 flex items-center gap-3 ${activeStep === 4 ? 'bg-[#2874f0] text-white' : 'bg-white'}`}>
              <span className="w-5 h-5 bg-white text-[#2874f0] rounded-full text-xs font-bold flex items-center justify-center">4</span>
              <span className="font-bold text-xs uppercase tracking-wide">Payment Options</span>
            </div>

            {activeStep === 4 && (
              <div className="p-5 space-y-4 text-xs">
                <label className="flex items-center gap-3 p-3.5 border border-gray-200 rounded-xs cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payOption"
                    value="RAZORPAY"
                    checked={paymentMethod === 'RAZORPAY'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-[#2874f0]"
                  />
                  <div>
                    <span className="font-bold text-sm text-gray-900 block">Razorpay (Cards, UPI, NetBanking)</span>
                    <span className="text-gray-400 text-[11px]">Instant authorization via secure Indian payment gateway</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 border border-gray-200 rounded-xs cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payOption"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-[#2874f0]"
                  />
                  <div>
                    <span className="font-bold text-sm text-gray-900 block">Cash on Delivery (COD)</span>
                    <span className="text-gray-400 text-[11px]">Pay cash or UPI at the time of doorstep delivery</span>
                  </div>
                </label>

                <div className="pt-3 flex justify-end">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="bg-[#fb641b] hover:bg-[#e85b17] text-white font-bold px-10 py-3.5 rounded-xs uppercase text-sm shadow-md transition-all cursor-pointer"
                  >
                    {loading ? 'Confirming...' : `Confirm & Pay ₹${totalPayable.toLocaleString()}`}
                  </button>
                </div>
              </div>
            )}
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
                {deliveryFee === 0 ? <span className="text-[#388e3c] font-bold">FREE</span> : `₹${deliveryFee}`}
              </span>
            </div>

            <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between font-bold text-base text-gray-900">
              <span>Total Payable</span>
              <span>₹{totalPayable.toLocaleString()}</span>
            </div>

            <p className="text-xs text-[#388e3c] font-bold pt-1">
              You will save ₹{totalDiscount.toLocaleString()} on this order!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
