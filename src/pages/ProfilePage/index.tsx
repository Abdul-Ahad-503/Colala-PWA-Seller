import React from 'react';
import { Link } from 'react-router-dom';
import IMAGES from '../../constants';
import { useDynamicColors } from '../../hooks/useDynamicColors';

interface ProfilePageProps {
  onViewProfile: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onViewProfile }) => {
  const colors = useDynamicColors();

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom">
        {/* Store Header Section */}
        <div className="rounded-lg overflow-hidden">
          {/* Cover Image */}
          <div className="w-full h-36 overflow-hidden">
            <div className="w-full h-full bg-gray-200 rounded-[20px] flex items-center justify-center">
              <img
                src={IMAGES.image}
                alt="Add Cover"
                className="w-12 h-12 opacity-50"
              />
            </div>
          </div>

          {/* Store Profile */}
          <div className="relative px-6">
            {/* Profile Picture */}
            <div className="absolute -top-8 left-9">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={IMAGES.image}
                  alt="Add Profile"
                  className="w-8 h-8 opacity-50"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 mb-4">
              <button 
                onClick={onViewProfile}
                className="bg-black text-white px-5 py-2 rounded-[10px] text-[10px] font-medium"
              >
                View Profile
              </button>
              <button 
                className="text-white px-5 py-2 rounded-[10px] text-[10px] font-medium"
                style={colors.getButtonStyle()}
              >
                Store Builder
              </button>
            </div>

            {/* Store Info */}
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="flex gap-6">
          {/* Left Section - Store Info + Latest Orders */}
          <div className="w-[495px] space-y-6">
            <div className="">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-xl font-bold text-text-primary">
                  Sasha Stores
                </h1>
              </div>

              <div className="space-y-1 text-xs text-black mb-4">
                <div className="flex items-center gap-2">
                  <img src={IMAGES.envelope} alt="Email" className="w-4 h-4" />
                  <span>sashastores@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={IMAGES.phone} alt="Phone" className="w-4 h-4" />
                  <span>07012345678</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={IMAGES.mapPin} alt="Location" className="w-4 h-4" />
                  <span>Lagos, Nigeria</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={IMAGES.phone} alt="Phone" className="w-4 h-4" />
                  <span>Category</span>
                  <button 
                    className="text-[10px] px-2 py-1 rounded-[5px] font-medium"
                    style={colors.getPrimaryText()}
                  >
                    Add New
                  </button>
                </div>
              </div>

              {/* Store Stats */}
              <div className="flex gap-8 mb-6">
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <img src={IMAGES.user} alt="Followers" className="w-4 h-4" />
                    <span className="text-[12px] text-gray-600">11</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <img src={IMAGES.user} alt="Following" className="w-4 h-4" />
                    <span className="text-[12px] text-gray-600">8</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <img src={IMAGES.star} alt="Likes" className="w-4 h-4" />
                    <span className="text-[12px] text-gray-600">343</span>
                  </div>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-3 mb-6">
                <img
                  src={IMAGES.x}
                  alt="X"
                  className="w-11 h-11 cursor-pointer"
                />
                <img
                  src={IMAGES.facebook}
                  alt="Facebook"
                  className="w-11 h-11 cursor-pointer"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Link 
                  to="/add-product"
                  className="flex-1 text-white py-4 rounded-[15px] text-xs font-normal text-center block"
                  style={colors.getButtonStyle()}
                >
                  Add Product
                </Link>
                <button className="flex-1 bg-gray-600 text-white py-4 rounded-[15px] text-xs font-normal">
                  Add Service
                </button>
              </div>
            </div>

            {/* Store Setup Banner with promo style */}
            <div className="bg-white rounded-[20px] shadow-sm relative overflow-hidden">
              <div className="p-6 pb-0">
                <h3 className="font-medium text-black mb-2">
                  Finish creating your store to start selling and reaching
                </h3>
                <p className="text-black mb-4">out wide range of audience</p>
                <div className="flex items-center justify-between mb-4">
                  <button 
                    className="bg-white border text-xs px-4 py-2 rounded-[10px] font-medium"
                    style={{
                      ...colors.getPrimaryText(),
                      ...colors.getPrimaryBorder()
                    }}
                  >
                    Create Store
                  </button>
                  <div className="text-right">
                    <div className="text-xs text-gray-600 mb-1">Recent page completion (70%)</div>
                    <div className="w-16 h-1 bg-gray-200 rounded-full">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          width: '70%',
                          ...colors.getPrimaryBg()
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Promo Banner */}
              <div 
                className="text-white rounded-b-[20px] py-2 -mt-4 z-0 shadow-md"
                style={colors.getPrimaryBg()}
              >
                <div className="flex items-center pt-3 px-4 gap-2">
                  <img
                    src={IMAGES.megaphone}
                    alt="Megaphone"
                    className="w-3 h-3"
                  />
                  <p className="text-[10px] font-normal">
                    Product sales going on from Sept 7 - Oct 30
                  </p>
                </div>
              </div>
            </div>

            {/* Latest Orders */}
            <div className="bg-white rounded-[20px] shadow-sm p-6">
              <h2 className="text-sm font-medium mb-3 text-black">Latest Orders</h2>
              <p className="text-xs text-gray-500 text-center py-8">No orders yet</p>
            </div>
          </div>

          {/* Right Section - Promotional Banner + Management Cards */}
          <div className="flex-1 space-y-6">
            {/* Promotional Banner */}
            <div className="bg-gray-100 rounded-[20px] p-6 text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <img
                  src={IMAGES.image}
                  alt="Add Banner"
                  className="w-8 h-8 opacity-50"
                />
              </div>
              <p className="text-sm text-gray-600 mb-3">Your promotional banners appear here</p>
              <p className="text-xs text-gray-500 mb-4">Complete your store setup to proceed</p>
              <button 
                className="text-white text-xs px-6 py-2 rounded-[10px] font-medium"
                style={colors.getButtonStyle()}
              >
                Proceed
              </button>
            </div>

            {/* Management Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* My Orders */}
              <div className="bg-white rounded-[20px] shadow-sm p-6">
                <div className="flex flex-col items-start mb-4">
                  <div className="w-13 h-13 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <img
                      src={IMAGES.shoppingCart}
                      alt="Orders"
                      className="w-6 h-6"
                    />
                  </div>
                  <h3 
                    className="text-[14px] font-medium mb-2"
                    style={colors.getPrimaryText()}
                  >
                    My Orders
                  </h3>
                </div>
                <p className="text-[12px] text-[#00000080]">
                  Manage your orders effectively, view and monitor every aspect of your customer orders
                </p>
              </div>

              {/* My Products */}
              <div className="bg-white rounded-[20px] shadow-sm p-6">
                <div className="flex flex-col items-start mb-4">
                  <div className="w-13 h-13 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <img
                      src={IMAGES.shoppingBag}
                      alt="Products"
                      className="w-6 h-6"
                    />
                  </div>
                  <h3 
                    className="text-[14px] font-medium mb-2"
                    style={colors.getPrimaryText()}
                  >
                    My Products
                  </h3>
                </div>
                <p className="text-[12px] text-[#00000080]">
                  This is home for all your products manage everything here
                </p>
              </div>

              {/* Statistics */}
              <div className="bg-white rounded-[20px] shadow-sm p-6">
                <div className="flex flex-col items-start mb-4">
                  <div className="w-13 h-13 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <img
                      src={IMAGES.chartBar}
                      alt="Statistics"
                      className="w-6 h-6"
                    />
                  </div>
                  <h3 
                    className="text-[14px] font-medium mb-2"
                    style={colors.getPrimaryText()}
                  >
                    Statistics
                  </h3>
                </div>
                <p className="text-[12px] text-[#00000080]">
                  View detailed statistics for all your products
                </p>
              </div>

              {/* Subscription */}
              <div className="bg-white rounded-[20px] shadow-sm p-6">
                <div className="flex flex-col items-start mb-4">
                  <div className="w-13 h-13 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <img
                      src={IMAGES.shieldCheck}
                      alt="Subscription"
                      className="w-6 h-6"
                    />
                  </div>
                  <h3 
                    className="text-[14px] font-medium mb-2"
                    style={colors.getPrimaryText()}
                  >
                    Subscription
                  </h3>
                </div>
                <p className="text-[12px] text-[#00000080]">
                  Manage your subscription package here effectively
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
