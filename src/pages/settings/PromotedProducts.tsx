import React, { useState } from 'react';
import IMAGES from '../../constants';

const PromotedProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Product data based on the image - 6 Dell Inspiron Laptops
  const promotedProducts = [
    {
      id: 1,
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N5,000,000',
      image: IMAGES.top1,
      isSponsored: true,
      productViews: 200,
      productClicks: 15,
      messages: 3,
      serviceBadges: [
        { text: 'Free delivery', type: 'delivery' as const },
        { text: '25% Off in bulk', type: 'discount' as const }
      ]
    },
    {
      id: 2,
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N5,000,000',
      image: IMAGES.top2,
      isSponsored: true,
      productViews: 200,
      productClicks: 15,
      messages: 3,
      serviceBadges: [
        { text: 'Free delivery', type: 'delivery' as const },
        { text: '25% Off in bulk', type: 'discount' as const }
      ]
    },
    {
      id: 3,
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N5,000,000',
      image: IMAGES.top3,
      isSponsored: true,
      productViews: 200,
      productClicks: 15,
      messages: 3,
      serviceBadges: [
        { text: 'Free delivery', type: 'delivery' as const },
        { text: '25% Off in bulk', type: 'discount' as const }
      ]
    },
    {
      id: 4,
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N5,000,000',
      image: IMAGES.top1,
      isSponsored: true,
      productViews: 200,
      productClicks: 15,
      messages: 3,
      serviceBadges: [
        { text: 'Free delivery', type: 'delivery' as const },
        { text: '25% Off in bulk', type: 'discount' as const }
      ]
    },
    {
      id: 5,
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N5,000,000',
      image: IMAGES.top2,
      isSponsored: true,
      productViews: 200,
      productClicks: 15,
      messages: 3,
      serviceBadges: [
        { text: 'Free delivery', type: 'delivery' as const },
        { text: '25% Off in bulk', type: 'discount' as const }
      ]
    },
    {
      id: 6,
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N5,000,000',
      image: IMAGES.top3,
      isSponsored: true,
      productViews: 200,
      productClicks: 15,
      messages: 3,
      serviceBadges: [
        { text: 'Free delivery', type: 'delivery' as const },
        { text: '25% Off in bulk', type: 'discount' as const }
      ]
    }
  ];

  // Service Badge Component matching the existing design
  const ServiceBadge: React.FC<{ text: string; type: 'delivery' | 'discount' }> = ({ text }) => {
    return (
      <div className="bg-[#FFA500] rounded-[2px] w-[60px] h-3 flex items-center text-white text-[6px] font-normal">
        <div className="rounded-l-[2px] bg-[url('/cut-bg.svg')] w-4 h-3 bg-no-repeat flex justify-center items-center m-0 p-0">
          <svg className="w-2 h-2 fill-white" viewBox="0 0 24 24">
            <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </div>
        <span className="text-[6px]">{text}</span>
      </div>
    );
  };

  // Product Card Component matching the design in the image
  const ProductCard: React.FC<{
    product: typeof promotedProducts[0];
  }> = ({ product }) => {
    return (
      <div className="bg-white rounded-[20px] max-w-[188px] overflow-hidden border border-gray-200 shadow-sm relative">
        {/* Product Image */}
        <div className="relative bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-35 object-cover"
          />
          
          {/* Sponsored Badge */}
          {product.isSponsored && (
            <div className="absolute top-3 left-3 bg-[#000000CC] text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
              <img src={IMAGES.fire} alt="" className="w-3 h-3" />
              Sponsored
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="px-[10px] py-1">
          {/* Product Name */}
          <h3 className="text-[10px] font-medium text-black mb-2">{product.name}</h3>
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-[6px]">
            <span className="text-xs font-bold text-primary">{product.price}</span>
            {product.originalPrice && (
              <span className="text-[8px] text-gray-400 line-through">{product.originalPrice}</span>
            )}
          </div>

          {/* Service Badges */}
          <div className="flex gap-1 pb-2 border-b border-b-[#C0C0C0] mb-1">
            {product.serviceBadges.map((badge, index) => (
              <ServiceBadge key={index} text={badge.text} type={badge.type} />
            ))}
          </div>

          {/* Stats */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Product Views</span>
              <span className="text-sm font-medium">{product.productViews}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Product Clicks</span>
              <span className="text-sm font-medium">{product.productClicks}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Messages</span>
              <span className="text-sm font-medium">{product.messages}</span>
            </div>
          </div>

          {/* View Details Button */}
          <button className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors">
            View Details
          </button>
        </div>
      </div>
    );
  };

  const filteredProducts = promotedProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 bg-white rounded-[20px] min-h-screen p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black mb-6">Promoted Product</h1>
        
        {/* Search and Filter Row */}
        <div className="flex gap-4 mb-6">
          {/* Search Input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          {/* Categories Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white pr-10 min-w-[140px]"
            >
              <option value="all">Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-gray-400" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid - 3 columns as shown in image */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PromotedProducts;
