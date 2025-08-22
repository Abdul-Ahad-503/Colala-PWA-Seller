import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import IMAGES from "../constants";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount] = useState(0);
  const location = useLocation();

  // Get active page based on current location
  const getActivePage = () => {
    const path = location.pathname;
    if (path === "/" || path === "/home") return "home";
    if (path === "/feed") return "feed";
    if (path === "/chat") return "chat";
    if (path === "/orders") return "orders";
    if (path === "/settings") return "settings";

    return "";
  };

  const activePage = getActivePage();

  return (
    <header className="bg-primary text-white rounded-b-3xl overflow-hidden">
      {/* Main Header Bar */}
      <div className="container-custom">
        <div className="flex items-center justify-between ">
          {/* Logo */}
          <div className="">
            <img 
              src={IMAGES.logo} 
              alt="Colala Mall" 
              className="w-34 h-34 -mt-5 "
            />
            
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search any product, shop or category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm  p-5 pr-12 rounded-[15px] bg-white text-gray-800 placeholder-gray-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
                <img 
                  src={IMAGES.camera} 
                  alt="Camera" 
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>

          {/* Right Side - Account and Cart */}
          <div className="flex items-center gap-6">
            {/* Account Section */}
            <div className="flex items-center gap-3">
              <div className=" flex items-center justify-center">
                <img 
                  src={IMAGES.user} 
                  alt="User" 
                  className="w-[30px] h-[30px]"
                />
              </div>
              <div className="">
                <div className="text-sm text-white text-opacity-90">Hi Sasha Stores</div>
                <div className="text-[16px] font-semibold">Account</div>
              </div>
            </div>

            {/* Cart */}
            <div className="relative">
              <button className="flex items-center gap-2  px-4 py-2 ">
                <img 
                  src={IMAGES.cart} 
                  alt="Shopping Cart" 
                  className="w-[30px] h-[30px]"
                />
                <div>
                  <div className="text-[10px] bg-white px-3 rounded-[5px] text-black ">{cartCount}</div>
                <div className="text-[10px]">Cart</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="text-white">
        <div className="container-custom">
          <nav className="flex items-center">
            {/* Store Name */}
            <div className="py-4 pr-8">
              <h2 className="text-3xl font_Oleo font-bold text-white">
                Sasha Stores
              </h2>
            </div>

            {/* Navigation Links */}
            <div className="flex gap-24 text-[16px] text-[#FFFFFFB2] px-7">
          
          <Link to="/">
            <h3 className={`pb-4 ${getActivePage() === "home" ? "active_page" : ""}`}>
              Home <div className="underline" />
            </h3>
          </Link>
          <Link to="/feed">
            <h3 className={`pb-4 ${getActivePage() === "feed" ? "active_page" : ""}`}>
              Feed <div className="underline" />
            </h3>
          </Link>
          <Link to="/chat">
            <h3 className={`pb-4 ${getActivePage() === "chat" ? "active_page" : ""}`}>
              Chat <div className="underline" />
            </h3>
          </Link>
          <Link to="/orders">
            <h3 className={`pb-4 ${getActivePage() === "orders" ? "active_page" : ""}`}>
              Orders <div className="underline" />
            </h3>
          </Link>
          <Link to="/settings">
            <h3 className={`pb-4 ${getActivePage() === "settings" ? "active_page" : ""}`}>
              Settings <div className="underline" />
            </h3>
          </Link>
        </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;