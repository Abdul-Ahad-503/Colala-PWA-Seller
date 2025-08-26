import React, { useState } from "react";
import { Link } from "react-router-dom";
import IMAGES from "../../constants";
import StorePopup from "./StorePopup";
import StoreBuilderPopup from "./StoreBuilderPopup";
import ProfilePage from "../ProfilePage";
import { useDynamicColors } from "../../hooks/useDynamicColors";

const HomePage: React.FC = () => {
  const [isStorePopupOpen, setIsStorePopupOpen] = useState(false);
  const [isStoreBuilderPopupOpen, setIsStoreBuilderPopupOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile'>('profile'); // Start with profile view
  const colors = useDynamicColors();

  const handleViewProfile = () => {
    setCurrentView('dashboard'); // Switch to dashboard when "View Profile" is clicked from ProfilePage
  };

  const handleViewProfileFromDashboard = () => {
    setIsStorePopupOpen(true); // Show store popup when "View Profile" is clicked from dashboard
  };

  const handleClosePopup = () => {
    setIsStorePopupOpen(false);
  };

  const handleStoreBuilder = () => {
    setIsStoreBuilderPopupOpen(true);
  };

  const handleCloseStoreBuilder = () => {
    setIsStoreBuilderPopupOpen(false);
  };

  // Conditionally render profile page or dashboard
  if (currentView === 'profile') {
    return (
      <>
        <ProfilePage onViewProfile={handleViewProfile} />
        
        {/* Store Builder Popup Modal */}
        <StoreBuilderPopup isOpen={isStoreBuilderPopupOpen} onClose={handleCloseStoreBuilder} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom ">
        {/* Store Header Section */}
        <div className=" rounded-lg  overflow-hidden ">
          {/* Cover Image */}
          <div className="w-full h-36  overflow-hidden">
            <img
              src={IMAGES.storeCover}
              alt="Store Cover"
              className="w-full h-full object-cover rounded-[20px]"
            />
          </div>

          {/* Store Profile */}
          <div className="relative px-6 ">
            {/* Profile Picture */}
            <div className="absolute -top-8 left-9">
              <div 
                className="w-16 h-16 rounded-full overflow-hidden"
                style={colors.getPrimaryBg()}
              >
                <img
                  src={IMAGES.sasha}
                  alt="Sasha Stores"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 mb-4">
              <button 
                onClick={handleViewProfileFromDashboard}
                className="bg-black text-white px-5 py-2 rounded-[10px] text-[10px] font-medium"
              >
                View Profile
              </button>
              <button 
                className="text-white px-5 py-2 rounded-[10px] text-[10px] font-medium"
                onClick={handleStoreBuilder}
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
                <img
                  src={IMAGES.sealCheck}
                  alt="Verified"
                  className="w-5 h-5"
                />
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
                  <span className="bg-[#0000FF33] border border-[#0000FF] text-[#0000FF] px-2 py-1 rounded-[5px] text-[10px]">
                    Electronics
                  </span>
                  <span className="bg-[#FF000033] text-[#FF0000] border border-[#FF0000] px-2 py-1 rounded-[5px] text-[10px]">
                    Phones
                  </span>
                </div>
              </div>
            </div>
            {/* Store Stats, Promo, Social, Actions */}
            <div className=" rounded-lg max-w-[495px]">
              {/* Stats */}
              <div className="bg-white rounded-[20px] shadow-xl flex justify-between items-center px-6 py-4 relative  z-10">
                  {/* Qty Sold */}
                  <div className="flex items-center gap-2">
                    <img src={IMAGES.shop} alt="Shop" className="w-6 h-6" />
                    <div>
                      <p className="text-[6px] text-gray-500">Qty Sold</p>
                      <p className="text-sm font-normal text-gray-900">
                        100
                      </p>
                    </div>
                  </div>

                  {/* Followers */}
                  <div className="flex items-center gap-2">
                    <img
                      src={IMAGES.profile}
                      alt="Profile"
                      className="w-6 h-6"
                    />
                    <div>
                      <p className="text-[6px] text-gray-500">Followers</p>
                      <p className="text-sm font-normal text-gray-900">
                        500
                      </p>
                    </div>
                  </div>

                  {/* Ratings */}
                  <div className="flex items-center gap-2">
                    <img
                      src={IMAGES.star}
                      alt="Star"
                      className="w-6 h-6"
                    />
                    <div>
                      <p className="text-[6px] text-gray-500">Ratings</p>
                      <p className="text-sm font-normal text-gray-900">
                        4.7
                      </p>
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

              {/* Social Links */}
              <div className="flex gap-3 my-4">
                <img
                  src={IMAGES.whatsapp}
                  alt="WhatsApp"
                  className="w-11 h-11 cursor-pointer"
                />
                <img
                  src={IMAGES.instagram}
                  alt="Instagram"
                  className="w-11 h-11 cursor-pointer"
                />
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
                <Link 
                  to="/add-service"
                  className="flex-1 bg-black text-white py-4 rounded-[15px] text-xs font-normal text-center block"
                >
                  Add Service
                </Link>
              </div>
            </div>

            {/* Latest Orders */}
            <div>
              <h3 className="text-sm font-medium mb-4">Latest Orders</h3>
              <div className="space-y-4 max-w-[495px]">
                <div className="flex items-center gap-3 bg-white rounded-[15px] p-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <img
                      src={IMAGES.shoppingCartSimple}
                      alt="Order"
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Qamar malik</p>
                    <p className="text-[10px] text-[#00000080]">2 items</p>
                  </div>
                  <p className="font-bold text-primary">₦9,999,990</p>
                </div>

                <div className="flex items-center gap-3 bg-white rounded-[15px] p-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <img
                      src={IMAGES.shoppingCartSimple}
                      alt="Order"
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Adewale Chris</p>
                    <p className="text-[10px] text-[#00000080]">2 items</p>
                  </div>
                  <p className="font-bold text-primary">₦9,999,990</p>
                </div>

                <div className="flex items-center gap-3 bg-white rounded-[15px] p-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <img
                      src={IMAGES.shoppingCartSimple}
                      alt="Order"
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Adam Sandler</p>
                    <p className="text-[10px] text-[#00000080]">2 items</p>
                  </div>
                  <p className="font-bold text-primary">₦9,999,990</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Shop Banner + Management Cards */}
          <div className="flex-1 space-y-6">
            {/* Shop Banner */}
            <div className="bg-[#921313] rounded-2xl pl-5 pr-3 py-3 pt-4 text-white mb-6 relative overflow-hidden">
              <div className="flex  justify-between relative z-10">
                <div className="flex-1">
                  <h3 className="text-white text-[20px] font-semibold ">Shop with ease on 
                    <span className="text-white text-[30px] font-bold italic mb-3 font_Oleo" > Sasha Stores</span>
                  </h3>
                  
                  <p className="text-white text-[10px] opacity-90 mt-7 mb-2 max-w-[170px]">
                    Shop from a variety of Stores for your retail or wholesale
                purposes
                  </p>
                  <button className="bg-white text-red-500 px-6 py-2 rounded-xl font-medium text-sm hover:bg-gray-100 transition-colors">
                    Shop Now
                  </button>
                </div>
                <div className="flex-shrink-0 ">
                  <img
                    src={IMAGES.shoppingBag}
                    alt="Shopping bag with groceries"
                    className="w-50 h-50 object-center -mt-7  absolute right-0"
                  />
                </div>
              </div>
              {/* Background decoration circles */}
              <div className="absolute bottom-0 left-0 w-[267px] h-[199px] bg-[#F22C2C] rounded-full translate-y-29 -translate-x-24"></div>
              <div className="absolute top-0 left-0 w-[267px] h-[199px] bg-[#F22C2C] rounded-full -translate-y-40 -translate-x-35"></div>
            </div>

            {/* Management Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* My Orders */}
              <div className="bg-white rounded-[20px] shadow-sm p-6">
                <div className="flex flex-col items-start mb-4">
                  <div className="w-13 h-13 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <img
                      src={IMAGES.shoppingCartSimple}
                      alt="Orders"
                      className="w-6 h-6"
                    />
                  </div>
                  <h3 className="text-[14px] font-medium text-primary mb-2">My Orders</h3>
                </div>
                <p className="text-[12px] text-[#00000080]">
                  Manage your orders effectively view and monitor every aspect
                  of your customer orders
                </p>
              </div>

              {/* My Products */}
              <div className="bg-white rounded-[20px] shadow-sm p-6">
                <div className="flex flex-col items-start mb-4">
                  <div className="w-13 h-13 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <img
                      src={IMAGES.notepad}
                      alt="Products"
                      className="w-6 h-6"
                    />
                  </div>
                  <h3 className="text-[14px] font-medium text-primary mb-2">My Products</h3>
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
                  <h3 className="text-[14px] font-medium text-primary mb-2">Statistics</h3>
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
                  <h3 className="text-[14px] font-medium text-primary mb-2">Subscription</h3>
                </div>
                <p className="text-[12px] text-[#00000080]">
                  Manage your subscription package here effectively
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Store Popup Modal */}
      <StorePopup isOpen={isStorePopupOpen} onClose={handleClosePopup} />
      
      {/* Store Builder Popup Modal */}
      <StoreBuilderPopup isOpen={isStoreBuilderPopupOpen} onClose={handleCloseStoreBuilder} />
    </div>
  );
};

export default HomePage;
