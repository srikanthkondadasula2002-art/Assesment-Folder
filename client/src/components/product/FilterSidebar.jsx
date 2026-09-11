import React from 'react';
import { Star } from 'lucide-react';

export default function FilterSidebar({
  selectedCategory,
  selectedBrands,
  onBrandChange,
  minRating,
  onRatingChange,
  priceRange,
  onPriceChange,
  onClearAll
}) {
  const BRANDS = ['Apple', 'Samsung', 'OnePlus', 'Sony', 'Nike'];

  return (
    <aside className="w-full bg-white border border-gray-200 shadow-xs rounded-xs divide-y divide-gray-200 text-xs text-gray-800">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <h3 className="font-bold text-base text-gray-900">Filters</h3>
        <button
          onClick={onClearAll}
          className="text-[#2874f0] font-bold text-xs uppercase hover:underline cursor-pointer"
        >
          Clear All
        </button>
      </div>

      {/* Price Section */}
      <div className="p-4 space-y-3">
        <h4 className="font-bold uppercase tracking-wider text-gray-900 text-xs">Price Range</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="priceRange"
              checked={!priceRange.gte && !priceRange.lte}
              onChange={() => onPriceChange(null, null)}
              className="accent-[#2874f0]"
            />
            <span>All Prices</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="priceRange"
              checked={priceRange.lte === 10000}
              onChange={() => onPriceChange(null, 10000)}
              className="accent-[#2874f0]"
            />
            <span>Under ₹10,000</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="priceRange"
              checked={priceRange.gte === 10000 && priceRange.lte === 50000}
              onChange={() => onPriceChange(10000, 50000)}
              className="accent-[#2874f0]"
            />
            <span>₹10,000 - ₹50,000</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="priceRange"
              checked={priceRange.gte === 50000}
              onChange={() => onPriceChange(50000, null)}
              className="accent-[#2874f0]"
            />
            <span>Above ₹50,000</span>
          </label>
        </div>
      </div>

      {/* Brand Section */}
      <div className="p-4 space-y-3">
        <h4 className="font-bold uppercase tracking-wider text-gray-900 text-xs">Brand</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {BRANDS.map((brand) => {
            const isChecked = selectedBrands.includes(brand);
            return (
              <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-[#2874f0]">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onBrandChange(brand)}
                  className="accent-[#2874f0] rounded-xs cursor-pointer"
                />
                <span>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Customer Ratings Section */}
      <div className="p-4 space-y-3">
        <h4 className="font-bold uppercase tracking-wider text-gray-900 text-xs">Customer Ratings</h4>
        <div className="space-y-2">
          {[4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="ratingFilter"
                checked={minRating === rating}
                onChange={() => onRatingChange(rating)}
                className="accent-[#2874f0]"
              />
              <span className="flex items-center gap-1 font-medium">
                {rating}★ & above
              </span>
            </label>
          ))}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="ratingFilter"
              checked={minRating === null}
              onChange={() => onRatingChange(null)}
              className="accent-[#2874f0]"
            />
            <span>All Ratings</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
