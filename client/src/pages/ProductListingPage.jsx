import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryBar from '../components/common/CategoryBar';
import FilterSidebar from '../components/product/FilterSidebar';
import ProductCard from '../components/product/ProductCard';
import api from '../services/api';

export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(null);
  const [priceRange, setPriceRange] = useState({ gte: null, lte: null });
  const [sortOption, setSortOption] = useState('rating_desc');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (search) params.append('search', search);
      if (selectedBrands.length) params.append('brand', selectedBrands.join(','));
      if (minRating) params.append('minRating', minRating);
      if (priceRange.gte) params.append('price[gte]', priceRange.gte);
      if (priceRange.lte) params.append('price[lte]', priceRange.lte);
      if (sortOption) params.append('sort', sortOption);

      const res = await api.get(`/products?${params.toString()}`);
      setProducts(res.data.products || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error('Error loading products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, search, selectedBrands, minRating, priceRange, sortOption]);

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handlePriceChange = (gte, lte) => {
    setPriceRange({ gte, lte });
  };

  const handleClearAll = () => {
    setSelectedBrands([]);
    setMinRating(null);
    setPriceRange({ gte: null, lte: null });
  };

  return (
    <div className="min-h-screen pb-12">
      <CategoryBar />

      <main className="max-w-[1240px] mx-auto px-4 mt-3">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {/* Left Column: Filter Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <FilterSidebar
              selectedCategory={category}
              selectedBrands={selectedBrands}
              onBrandChange={handleBrandChange}
              minRating={minRating}
              onRatingChange={setMinRating}
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              onClearAll={handleClearAll}
            />
          </div>

          {/* Right Column: PLP Results Header & Grid */}
          <div className="flex-1 w-full bg-white border border-gray-200 shadow-xs rounded-xs overflow-hidden">
            {/* Sort & Count Header */}
            <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-3">
              <div>
                <h1 className="text-sm font-bold text-gray-900 capitalize">
                  {category ? `${category} Products` : search ? `Search Results for "${search}"` : 'All Products'}
                </h1>
                <span className="text-xs text-gray-500 font-medium">
                  Showing {products.length} of {total} products
                </span>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-3 text-xs font-semibold text-gray-700">
                <span className="text-gray-400 uppercase">Sort By</span>
                {[
                  { label: 'Popularity', value: 'rating_desc' },
                  { label: 'Price -- Low to High', value: 'price_asc' },
                  { label: 'Price -- High to Low', value: 'price_desc' },
                  { label: 'Discount', value: 'discount_desc' }
                ].map(sort => (
                  <button
                    key={sort.value}
                    onClick={() => setSortOption(sort.value)}
                    className={`pb-1 cursor-pointer transition-colors ${
                      sortOption === sort.value
                        ? 'text-[#2874f0] border-b-2 border-[#2874f0] font-bold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {sort.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="h-72 bg-gray-50 animate-pulse rounded-xs" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="p-16 text-center text-gray-500 space-y-3">
                <p className="text-lg font-bold text-gray-800">No products found</p>
                <p className="text-xs">Try adjusting your filters, price range or search terms.</p>
                <button
                  onClick={handleClearAll}
                  className="mt-2 bg-[#2874f0] text-white px-5 py-2 text-xs font-bold rounded-xs uppercase cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-x divide-y divide-gray-100">
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
