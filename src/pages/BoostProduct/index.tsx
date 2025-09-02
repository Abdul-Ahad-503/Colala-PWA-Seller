import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IMAGES from '../../constants';
import LocationModal from './LocationModal';

const BoostProduct: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productData = location.state?.productData;

  const [selectedLocation, setSelectedLocation] = useState('');
  const [dailyBudget, setDailyBudget] = useState(2000);
  const [duration, setDuration] = useState(20);
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  const handleProceed = () => {
    // Navigate to ad preview with boost configuration and product data
    navigate('/boost-product/preview', {
      state: {
        selectedLocation,
        dailyBudget,
        duration,
        productData
      }
    });
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setLocationModalOpen(false);
  };

  const openLocationModal = () => {
    setLocationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className=" px-4 py-3 ">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Product Card */}
          <div className="bg-white rounded-2xl  shadow-sm h-fit">
            <div className="relative">
              
              
              {/* Product Image */}
              <div className=" bg-gray-100 rounded-t-xl overflow-hidden">
                <img 
                  src={productData?.image || IMAGES.laptop} 
                  alt={productData?.name || "Dell Inspiron Laptop"} 
                  className="w-full h-[348px] object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-3 p-[10px]">
              <h3 className="text-xl font-medium text-gray-900">
                {productData?.name || "Dell Inspiron Laptop"}
              </h3>
              
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-red-500">
                  {productData?.price || "2,000,000"}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  {productData?.originalPrice || "3,000,000"}
                </span>
              </div>

              {/* Status Badge */}
              <div className="inline-block">
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                  {productData?.status || "Available"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Boost Configuration */}
          <div className="">
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '49%' }}></div>
                </div>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-sm  text-gray-900 mb-2">
                  Get your post across several audiences
                </h2>
              </div>

              {/* Location Selection */}
              <div className="space-y-3">
                <label className="block text-gray-700 font-medium">Location</label>
                <button
                  onClick={openLocationModal}
                  className="w-full px-4 py-5 border border-[#E5E5E5] rounded-xl bg-white text-gray-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <span className={selectedLocation ? 'text-gray-900' : 'text-gray-400'}>
                    {selectedLocation || 'Select location'}
                  </span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Daily Spending Limit */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className=" text-sm">Set your daily spending limit</label>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] text-[#00000080]">Daily Budget</span>
                  
                  {/* Budget Slider */}
                  <div className="relative my-4">
                    {/* Custom Slider Track */}
                    <div className="w-full h-1 bg-gray-300 rounded-full relative">
                      <div 
                        className="h-1 bg-red-500 rounded-full"
                        style={{ width: `${((dailyBudget - 500) / (10000 - 500)) * 100}%` }}
                      ></div>
                      {/* Slider Thumb */}
                      <div 
                        className="absolute w-6 h-6 bg-red-500 rounded-full shadow-lg cursor-pointer transform -translate-y-4 -translate-x-3"
                        style={{ left: `${((dailyBudget - 500) / (10000 - 500)) * 100}%` }}
                      ></div>
                    </div>
                    
                    {/* Hidden input for functionality */}
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      value={dailyBudget}
                      onChange={(e) => setDailyBudget(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  
                  <div className="text-center">
                    <span className="text-lg font-semibold text-gray-900">₦ {dailyBudget.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-4">
                <span className="text-[10px] text-[#00000080]">Duration</span>
                
                {/* Duration Slider */}
                <div className="relative my-4">
                  {/* Custom Slider Track */}
                  <div className="w-full h-1 bg-gray-300 rounded-full relative">
                    <div 
                      className="h-1 bg-red-500 rounded-full"
                      style={{ width: `${((duration - 1) / (30 - 1)) * 100}%` }}
                    ></div>
                    {/* Slider Thumb */}
                    <div 
                      className="absolute w-6 h-6 bg-red-500 rounded-full shadow-lg cursor-pointer transform -translate-y-4 -translate-x-3"
                      style={{ left: `${((duration - 1) / (30 - 1)) * 100}%` }}
                    ></div>
                  </div>
                  
                  {/* Hidden input for functionality */}
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                
                <div className="text-center">
                  <span className="text-lg font-semibold text-gray-900">{duration} Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Proceed Button */}
        <div className="mt-8 max-w-[514px] mx-auto lg:mx-0">
          <button
            onClick={handleProceed}
            className="w-full bg-primary text-white py-4 rounded-xl  text-sm hover:bg-red-600 transition-colors"
          >
            Proceed
          </button>
        </div>
      </div>

      {/* Location Modal */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        onSelectState={handleLocationSelect}
      />
    </div>
  );
};

export default BoostProduct;
