import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard/index';
import ProductStatsPopup from '../../components/ProductCard/ProductStatsPopup';
import IMAGES from '../../constants';

const MyProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'services'>('products');
  const [activeFilter, setActiveFilter] = useState<'all' | 'sponsored' | 'outOfStock'>('all');
  const [statsPopup, setStatsPopup] = useState<{ isOpen: boolean; productId: string | null }>({ 
    isOpen: false, 
    productId: null 
  });

  // Sample product data - now as state
  const [products, setProducts] = useState([
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
      messages: 5,
      chartData: [
        { label: 'Mon', impressions: 45, visitors: 32, orders: 8 },
        { label: 'Tue', impressions: 52, visitors: 28, orders: 12 },
        { label: 'Wed', impressions: 38, visitors: 25, orders: 6 },
        { label: 'Thu', impressions: 61, visitors: 35, orders: 15 },
        { label: 'Fri', impressions: 48, visitors: 30, orders: 10 },
        { label: 'Sat', impressions: 55, visitors: 40, orders: 18 },
        { label: 'Sun', impressions: 42, visitors: 22, orders: 7 },
      ],
      statistics: {
        views: 1234,
        inCart: 89,
        completedOrders: 156,
        impressions: 2567,
        profileClicks: 234,
        chats: 67,
        noClicks: 45
      }
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
      messages: 5,
      chartData: [
        { label: 'Mon', impressions: 35, visitors: 28, orders: 5 },
        { label: 'Tue', impressions: 42, visitors: 22, orders: 8 },
        { label: 'Wed', impressions: 48, visitors: 30, orders: 12 },
        { label: 'Thu', impressions: 51, visitors: 35, orders: 10 },
        { label: 'Fri', impressions: 38, visitors: 25, orders: 6 },
        { label: 'Sat', impressions: 45, visitors: 32, orders: 14 },
        { label: 'Sun', impressions: 52, visitors: 38, orders: 9 },
      ],
      statistics: {
        views: 987,
        inCart: 65,
        completedOrders: 123,
        impressions: 1890,
        profileClicks: 189,
        chats: 45,
        noClicks: 32
      }
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
      messages: 5,
      chartData: [
        { label: 'Mon', impressions: 28, visitors: 18, orders: 3 },
        { label: 'Tue', impressions: 35, visitors: 24, orders: 6 },
        { label: 'Wed', impressions: 32, visitors: 20, orders: 4 },
        { label: 'Thu', impressions: 41, visitors: 28, orders: 8 },
        { label: 'Fri', impressions: 38, visitors: 22, orders: 5 },
        { label: 'Sat', impressions: 33, visitors: 25, orders: 7 },
        { label: 'Sun', impressions: 29, visitors: 19, orders: 2 },
      ],
      statistics: {
        views: 654,
        inCart: 34,
        completedOrders: 78,
        impressions: 1245,
        profileClicks: 123,
        chats: 28,
        noClicks: 19
      }
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
      messages: 1,
      chartData: [
        { label: 'Mon', impressions: 58, visitors: 42, orders: 15 },
        { label: 'Tue', impressions: 63, visitors: 38, orders: 18 },
        { label: 'Wed', impressions: 49, visitors: 35, orders: 11 },
        { label: 'Thu', impressions: 71, visitors: 48, orders: 22 },
        { label: 'Fri', impressions: 55, visitors: 40, orders: 16 },
        { label: 'Sat', impressions: 67, visitors: 52, orders: 25 },
        { label: 'Sun', impressions: 52, visitors: 32, orders: 12 },
      ],
      statistics: {
        views: 1567,
        inCart: 112,
        completedOrders: 234,
        impressions: 3124,
        profileClicks: 298,
        chats: 89,
        noClicks: 56
      }
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
      messages: 5,
      chartData: [
        { label: 'Mon', impressions: 40, visitors: 30, orders: 8 },
        { label: 'Tue', impressions: 45, visitors: 35, orders: 12 },
        { label: 'Wed', impressions: 38, visitors: 28, orders: 6 },
        { label: 'Thu', impressions: 52, visitors: 40, orders: 15 },
        { label: 'Fri', impressions: 48, visitors: 32, orders: 10 },
        { label: 'Sat', impressions: 55, visitors: 42, orders: 18 },
        { label: 'Sun', impressions: 42, visitors: 25, orders: 7 },
      ],
      statistics: {
        views: 890,
        inCart: 56,
        completedOrders: 134,
        impressions: 1678,
        profileClicks: 167,
        chats: 45,
        noClicks: 29
      }
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
  ]);

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

  const handleMarkAsSold = (productId: string) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, isSold: true, isOutOfStock: false }
          : product
      )
    );
    console.log(`Product ${productId} marked as sold`);
  };

  const handleMarkAsUnavailable = (productId: string) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, isOutOfStock: true, isSold: false }
          : product
      )
    );
    console.log(`Product ${productId} marked as unavailable`);
  };

  const handleMarkAsAvailable = (productId: string) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, isOutOfStock: false, isSold: false }
          : product
      )
    );
    console.log(`Product ${productId} marked as available`);
  };

  const handleProductStat = (productId: string) => {
    console.log('View product statistics:', productId);
    setStatsPopup({ isOpen: true, productId });
  };

  const handleBoostProduct = (productId: string) => {
    console.log('Boost product:', productId);
    // Here you could implement boost functionality
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-black">My Product/Services</h1>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 border-b">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 text-sm font-medium border-b-5  -mb-[1px] transition-colors ${
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
            className={`px-13 py-3 rounded-[10px] text-xs  transition-colors ${
              activeFilter === 'all'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('sponsored')}
            className={`px-8 py-3 rounded-[10px] text-xs transition-colors ${
              activeFilter === 'sponsored'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Sponsored
          </button>
          <button
            onClick={() => setActiveFilter('outOfStock')}
            className={`px-7 py-3 rounded-[10px] text-xs transition-colors ${
              activeFilter === 'outOfStock'
                ? 'bg-primary text-white'
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
              id={product.id}
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
              onProductStat={() => handleProductStat(product.id)}
              onMarkAsSold={() => handleMarkAsSold(product.id)}
              onBoostProduct={() => handleBoostProduct(product.id)}
              onMarkAsUnavailable={() => handleMarkAsUnavailable(product.id)}
              onMarkAsAvailable={() => handleMarkAsAvailable(product.id)}
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

      {/* Product Statistics Popup */}
      {statsPopup.isOpen && statsPopup.productId && (() => {
        const product = products.find(p => p.id === statsPopup.productId);
        if (!product) return null;
        
        // Default chart data if not provided
        const defaultChartData = [
          { label: 'Mon', impressions: 25, visitors: 18, orders: 4 },
          { label: 'Tue', impressions: 30, visitors: 22, orders: 6 },
          { label: 'Wed', impressions: 28, visitors: 20, orders: 5 },
          { label: 'Thu', impressions: 35, visitors: 25, orders: 8 },
          { label: 'Fri', impressions: 32, visitors: 23, orders: 6 },
          { label: 'Sat', impressions: 38, visitors: 28, orders: 10 },
          { label: 'Sun', impressions: 26, visitors: 19, orders: 4 },
        ];
        
        // Default statistics if not provided
        const defaultStatistics = {
          views: 456,
          inCart: 23,
          completedOrders: 67,
          impressions: 890,
          profileClicks: 78,
          chats: 12,
          noClicks: 8
        };
        
        return (
          <ProductStatsPopup
            isOpen={statsPopup.isOpen}
            onClose={() => setStatsPopup({ isOpen: false, productId: null })}
            productId={product.id}
            productName={product.name}
            productData={{
              views: product.statistics?.views || defaultStatistics.views,
              inCart: product.statistics?.inCart || defaultStatistics.inCart,
              completedOrders: product.statistics?.completedOrders || defaultStatistics.completedOrders,
              impressions: product.statistics?.impressions || defaultStatistics.impressions,
              profileClicks: product.statistics?.profileClicks || defaultStatistics.profileClicks,
              chats: product.statistics?.chats || defaultStatistics.chats,
              noClicks: product.statistics?.noClicks || defaultStatistics.noClicks,
              chartData: (product.chartData || defaultChartData).map(item => ({
                month: item.label,
                impressions: item.impressions,
                visitors: item.visitors,
                orders: item.orders
              }))
            }}
          />
        );
      })()}
    </div>
  );
};

export default MyProducts;
