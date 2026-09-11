import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import PincodeChecker from '../components/product/PincodeChecker';
import api from '../services/api';
import { ShoppingCart, Zap, Star, Tag, Check, ShieldCheck } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);

  // Review Form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        if (res.data.product) {
          setProduct(res.data.product);
          setSelectedImage(res.data.product.images?.[0]?.url || '');
        }
      } catch (err) {
        console.error('Error loading product details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({
      product: product._id,
      title: product.title,
      image: selectedImage || product.images?.[0]?.url,
      price: product.price,
      mrp: product.mrp || product.price,
      discountPercent: product.discountPercent || 0,
      quantity: 1,
      seller: 'SuperComNet',
      deliveryDate: 'Delivery in 2 days'
    }));
    navigate('/cart');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/products/${product._id}/reviews`, {
        rating: reviewRating,
        reviewTitle,
        reviewText
      });
      if (res.data.success) {
        setProduct(prev => ({
          ...prev,
          ratings: [res.data.review, ...(prev.ratings || [])],
          numReviews: (prev.numReviews || 0) + 1
        }));
        setShowReviewForm(false);
        setReviewTitle('');
        setReviewText('');
      }
    } catch (err) {
      alert('Failed to submit review');
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 py-12 flex justify-center items-center">
        <div className="text-sm font-semibold text-gray-500 animate-pulse">Loading product specifications...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 py-12 text-center text-gray-500">
        Product not found.
      </div>
    );
  }

  const discount = product.discountPercent || (product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0);

  return (
    <div className="min-h-screen bg-white pb-16">
      <main className="max-w-[1240px] mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column: Image Gallery & Action Buttons */}
          <div className="w-full lg:w-[460px] shrink-0 sticky top-16">
            <div className="flex gap-4">
              {/* Vertical Thumbnail Strip */}
              <div className="flex flex-col gap-2 shrink-0">
                {(product.images?.length ? product.images : [{ url: product.image }]).map((img, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => setSelectedImage(img.url)}
                    className={`w-14 h-14 border rounded-xs p-1 flex items-center justify-center overflow-hidden transition-all cursor-pointer ${
                      selectedImage === img.url ? 'border-[#2874f0] ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img.url} alt="thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>

              {/* Main Image Stage */}
              <div className="flex-1 h-[420px] border border-gray-100 rounded-xs flex items-center justify-center p-4 bg-white overflow-hidden group">
                <img
                  src={selectedImage || product.images?.[0]?.url}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Sticky Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={handleAddToCart}
                className="bg-[#ff9f00] hover:bg-[#f39700] text-white font-bold py-3.5 px-4 rounded-xs uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-[#fb641b] hover:bg-[#e85b17] text-white font-bold py-3.5 px-4 rounded-xs uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Zap size={18} fill="currentColor" /> Buy Now
              </button>
            </div>
          </div>

          {/* Right Column: Details, Offers, Specs */}
          <div className="flex-1 w-full space-y-4">
            {/* Title */}
            <h1 className="text-lg font-medium text-gray-900 leading-snug">
              {product.title}
            </h1>

            {/* Ratings & F-Assured */}
            <div className="flex items-center gap-3">
              <span className="fk-rating-badge">
                {product.avgRating || '4.5'} <Star size={10} fill="currentColor" strokeWidth={0} />
              </span>
              <span className="text-xs text-gray-500 font-semibold">
                {(product.numReviews || 120).toLocaleString()} Ratings & Reviews
              </span>
              {product.isAssured && (
                <img
                  src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                  alt="F-Assured"
                  className="h-5 object-contain"
                />
              )}
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl font-bold text-gray-900">
                ₹{product.price?.toLocaleString()}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.mrp?.toLocaleString()}
                </span>
              )}
              {discount > 0 && (
                <span className="text-sm font-bold text-[#388e3c]">
                  {discount}% off
                </span>
              )}
            </div>

            {/* Available Offers */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <h3 className="text-xs font-bold text-gray-900 uppercase">Available Offers</h3>
              <div className="space-y-1.5 text-xs text-gray-700">
                <p className="flex items-center gap-2">
                  <Tag size={13} className="text-[#388e3c] shrink-0" />
                  <span><strong>Bank Offer:</strong> 5% Unlimited Cashback on Flipkart Axis Bank Card</span>
                </p>
                <p className="flex items-center gap-2">
                  <Tag size={13} className="text-[#388e3c] shrink-0" />
                  <span><strong>Special Price:</strong> Get extra ₹3,000 off (price inclusive of cashback/coupon)</span>
                </p>
                <p className="flex items-center gap-2">
                  <Tag size={13} className="text-[#388e3c] shrink-0" />
                  <span><strong>Partner Offer:</strong> Sign-up for Flipkart Pay Later & get free Times Prime benefit</span>
                </p>
              </div>
            </div>

            {/* Pincode Delivery Checker Component */}
            <PincodeChecker />

            {/* Highlights */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-900 uppercase">Key Highlights</h3>
                <ul className="space-y-1 text-xs text-gray-700 pl-4 list-disc">
                  {product.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications Accordion Table */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <h3 className="text-base font-bold text-gray-900">Specifications</h3>
                <div className="border border-gray-200 rounded-xs divide-y divide-gray-200 text-xs">
                  {Object.entries(product.specifications).map(([section, specs]) => (
                    <div key={section} className="p-4 space-y-2">
                      <h4 className="font-bold text-gray-800 text-xs">{section}</h4>
                      <table className="w-full">
                        <tbody>
                          {Object.entries(specs || {}).map(([key, val]) => (
                            <tr key={key} className="border-b border-gray-50 last:border-none">
                              <td className="w-1/3 py-1.5 text-gray-400 font-medium">{key}</td>
                              <td className="w-2/3 py-1.5 text-gray-800">{String(val)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ratings & Customer Reviews Section */}
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-gray-900">Ratings & Reviews</h3>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-white text-[#2874f0] border border-gray-300 font-bold px-4 py-2 text-xs rounded-xs uppercase tracking-wider shadow-xs cursor-pointer hover:bg-gray-50"
                >
                  {showReviewForm ? 'Close Review Form' : 'Rate Product'}
                </button>
              </div>

              {showReviewForm && (
                <form onSubmit={handleReviewSubmit} className="p-4 bg-gray-50 border border-gray-200 rounded-xs space-y-3">
                  <h4 className="font-bold text-xs text-gray-800">Write a Review</h4>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1 font-medium">Select Rating:</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className={`p-1 text-sm ${reviewRating >= star ? 'text-yellow-500 font-bold' : 'text-gray-300'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    type="text"
                    required
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="Review Title (e.g. Excellent purchase!)"
                    className="w-full p-2 border border-gray-300 text-xs rounded-xs outline-none bg-white"
                  />
                  <textarea
                    required
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write detailed feedback..."
                    className="w-full p-2 border border-gray-300 text-xs rounded-xs outline-none bg-white"
                  />
                  <button
                    type="submit"
                    className="bg-[#2874f0] text-white font-bold text-xs px-6 py-2 rounded-xs uppercase cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              )}

              {/* Verified Customer Reviews list */}
              <div className="divide-y divide-gray-100">
                {(product.ratings || []).map((rev, i) => (
                  <div key={i} className="py-3 space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="fk-rating-badge text-[11px]">
                        {rev.rating} <Star size={9} fill="currentColor" strokeWidth={0} />
                      </span>
                      <span className="font-bold text-gray-900">{rev.reviewTitle}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{rev.reviewText}</p>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 pt-1">
                      <span className="font-semibold text-gray-500">{rev.userName}</span>
                      {rev.isVerifiedPurchase && (
                        <span className="flex items-center gap-1 text-[#388e3c]">
                          <ShieldCheck size={13} /> Certified Buyer
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
