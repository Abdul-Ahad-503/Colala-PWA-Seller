import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IMAGES from '../../constants';

const AdPreview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get boost configuration and product data from location state
  const boostConfig = location.state || {
    selectedLocation: 'Lagos, Nigeria',
    dailyBudget: 2000,
    duration: 7
  };
  
  const productData = boostConfig.productData;

  const handleBoostProduct = () => {
    // Handle the final boost product submission
    console.log('Boosting product with config:', boostConfig);
    // Navigate back to products or show success message
    navigate('/my-products');
  };

  const totalSpend = boostConfig.dailyBudget * boostConfig.duration;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <nav className="flex text-2xl text-gray-600">
            <button 
              onClick={() => navigate('/my-products')}
              className="hover:text-gray-900 cursor-pointer"
            >
              My product
            </button>
            <span className="mx-2">/</span>
            <button 
              onClick={() => navigate(-1)}
              className="hover:text-gray-900 cursor-pointer"
            >
              Product details
            </button>
            <span className="mx-2">/</span>
            <span className="text-black font-semibold">Boost Product</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 py-2">
        {/* Progress Bar and Title */}
        <div className="mb-8">
          <p className="text-lg text-gray-900 mb-4">Your ad is almost ready</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Ad Preview */}
          <div className="">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">Ad Preview</h2>
                <p className="text-sm text-gray-500">This is how your ad will appear to your customers</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
               <img src={IMAGES.Eraser} alt="" className='w-6 h-6' />
              </button>
            </div>

            {/* Sponsored Ad Card */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200" style={{ width: '526px', minHeight: '296px' }}>
              {/* Sponsored Badge */}
              <div className="relative">
                
                
                {/* Product Image */}
                <div className="bg-gray-100 overflow-hidden">
                  <img 
                    src={productData?.image || IMAGES.laptop} 
                    alt={productData?.name || "Dell Inspiron Laptop"} 
                    className="w-full h-[180px] object-cover"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <img 
                        src={IMAGES.user || "https://via.placeholder.com/24x24"} 
                        alt="Seller" 
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-600">Sasha Stores</span>
                      <div className="flex items-center ml-auto">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                        <span className="text-xs text-gray-600 ml-1">4.5</span>
                      </div>
                    </div>
                    
                    <h3 className="text-base font-medium text-gray-900 mb-2">
                      {productData?.name || "Dell Inspiron Laptop"}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-primary">
                        {productData?.price || "N2,000,000"}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {productData?.originalPrice || "N3,000,000"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-medium">
                          Available
                        </span>
                        <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-medium">
                          Negotiable
                        </span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Lagos, Nigeria
                      </div>
                    </div>
                  </div>

                  <button className="ml-4 p-2 hover:bg-gray-100 rounded">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            

            {/* Boost Product Button */}
            <div className="mt-6" style={{ width: '526px' }}>
              <button
                onClick={handleBoostProduct}
                className="w-full bg-primary text-white py-4 rounded-xl text-sm hover:bg-red-600 transition-colors"
              >
                Boost Product
              </button>
            </div>
          </div>

          {/* Right Column - Boost Summary */}
          <div className="">
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center">
                      <img src={IMAGES.MapPinLine} alt="" className='w-6 h-6' />
                    </div>
                    <span className="text-gray-900 font-medium">{boostConfig.selectedLocation}</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <img src={IMAGES.Eraser} alt="" className='w-6 h-6' />
                  </button>
                </div>
              </div>

              {/* Budget */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center">
                      <img src={IMAGES.Money} alt="" className='w-4 h-4' />
                    </div>
                    <span className="text-gray-900 font-medium">N{boostConfig.dailyBudget?.toLocaleString()} for {boostConfig.duration} day{boostConfig.duration !== 1 ? 's' : ''}</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <img src={IMAGES.Eraser} alt="" className='w-6 h-6' />
                  </button>
                </div>
              </div>

              {/* Total Spend */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Total Approximate Spend</p>
                  <p className="text-2xl font-bold text-red-500">N{totalSpend.toLocaleString()}</p>
                </div>
              </div>

              {/* Wallet Section */}
              <div className="bg-gradient-to-r from-[#F90909] to-[#920C5F] rounded-xl p-2 px-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="l">
                  <span className="text-[10px] opacity-90">Spending Wallet Balance</span>
                    <p className="text-[18px] font-bold">N3,000,000</p>
                  </div>
                  <button className="bg-white text-primary bg-opacity-20 px-3 py-1 rounded-full text-xs font-medium">
                    Top Up
                  </button>
                </div>
                
              </div>

              {/* Estimates */}
              <div className="space-y-1">
                <div className="flex items-center justify-between bg-primary px-[10px] py-1 rounded-lg text-white">
                  <span className="text-[10px]">Estimated Reach</span>
                  <span className="font-bold">1k - 2k Accounts</span>
                </div>
                
                <div className="flex items-center justify-between bg-primary px-[10px] py-1 rounded-lg text-white">
                  <span className="text-[10px]">Estimated Product Clicks</span>
                  <span className="font-bold">500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdPreview;
