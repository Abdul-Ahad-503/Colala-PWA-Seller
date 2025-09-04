import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import IMAGES from "../../constants";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => console.log("Logging out...");
  const handleDeleteAccount = () => console.log("Deleting account...");

  // Helper function to check if a route is active
  const isActive = (path: string) => location.pathname === `/settings/${path}`;

  // Redirect base /settings to edit-profile once mounted
  useEffect(() => {
    if (location.pathname === "/settings") navigate("/settings/My-Products", { replace: true });
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-[1080px] mx-auto flex pt-8">
        {/* Left Sidebar */}
        <div className="w-[390px] rounded-3xl  flex flex-col gap-3 text-gray-900">
          {/* Profile section */}
            <div className="flex items-center gap-2 pl-2 cursor-pointer">
              <img src={IMAGES.sasha} alt="User Icon" className="w-15 h-15" />
              <div className="flex flex-col leading-tight">
                <span className="font-medium text-sm">Sasha Store</span>
                <span className="text-[10px]">Lagos, Nigeria</span>
              </div>
            </div>

            <div className="flex flex-col items-center ">
              <div className="flex bg-[#E53E3E] rounded-2xl px-2 gap-4 w-full justify-center py-2 mb-2">
                <div className="flex-1 flex items-center py-2 mx-1">
                  <span className="text-[8px] font-normal text-[#FFFFFF80]">
                    Escrow Wallet <span className="text-sm font-bold text-white">₦50,000</span>
                  </span>
                  <button className="bg-white text-[#000000] rounded-[10px] px-3 py-1 text-xs cursor-pointer mt-1">View</button>
                </div>
                <span className="w-[2px] h-11 self-center bg-[#CDCDCD]"></span>
                <div className="flex-1 flex items-center py-2 mx-1">
                  <span className="text-[8px] font-light text-[#FFFFFF80]">
                    Shopping Wallet <span className="text-sm font-bold text-white">₦50,000</span>
                  </span>
                  <button 
                    onClick={() => navigate('/settings/shopping-wallet')}
                    className="bg-white text-[#000000] rounded-[10px] px-3 py-1 cursor-pointer text-xs mt-1"
                  >
                    View
                  </button>
                </div>
              </div>
              <button onClick={() => navigate('/createstore')} className="bg-[#E53E3E] text-white rounded-xl w-full py-4 px-6 cursor-pointer font-normal text-sm ">Edit Profile</button>
            </div>

            <div className="flex flex-col gap-2">
              <button onClick={() => navigate('/settings/My-Products')} className="flex items-center bg-[#E53E3E] rounded-2xl px-0 cursor-pointer shadow-sm relative text-left w-full">
                <span className={`flex items-center justify-center w-13 ${isActive('My-Products') ? 'h-15' : 'h-13'} bg-[#E53E3E] rounded-l-xl`}>
                  <img src={IMAGES.cart} alt="My Products" className="w-7 h-7" />
                </span>
                <div className="pl-4 bg-white hover:bg-[#e0dfdf] w-full py-4 border border-[#F2F2F2] rounded-2xl font-semibold">My Products</div>
              </button>
              <button onClick={() => navigate('/settings/analytics')} className="flex items-center bg-[#E53EE2] rounded-2xl px-0 cursor-pointer shadow-sm relative text-left">
                <span className={`flex items-center justify-center ${isActive('analytics') ? 'w-15 h-15' : 'w-14 h-14'} bg-[#E53EE2] rounded-l-xl`}>
                  <img src={IMAGES.ChartLineUpWhite} alt="Analytics" className="w-7 h-7" />
                </span>
                <div className="pl-4 bg-white hover:bg-[#e0dfdf] w-full py-4 border border-[#F2F2F2] rounded-2xl font-semibold">Analytics</div>
              </button>
              <button onClick={() => navigate('/settings/subscriptions')} className="flex items-center bg-[#62e53e] rounded-2xl px-0 cursor-pointer shadow-sm relative text-left w-full">
                <span className={`flex items-center justify-center ${isActive('subscriptions') ? 'w-15 h-15' : 'w-14 h-14'} bg-[#62e53e] rounded-l-xl`}>
                  <img src={IMAGES.ShieldCheckWhite} alt="Subscriptions" className="w-7 h-7" />
                </span>
                <div className="pl-4 bg-white hover:bg-[#e0dfdf] w-full py-4 border border-[#F2F2F2] rounded-2xl font-semibold relative">
                  Subscriptions
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#62E53E] text-white text-[10px] px-2 py-1 rounded-l font-normal"> <img src={IMAGES.ShieldCheckWhite} className="w-3 h-3 inline" alt="" /> Subscription Active</span>
                </div>
              </button>
              <button onClick={() => navigate('/settings/promoted-products')} className="flex items-center bg-[#3EC9E5] rounded-2xl px-0 cursor-pointer shadow-sm relative text-left w-full">
                <span className={`flex items-center justify-center ${isActive('promoted-products') ? 'w-15 h-15' : 'w-14 h-14'} bg-[#3EC9E5] rounded-l-xl`}>
                  <img src={IMAGES.ChartLineUpWhite} alt="Promoted Products" className="w-7 h-7" />
                </span>
                <div className="pl-4 bg-white hover:bg-[#e0dfdf] w-full py-4 border border-[#F2F2F2] rounded-2xl font-semibold">Promoted Products</div>
              </button>
              <button onClick={() => navigate('/settings/manage-coupons')} className="flex items-center bg-[#E5863E] rounded-2xl px-0 cursor-pointer shadow-sm relative text-left w-full">
                <span className={`flex items-center justify-center ${isActive('manage-coupons') ? 'w-15 h-15' : 'w-14 h-14'} bg-[#E5863E] rounded-l-xl`}>
                  <img src={IMAGES.sealPercent} alt="Manage Coupons" className="w-7 h-7" />
                </span>
                <div className="pl-4 bg-white hover:bg-[#e0dfdf] w-full py-4 border border-[#F2F2F2] rounded-2xl font-semibold">Manage Coupons/Points</div>
              </button>
              <button onClick={() => navigate('/settings/announcements')} className="flex items-center bg-[#4c7ee5] rounded-2xl px-0 cursor-pointer shadow-sm relative text-left w-full">
                <span className={`flex items-center justify-center ${isActive('announcements') ? 'w-15 h-15' : 'w-14 h-14'} bg-[#4c7ee5] rounded-l-xl`}>
                  <img src={IMAGES.megaphone} alt="Announcements" className="w-7 h-7" />
                </span>
                <div className="pl-4 bg-white hover:bg-[#e0dfdf] w-full py-4 border border-[#F2F2F2] rounded-2xl font-semibold">Announcements</div>
              </button>
              <button onClick={() => navigate('/settings/reviews')} className="flex items-center bg-[#E53E3E] rounded-2xl px-0 cursor-pointer shadow-sm relative text-left w-full">
                <span className={`flex items-center justify-center ${isActive('reviews') ? 'w-15 h-15' : 'w-14 h-14'} bg-[#E53E3E] rounded-l-xl`}>
                  <img src={IMAGES.StarWhite} alt="Reviews" className="w-7 h-7" />
                </span>
                <div className="pl-4 bg-white hover:bg-[#e0dfdf] w-full py-4 border border-[#F2F2F2] rounded-2xl font-semibold">Reviews</div>
              </button>
              <button onClick={() => navigate('/settings/referrals')} className="flex items-center bg-[#6c3ee5] rounded-2xl px-0 cursor-pointer shadow-sm relative text-left w-full">
                <span className={`flex items-center justify-center ${isActive('referrals') ? 'w-15 h-15' : 'w-14 h-14'} bg-[#6c3ee5] rounded-l-xl`}>
                  <img src={IMAGES.Users} alt="Referrals" className="w-7 h-7" />
                </span>
                <div className="pl-4 bg-white hover:bg-[#e0dfdf] w-full py-4 border border-[#F2F2F2] rounded-2xl font-semibold">Referrals</div>
              </button>
              <button onClick={() => navigate('/settings/support')} className="flex items-center bg-[#E5863E] rounded-2xl px-0 cursor-pointer shadow-sm relative text-left w-full">
                <span className={`flex items-center justify-center ${isActive('support') ? 'w-15 h-15' : 'w-14 h-14'} bg-[#E5863E] rounded-l-xl`}>
                  <img src={IMAGES.Headset} alt="Support" className="w-7 h-7" />
                </span>
                <div className="pl-4 bg-white hover:bg-[#e0dfdf] w-full py-4 border border-[#F2F2F2] rounded-2xl font-semibold">Support</div>
              </button>
              <button onClick={() => navigate('/settings/faqs')} className="flex items-center bg-[#3EC9E5] rounded-2xl px-0 cursor-pointer shadow-sm relative text-left w-full">
                <span className={`flex items-center justify-center ${isActive('faqs') ? 'w-15 h-15' : 'w-14 h-14'} bg-[#3EC9E5] rounded-l-xl`}>
                  <img src={IMAGES.Question} alt="FAQs" className="w-7 h-7" />
                </span>
                <div className="pl-4 bg-white hover:bg-[#e0dfdf] w-full py-4 border border-[#F2F2F2] rounded-2xl font-semibold">FAQs</div>
              </button>
            </div>

            <div className="mt-4">
              <div className="text-sm text-gray-900 mb-2">Others</div>
              <button onClick={() => navigate('/settings/seller-leaderboard')} className={`flex items-center bg-white hover:bg-[#e0dfdf] rounded-xl px-4 pl-2 py-3 shadow-sm mb-2 relative w-full cursor-pointer text-left ${isActive('seller-leaderboard') ? 'border-2 border-[#E53E3E]' : 'border border-gray-100'}`}>
                <span className="flex items-center justify-center w-13 h-9 rounded-l-xl">
                  <img src={IMAGES.Ranking} alt="Seller Leaderboard" className="w-7 h-7" />
                </span>
                <div>Seller Leaderboard</div>
              </button>
              <button onClick={() => navigate('/settings/saved-cards')} className={`flex items-center bg-white hover:bg-[#e0dfdf] rounded-xl px-4 pl-2 py-3 shadow-sm mb-2 relative w-full cursor-pointer text-left ${isActive('saved-cards') ? 'border-2 border-[#E53E3E]' : 'border border-gray-100'}`}>
                <span className="flex items-center justify-center w-13 h-9 rounded-l-xl">
                  <img src={IMAGES.CreditCard} alt="Saved Cards" className="w-7 h-7" />
                </span>
                <div>Saved Cards</div>
              </button>
              <button onClick={() => navigate('/settings/account-access-control')} className={`flex items-center bg-white hover:bg-[#e0dfdf] rounded-xl px-4 pl-2 py-3 shadow-sm mb-2 relative w-full cursor-pointer text-left ${isActive('account-access-control') ? 'border-2 border-[#E53E3E]' : 'border border-gray-100'}`}>
                <span className="flex items-center justify-center w-13 h-9 rounded-l-xl">
                  <img src={IMAGES.LockKey} alt="Account Access Control" className="w-7 h-7" />
                </span>
                <div>Account Access Control</div>
              </button>
              <button onClick={handleLogout} className="text-[#E53E3E] text-left  bg-white hover:bg-[#e0dfdf] rounded-xl border border-gray-100 px-4 pl-2 py-4 shadow-sm mb-2 font-semibold text-sm flex  w-full cursor-pointer">
                <span><img src={IMAGES.SignOut} alt="" className="w-5 h-5 mr-3" /></span>
                Logout
              </button>
              <button onClick={handleDeleteAccount} className="text-gray-400  bg-white hover:bg-[#e0dfdf] rounded-xl border border-gray-100 px-4 pl-2 py-4 shadow-sm mb-2 text-center  w-full cursor-pointer">Delete Account</button>
            </div>
        </div>
        {/* Right panel */}
        <div className="flex-1 p-0 ml-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Settings;
