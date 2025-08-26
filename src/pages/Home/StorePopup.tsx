import React, { useState } from 'react';
import IMAGES from '../../constants';
import ProductCard from '../../components/ProductCard';
import { useDynamicColors } from '../../hooks/useDynamicColors';
import { storeProducts, storeInfo } from './dataset';

interface StorePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper function to get category colors (copied from storedetails)
const getCategoryColor = (category: string) => {
  const colorMap: Record<string, string> = {
    Electronics: "bg-[#0000FF33] text-[#0000FF] border-[#0000FF]",
    Phones: "bg-[#FF000033] text-[#FF0000] border-[#FF0000]",
    Computing: "bg-[#00FFFF33] text-[#00FFFF] border-[#00FFFF]",
    Fashion: "bg-[#FF69B433] text-[#FF69B4] border-[#FF69B4]",
    Clothing: "bg-[#FF69B433] text-[#FF69B4] border-[#FF69B4]",
    Accessories: "bg-[#DDA0DD33] text-[#DDA0DD] border-[#DDA0DD]",
    Beauty: "bg-[#FFB6C133] text-[#FFB6C1] border-[#FFB6C1]",
    Fragrances: "bg-[#E6E6FA33] text-[#E6E6FA] border-[#E6E6FA]",
    Grocery: "bg-[#32CD3233] text-[#32CD32] border-[#32CD32]",
    Food: "bg-[#FFA50033] text-[#FFA500] border-[#FFA500]",
    Home: "bg-[#DEB88733] text-[#DEB887] border-[#DEB887]",
    Furniture: "bg-[#8B451333] text-[#8B4513] border-[#8B4513]",
    Sports: "bg-[#00800033] text-[#008000] border-[#008000]",
    Fitness: "bg-[#FF634733] text-[#FF6347] border-[#FF6347]",
    Gaming: "bg-[#80008033] text-[#800080] border-[#800080]",
  };
  return colorMap[category] || "bg-gray-200 text-gray-700 border-gray-400";
};

