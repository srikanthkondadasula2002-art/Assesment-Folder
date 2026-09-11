import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';

export default function ProductCard({ product }) {
  const discount = product.discountPercent || (product.mrp && product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0);

  return (
    <div className="group relative bg-white border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-200 p-4 flex flex-col justify-between rounded-xs">
      {/* Wishlist Heart */}
      <button 
        className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors z-10"
        title="Add to Wishlist"
      >
        <Heart size={18} fill="currentColor" strokeWidth={1.5} />
      </button>

      <Link to={`/products/${product._id}`} className="block">
        {/* Product Image */}
        <div className="w-full h-56 flex items-center justify-center overflow-hidden mb-3">
          <img
            src={product.images?.[0]?.url || 'https://via.placeholder.com/300'}
            alt={product.title}
            className="h-full w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Title */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-[#2874f0] transition-colors leading-snug">
          {product.title}
        </h3>

        {/* Rating & Assured Badge */}
        <div className="flex items-center gap-2 mt-2">
          <span className="fk-rating-badge">
            {product.avgRating || '4.2'} <Star size={10} fill="currentColor" strokeWidth={0} />
          </span>
          <span className="text-xs text-gray-400 font-medium">
            ({(product.numReviews || 120).toLocaleString()})
          </span>
          {product.isAssured && (
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
              alt="F-Assured"
              className="h-4 object-contain ml-1"
            />
          )}
        </div>

        {/* Pricing Breakdown */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-base font-bold text-gray-900">
            ₹{product.price?.toLocaleString()}
          </span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.mrp?.toLocaleString()}
            </span>
          )}
          {discount > 0 && (
            <span className="text-xs font-bold text-[#388e3c]">
              {discount}% off
            </span>
          )}
        </div>

        {/* Highlights or Free Delivery */}
        <div className="mt-2 text-[11px] text-gray-500 font-medium">
          Free delivery
        </div>
      </Link>
    </div>
  );
}
