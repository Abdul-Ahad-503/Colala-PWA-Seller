import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard/index';
import IMAGES from '../../constants';

const MyProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'services'>('products');
  const [activeFilter, setActiveFilter] = useState<'all' | 'sponsored' | 'outOfStock'>('all');

  // Sample product data
  const products = [
    {
      id: '1',
      image: IMAGES.top1,
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N2,500,000',
      isSponsored: true,
      isOutOfStock: false,
      isSold: false,
      productViews: 200,
      productClicks: 15,
      messages: 5
    },
    {
      id: '2',
      image: IMAGES.top2,
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N2,500,000',
      isSponsored: true,
      isOutOfStock: false,
      isSold: true,
      productViews: 200,
      productClicks: 15,
      messages: 5
    },
    {
      id: '3',
      image: IMAGES.top3,
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N2,500,000',
      isSponsored: false,
      isOutOfStock: true,
      isSold: false,
      productViews: 200,
      productClicks: 15,
      messages: 5
    },
    {
      id: '4',
      image: IMAGES.top4,
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N2,500,000',
      isSponsored: true,
      isOutOfStock: false,
      isSold: false,
      productViews: 200,
      productClicks: 15,
      messages: 1
    },
    {
      id: '5',
      image: IMAGES.top1,
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N2,500,000',
      isSponsored: true,
      isOutOfStock: false,
      isSold: false,
      productViews: 200,
      productClicks: 15,
      messages: 5
    },
    {
      id: '6',
      image: IMAGES.top2,
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N2,500,000',
      isSponsored: true,
      isOutOfStock: false,
      isSold: false,
      productViews: 200,
      productClicks: 15,
      messages: 5
    },
    {
      id: '7',
      image: IMAGES.top3,
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N2,500,000',
      isSponsored: false,
      isOutOfStock: true,
      isSold: false,
      productViews: 200,
      productClicks: 15,
      messages: 5
    },
    {
      id: '8',
      image: IMAGES.top4,
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N2,500,000',
      isSponsored: true,
      isOutOfStock: false,
      isSold: false,
      productViews: 200,
      productClicks: 15,
      messages: 5
    },
    {
      id: '9',
      image: IMAGES.top1,
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N2,500,000',
      isSponsored: false,
      isOutOfStock: true,
      isSold: false,
      productViews: 200,
      productClicks: 15,
      messages: 5
    },
    {
      id: '10',
      image: IMAGES.top2,
      name: 'Dell Inspiron Laptop',
      price: 'N2,000,000',
      originalPrice: 'N2,500,000',
      isSponsored: false,
      isOutOfStock: true,
      isSold: false,
      productViews: 200,
      productClicks: 15,
      messages: 5
    }
  ];

  // Filter products based on active filter
  const filteredProducts = products.filter(product => {
    if (activeFilter === 'sponsored') return product.isSponsored;
    if (activeFilter === 'outOfStock') return product.isOutOfStock;
    return true; // 'all' filter
  });

  const handleEdit = (productId: string) => {
    console.log('Edit product:', productId);
  };

  const handleMore = (productId: string) => {
    console.log('More actions for product:', productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-black">My Product/Services</h1>
        </div>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'text-red-500 border-red-500'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            My Products
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'services'
                ? 'text-red-500 border-red-500'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            My Services
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('sponsored')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'sponsored'
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Sponsored
          </button>
          <button
            onClick={() => setActiveFilter('outOfStock')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'outOfStock'
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Out of stock
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              isSponsored={product.isSponsored}
              isOutOfStock={product.isOutOfStock}
              isSold={product.isSold}
              productViews={product.productViews}
              productClicks={product.productClicks}
              messages={product.messages}
              onEdit={() => handleEdit(product.id)}
              onMore={() => handleMore(product.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <img src={IMAGES.image} alt="No products" className="w-12 h-12 opacity-40" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">No products match your current filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