const StorePopup: React.FC<StorePopupProps> = ({ isOpen, onClose }) => {
  const colors = useDynamicColors();
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  if (!isOpen) return null;

  const filteredProducts = storeProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-white rounded-3xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden relative pl-16 pr-10">
        {/* Header */}
        <div className="flex items-center justify-center pop_up  p-6 bg-white relative">
          <h2 className="text-2xl font-bold font-decorative">My Store</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 absolute  -right-6 top-3"
          >
            <img src={IMAGES.Xcircle} alt="Close" className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Side - Store Info (copied exact design from storedetails) */}
          <div className="w-[480px]  p-6  overflow-y-auto">
            {/* Store Header Card */}
            <div className="rounded-[20px] overflow-hidden mb-6">
              {/* Store Cover Image */}
              <div className="relative">
                <img
                  src={storeInfo.coverImage}
                  alt={storeInfo.name}
                  className="w-[430px] h-[145px] rounded-[20px] object-center"
                />
                {/* Back Button */}
                <button className="absolute top-4 left-4 w-10 h-10 bg-[#111111CC] backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                {/* Share Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-[#111111CC] backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                </button>
              </div>

              {/* Store Info */}
              <div className="pt-2">
                {/* Store Avatar and Follow Button Row */}
                <div className="flex items-start justify-between mb-4">
                  {/* Left side: Avatar and Status */}
                  <div className="flex items-start space-x-2">
                    {/* Store Avatar */}
                    <div className="relative -mt-10 ml-5">
                      <img
                        src={storeInfo.profileImage}
                        alt={storeInfo.name}
                        className="w-16 h-16 rounded-full object-cover "
                      />
                    </div>
                    {/* Status */}
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${storeInfo.isOpen ? "bg-green-500" : "bg-red-500"}`}></div>
                      <span className={`text-[8px] font-medium ${storeInfo.isOpen ? "text-green-600" : "text-red-600"}`}>
                        {storeInfo.isOpen ? `Open Now - ${storeInfo.openingHours}` : "Closed"}
                      </span>
                    </div>
                  </div>
                  {/* Right side: Follow Button */}
                  <button 
                    className="text-white py-2 px-8 rounded-[10px] text-xs hover:opacity-90 transition-colors"
                    style={colors.getButtonStyle()}
                  >
                    Follow
                  </button>
                </div>

                {/* Store Name and Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <h1 className="text-lg font-bold">{storeInfo.name}</h1>
                  {storeInfo.isVerified && (
                    <img src={IMAGES.sealCheck} alt="Verified" className="w-5 h-5" />
                  )}
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[12px] font-medium">{storeInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-[12px] font-medium">{storeInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-[12px] font-medium">{storeInfo.location} </span>
                    <button className="text-primary text-xs font-medium underline">
                      View Store Addresses
                    </button>
                  </div>
                  <div className="mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="text-sm text-gray-600">Category </span>
                    {storeInfo.categories.map((category, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 text-[10px] rounded-[5px] ml-2 border-[0.5px] ${getCategoryColor(category)}`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats Container */}
                <div className="bg-white rounded-[20px] shadow-xl flex justify-between items-center border border-[#00000040] px-6 py-4 relative  z-10">
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

                {/* Action Buttons */}
                <div className="space-y-2 mt-5">
                  <a
                    href={`tel:${storeInfo.phone}`}
                    className="w-full text-white py-3 rounded-[15px] text-xs hover:opacity-90 transition-colors block text-center"
                    style={colors.getButtonStyle()}
                  >
                    Call
                  </a>
                  <a
                    href={`mailto:${storeInfo.email}`}
                    className="w-full bg-black text-white py-3 rounded-[15px] text-xs hover:bg-gray-800 transition-colors block text-center"
                  >
                    Chat
                  </a>
                  <button className="w-full bg-[#008000] text-white py-3 rounded-[15px] text-xs hover:bg-green-600 transition-colors">
                    Leave a store review
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Products (copied exact design from storedetails) */}
          <div className="flex-1">
            <div className="rounded-2xl p-6 px-2">
              {/* Tabs */}
              <div className="flex gap-6 mb-6">
                <button
                  onClick={() => setActiveTab("products")}
                  className={`px-10 py-4 rounded-lg font-[400] text-[10px] transition-colors ${
                    activeTab === "products"
                      ? "bg-red-500 text-white"
                      : "text-gray-600 bg-white hover:text-gray-900"
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => setActiveTab("services")}
                  className={`px-10 py-4 rounded-lg font-[400] text-[10px] transition-colors ${
                    activeTab === "services"
                      ? "bg-red-500 text-white"
                      : "text-gray-600 bg-white hover:text-gray-900"
                  }`}
                >
                  Services
                </button>
                <button
                  onClick={() => setActiveTab("socialFeed")}
                  className={`px-10 py-4 rounded-lg font-[400] text-[10px] transition-colors ${
                    activeTab === "socialFeed"
                      ? "bg-red-500 text-white"
                      : "text-gray-600 bg-white hover:text-gray-900"
                  }`}
                >
                  Social Feed
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-10 py-4 rounded-lg font-[400] text-[10px] transition-colors ${
                    activeTab === "reviews"
                      ? "bg-red-500 text-white"
                      : "text-gray-600 bg-white hover:text-gray-900"
                  }`}
                >
                  Reviews
                </button>
              </div>

              {/* Search Bar - Only show for products and services tabs */}
              {(activeTab === "products" || activeTab === "services") && (
                <div className="flex gap-3 relative mb-6">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder={`Search store ${activeTab === "services" ? "services" : "products"}`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full border border-[#AFAFAF] rounded-xl p-5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <button
                    onClick={() => setShowFilter(true)}
                    className="border border-[#AFAFAF] hover:bg-gray-200 transition-colors rounded-xl px-[30px] py-[18px] flex items-center justify-center"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Content Area */}
              <div className="overflow-y-auto" style={{ height: "calc(90vh - 300px)" }}>
                {activeTab === "products" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="relative">
                        
                        <ProductCard
                          product={product}
                          onAddToCart={(id) => console.log(`Added product ${id} to cart`)}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "services" && (
                  <div className="text-center py-20">
                    <p className="text-gray-500">Services content coming soon...</p>
                  </div>
                )}

                {activeTab === "socialFeed" && (
                  <div className="text-center py-20">
                    <p className="text-gray-500">Social feed content coming soon...</p>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="text-center py-20">
                    <p className="text-gray-500">Reviews content coming soon...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePopup;
