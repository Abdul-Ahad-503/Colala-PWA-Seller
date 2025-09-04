import React, { useState } from 'react';
import IMAGES from '../../constants';
import ProductCard from '../../components/ProductCard/index';

const MyProductsServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample products data
  const products = [
    {
      id: '1',
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N5,000,000',
      image: IMAGES.top1,
      isSponsored: true,
      status: 'active',
      views: 200,
      clicks: 15,
      messages: 3,
      category: 'Electronics'
    },
    {
      id: '2',
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N5,000,000',
      image: IMAGES.top2,
      isSponsored: true,
      status: 'active',
      views: 200,
      clicks: 15,
      messages: 3,
      category: 'Electronics'
    },
    {
      id: '3',
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N5,000,000',
      image: IMAGES.top3,
      isSponsored: true,
      status: 'out-of-stock',
      views: 200,
      clicks: 15,
      messages: 3,
      category: 'Electronics'
    },
    {
      id: '4',
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N5,000,000',
      image: IMAGES.top4,
      isSponsored: true,
      status: 'active',
      views: 200,
      clicks: 15,
      messages: 3,
      category: 'Electronics'
    },
    {
      id: '5',
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N5,000,000',
      image: IMAGES.top1,
      isSponsored: true,
      status: 'active',
      views: 200,
      clicks: 15,
      messages: 3,
      category: 'Electronics'
    },
    {
      id: '6',
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N5,000,000',
      image: IMAGES.top2,
      isSponsored: true,
      status: 'out-of-stock',
      views: 200,
      clicks: 15,
      messages: 3,
      category: 'Electronics'
    }
  ];

  // Sample services data
  const services = [
    {
      id: '1',
      name: 'Professional Tailoring Service',
      price: 'N10,000 - N50,000',
      originalPrice: 'N15,000 - N75,000',
      image: IMAGES.top1,
      isSponsored: false,
      status: 'active',
      views: 150,
      clicks: 12,
      messages: 5,
      category: 'Fashion'
    }
  ];

  const getFilteredItems = () => {
    const items = activeTab === 'products' ? products : services;
    if (activeFilter === 'all') return items;
    if (activeFilter === 'sponsored') return items.filter(item => item.isSponsored);
    if (activeFilter === 'out-of-stock') return items.filter(item => item.status === 'out-of-stock');
    return items;
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="flex-1 p-6 bg-white rounded-[20px]">
      <div className="max-w-6xl">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Products / Services</h1>

        {/* Tabs */}
        <div className="flex gap-6 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-2 border-b-2 font-medium transition-colors ${
              activeTab === 'products'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            My Products
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`pb-2 border-b-2 font-medium transition-colors ${
              activeTab === 'services'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            My Services
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-12 py-4 rounded-[10px] text-xs transition-colors ${
              activeFilter === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('sponsored')}
            className={`px-12 py-4 rounded-[10px] text-xs transition-colors ${
              activeFilter === 'sponsored'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Sponsored
          </button>
          <button
            onClick={() => setActiveFilter('out-of-stock')}
            className={`px-12 py-4 rounded-[10px] text-xs transition-colors ${
              activeFilter === 'out-of-stock'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Out of stock
          </button>
        </div>

        {/* Products/Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              originalPrice={item.originalPrice}
              isSponsored={item.isSponsored}
              isOutOfStock={item.status === 'out-of-stock'}
              isSold={false}
              productViews={item.views}
              productClicks={item.clicks}
              messages={item.messages}
              onEdit={() => console.log('Edit product', item.id)}
              onMore={() => console.log('More options', item.id)}
              onProductStat={() => console.log('Product stats', item.id)}
              onMarkAsSold={() => console.log('Mark as sold', item.id)}
              onBoostProduct={() => console.log('Boost product', item.id)}
              onMarkAsUnavailable={() => console.log('Mark as unavailable', item.id)}
              onMarkAsAvailable={() => console.log('Mark as available', item.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <img src={IMAGES.shoppingCart} alt="Empty" className="w-8 h-8 opacity-50" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab} found
            </h3>
            <p className="text-gray-600 mb-4">
              {activeFilter === 'all' 
                ? `You haven't added any ${activeTab} yet.`
                : `No ${activeTab} match the selected filter.`
              }
            </p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-600">
              Add {activeTab === 'products' ? 'Product' : 'Service'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProductsServices;
