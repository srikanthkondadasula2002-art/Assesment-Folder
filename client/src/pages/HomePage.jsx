import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryBar from '../components/common/CategoryBar';
import ProductCard from '../components/product/ProductCard';
import api from '../services/api';
import { ChevronRight, Zap } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const res = await api.get('/products?limit=8');
        setProducts(res.data.products || []);
      } catch (err) {
        console.error('Error fetching home products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeProducts();
  }, []);

  const electronics = products.filter(p => p.category === 'electronics' || p.category === 'mobiles');
  const fashion = products.filter(p => p.category === 'fashion');

  return (
    <div className="min-h-screen pb-12">
      {/* Categories Bar */}
      <CategoryBar />

      <main className="max-w-[1240px] mx-auto px-4 mt-3 space-y-4">
        {/* Flipkart Hero Offer Banner */}
        <div className="w-full rounded-xs overflow-hidden shadow-sm bg-gradient-to-r from-[#2874f0] via-[#1254bf] to-[#0d3b87] text-white p-8 md:p-12 relative flex flex-col md:flex-row items-center justify-between">
          <div className="space-y-3 z-10">
            <span className="bg-[#ffe500] text-gray-900 text-xs font-black px-2.5 py-1 rounded-xs uppercase tracking-wider">
              Big Billion Days Special
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Flagship Mobiles & Gadgets
            </h1>
            <p className="text-gray-200 text-sm md:text-base font-medium max-w-lg">
              Get up to 40% off on Apple, Samsung, Sony & premium fashion essentials.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-[#fb641b] hover:bg-[#e85b17] text-white font-bold px-7 py-3 rounded-xs shadow-md transition-all text-sm uppercase tracking-wide"
              >
                Shop Now <ChevronRight size={16} />
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop"
              alt="iPhone 15 Banner"
              className="w-72 h-72 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Best of Electronics / Mobiles Carousel Strip */}
        <div className="bg-white shadow-xs rounded-xs p-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Zap size={20} className="text-[#2874f0]" /> Best of Electronics & Mobiles
              </h2>
              <p className="text-xs text-gray-500">Curated top picks with brand warranty & F-Assured quality</p>
            </div>
            <Link
              to="/products?category=mobiles"
              className="bg-[#2874f0] text-white text-xs font-bold px-4 py-2 rounded-xs uppercase tracking-wider hover:opacity-90"
            >
              View All
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="h-64 bg-gray-100 animate-pulse rounded-xs" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {(electronics.length ? electronics : products.slice(0, 4)).map(prod => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          )}
        </div>

        {/* Fashion & Lifestyle Section */}
        <div className="bg-white shadow-xs rounded-xs p-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Trending in Fashion & Footwear</h2>
              <p className="text-xs text-gray-500">Top casual wear and running gear from Nike, Levi's & Puma</p>
            </div>
            <Link
              to="/products?category=fashion"
              className="bg-[#2874f0] text-white text-xs font-bold px-4 py-2 rounded-xs uppercase tracking-wider hover:opacity-90"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {(fashion.length ? fashion : products.slice(2, 6)).map(prod => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
