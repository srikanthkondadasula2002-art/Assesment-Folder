import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { name: 'All Products', slug: '', icon: 'https://rukminim2.flixcart.com/flap/80/80/image/29327f40e9c4d26b.png?q=100' },
  { name: 'Mobiles', slug: 'mobiles', icon: 'https://rukminim2.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100' },
  { name: 'Electronics', slug: 'electronics', icon: 'https://rukminim2.flixcart.com/flap/80/80/image/69c6589653afdb9a.png?q=100' },
  { name: 'Fashion', slug: 'fashion', icon: 'https://rukminim2.flixcart.com/fk-p-flap/80/80/image/0d75b34f7d8fbcb3.png?q=100' },
  { name: 'Home & Furniture', slug: 'home', icon: 'https://rukminim2.flixcart.com/flap/80/80/image/ab7e2b022a4587dd.jpg?q=100' },
  { name: 'Appliances', slug: 'appliances', icon: 'https://rukminim2.flixcart.com/flap/80/80/image/0ff199d1bd27eb98.png?q=100' },
  { name: 'Travel', slug: 'travel', icon: 'https://rukminim2.flixcart.com/flap/80/80/image/71050627a56b4693.png?q=100' },
  { name: 'Beauty, Toys & More', slug: 'beauty', icon: 'https://rukminim2.flixcart.com/flap/80/80/image/dff3f7adcf3a90c6.png?q=100' }
];

export default function CategoryBar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-[1240px] mx-auto px-4 py-2 flex items-center justify-between overflow-x-auto gap-4 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.name}
            to={cat.slug ? `/products?category=${cat.slug}` : '/products'}
            className="flex flex-col items-center min-w-[72px] group py-1"
          >
            <div className="w-16 h-16 flex items-center justify-center transition-transform group-hover:scale-105">
              <img src={cat.icon} alt={cat.name} className="w-14 h-14 object-contain" />
            </div>
            <span className="text-xs font-semibold text-gray-700 group-hover:text-[#2874f0] transition-colors text-center whitespace-nowrap mt-1">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
