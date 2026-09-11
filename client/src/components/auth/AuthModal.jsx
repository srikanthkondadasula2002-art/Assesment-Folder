import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, toggleAuthModal } from '../../redux/slices/authSlice';
import api from '../../services/api';

export default function AuthModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.auth.isModalOpen);
  const [identifier, setIdentifier] = useState('9876543210');
  const [password, setPassword] = useState('password123');
  const [useOtp, setUseOtp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', {
        identifier,
        password: useOtp ? undefined : password,
        isOtp: useOtp
      });
      if (res.data.success) {
        dispatch(setCredentials(res.data));
        dispatch(toggleAuthModal(false));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative flex w-full max-w-[780px] h-[500px] rounded-xs overflow-hidden shadow-2xl bg-white animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={() => dispatch(toggleAuthModal(false))}
          className="absolute right-4 top-3 text-2xl font-bold text-gray-400 hover:text-gray-800 z-10"
        >
          &times;
        </button>

        {/* Left Pane (Flipkart Deep Blue) */}
        <div className="w-2/5 bg-[#2874f0] p-9 flex flex-col justify-between text-white select-none">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Login</h2>
            <p className="mt-3 text-sm text-[#e0e0e0] leading-relaxed">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <div className="flex justify-center pb-2">
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
              alt="Flipkart Banner"
              className="w-44 object-contain"
            />
          </div>
        </div>

        {/* Right Pane (White Form Area) */}
        <div className="w-3/5 p-9 flex flex-col justify-between bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative border-b-2 border-gray-200 focus-within:border-[#2874f0] transition-colors pt-3">
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pb-1 text-sm outline-none bg-transparent"
                placeholder=" "
              />
              <label className="absolute left-0 top-1 text-xs text-gray-400 pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-[11px] peer-focus:text-[#2874f0]">
                Enter Email / Mobile number
              </label>
            </div>

            {!useOtp && (
              <div className="relative border-b-2 border-gray-200 focus-within:border-[#2874f0] transition-colors pt-3">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pb-1 text-sm outline-none bg-transparent"
                  placeholder=" "
                />
                <label className="absolute left-0 top-1 text-xs text-gray-400 pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-[11px] peer-focus:text-[#2874f0]">
                  Enter Password
                </label>
              </div>
            )}

            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

            <p className="text-[11px] text-gray-500 leading-snug">
              By continuing, you agree to Flipkart's{' '}
              <span className="text-[#2874f0] cursor-pointer">Terms of Use</span> and{' '}
              <span className="text-[#2874f0] cursor-pointer">Privacy Policy</span>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#fb641b] hover:bg-[#e85b17] text-white font-semibold py-3 rounded-xs shadow-md transition-all text-sm tracking-wide cursor-pointer"
            >
              {loading ? 'Processing...' : useOtp ? 'Request OTP' : 'Login'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setUseOtp(!useOtp)}
                className="text-xs font-semibold text-[#2874f0] hover:underline cursor-pointer"
              >
                {useOtp ? 'Sign in with Password instead' : 'Login with OTP'}
              </button>
            </div>
          </form>

          <div className="text-center pt-2">
            <span className="text-xs text-[#2874f0] font-semibold cursor-pointer hover:underline">
              New to Flipkart? Create an account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
