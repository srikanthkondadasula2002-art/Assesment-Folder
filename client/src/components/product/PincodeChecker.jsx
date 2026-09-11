import React, { useState } from 'react';
import api from '../../services/api';
import { MapPin, CheckCircle, XCircle } from 'lucide-react';

export default function PincodeChecker() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) return;
    setLoading(true);
    try {
      const res = await api.get(`/pincode/${pincode}`);
      setResult(res.data);
    } catch (err) {
      setResult({ serviceable: false, message: 'Unable to check delivery status at this moment.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-b border-gray-100 py-4 my-4 max-w-lg">
      <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
        <MapPin size={15} className="text-[#2874f0]" />
        <span>Delivery Options</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2 max-w-xs border-b-2 border-[#2874f0] pb-1">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter Delivery Pincode"
          className="w-full text-sm outline-none font-medium text-gray-900 placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={loading || pincode.length !== 6}
          className="text-xs font-bold text-[#2874f0] uppercase tracking-wider hover:opacity-80 disabled:opacity-40 cursor-pointer"
        >
          {loading ? 'Checking...' : 'Check'}
        </button>
      </form>

      {result && (
        <div className="mt-3 text-xs space-y-1.5 animate-fadeIn">
          {result.serviceable ? (
            <div className="space-y-1">
              <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                <CheckCircle size={14} className="text-[#388e3c]" />
                Delivery by <span className="font-bold text-gray-900">{result.estimatedDate}</span>
                {result.deliveryCharge === 0 ? (
                  <span className="ml-1 text-[#388e3c] font-bold">| FREE</span>
                ) : (
                  <span className="ml-1 text-gray-600">| ₹{result.deliveryCharge}</span>
                )}
              </p>
              <p className="text-gray-600 pl-5">
                {result.codAvailable ? '✓ Cash on Delivery available' : '✕ Cash on Delivery not available'}
              </p>
              <p className="text-gray-400 pl-5 text-[11px]">
                Serviceable in {result.city}, {result.state}
              </p>
            </div>
          ) : (
            <p className="text-red-500 font-semibold flex items-center gap-1.5">
              <XCircle size={14} />
              {result.message || 'Delivery is currently not available to this pincode.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
