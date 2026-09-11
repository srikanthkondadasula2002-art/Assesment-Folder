import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderTrackingStepper from '../components/orders/OrderTrackingStepper';
import api from '../services/api';
import { Package, ChevronRight } from 'lucide-react';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error('Failed to load orders', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 py-12 text-center text-xs text-gray-500 animate-pulse">
        Loading order telemetry...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6] py-6">
      <main className="max-w-[1240px] mx-auto px-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Package size={22} className="text-[#2874f0]" /> My Orders ({orders.length})
          </h1>
          <Link to="/products" className="text-xs font-bold text-[#2874f0] uppercase hover:underline">
            Continue Shopping
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xs shadow-xs space-y-3">
            <p className="text-base font-bold text-gray-800">No past orders found</p>
            <p className="text-xs text-gray-500">Your completed purchases and fulfillment tracking will appear here.</p>
            <Link
              to="/products"
              className="inline-block bg-[#2874f0] text-white font-bold text-xs px-6 py-2.5 rounded-xs uppercase tracking-wider shadow-xs hover:opacity-90"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xs shadow-xs border border-gray-200 overflow-hidden divide-y divide-gray-100">
                {/* Order Header */}
                <div className="p-4 bg-gray-50/50 flex flex-wrap justify-between items-center text-xs gap-3">
                  <div>
                    <span className="text-gray-400">Order ID: </span>
                    <span className="font-bold text-gray-900">{order._id}</span>
                    <span className="text-gray-400 ml-2">({new Date(order.createdAt).toLocaleDateString('en-IN')})</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500">Total: <strong className="text-gray-900 font-bold">₹{order.totalPrice?.toLocaleString()}</strong></span>
                    <span className="bg-green-50 text-[#26a541] font-bold text-[11px] px-2.5 py-0.5 rounded-xs border border-green-200 uppercase">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Tracking Stepper */}
                <div className="p-4 bg-white">
                  <OrderTrackingStepper currentStatus={order.orderStatus} timeline={order.trackingTimeline} />
                </div>

                {/* Items List */}
                <div className="p-4 space-y-3">
                  {(order.orderItems || []).map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded-xs border border-gray-100 p-1" />
                      <div className="text-xs space-y-1 flex-1">
                        <h4 className="font-semibold text-sm text-gray-900">{item.title}</h4>
                        <p className="text-gray-400 text-[11px]">Qty: {item.quantity}</p>
                        <p className="font-bold text-sm text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
