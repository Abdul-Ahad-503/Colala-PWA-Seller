import React, { useState } from "react";
import IMAGES from "../../constants";

const Referrals: React.FC = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(3); // FAQ 4 is expanded by default
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCommission, setSelectedCommission] = useState("");
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const [showTransferPopup, setShowTransferPopup] = useState(false);
  const [showTransferSuccess, setShowTransferSuccess] = useState(false);
  const [transferredAmount, setTransferredAmount] = useState("");
  const [withdrawalForm, setWithdrawalForm] = useState({
    amount: "",
    accountNumber: "",
    bankName: "",
    accountName: "",
    saveDetails: false
  });
  const [transferForm, setTransferForm] = useState({
    amount: ""
  });

  // Sample products data for search tab
  const products = [
    {
      id: 1,
      name: "Dell Inspiron Laptop",
      price: "N2,000,000",
      commission: "5%",
      store: "Sasha Stores",
      storeAvatar: IMAGES.sasha,
      image: IMAGES.top1,
    },
    {
      id: 2,
      name: "Dell Inspiron Laptop",
      price: "N2,000,000",
      commission: "5%",
      store: "Sasha Stores",
      storeAvatar: IMAGES.sasha,
      image: IMAGES.top2,
    },
    {
      id: 3,
      name: "Dell Inspiron Laptop",
      price: "N2,000,000",
      commission: "5%",
      store: "Sasha Stores",
      storeAvatar: IMAGES.sasha,
      image: IMAGES.top3,
    },
    {
      id: 4,
      name: "Dell Inspiron Laptop",
      price: "N2,000,000",
      commission: "5%",
      store: "Sasha Stores",
      storeAvatar: IMAGES.sasha,
      image: IMAGES.top4,
    },
    {
      id: 5,
      name: "Dell Inspiron Laptop",
      price: "N2,000,000",
      commission: "5%",
      store: "Sasha Stores",
      storeAvatar: IMAGES.sasha,
      image: IMAGES.top5,
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "Question 1",
      answer: "Answer for question 1 goes here...",
    },
    {
      id: 2,
      question: "Question 2",
      answer: "Answer for question 2 goes here...",
    },
    {
      id: 3,
      question: "Question 3",
      answer: "Answer for question 3 goes here...",
    },
    {
      id: 4,
      question: "How to earn on Colala ?",
      answer:
        "You can earn on colala easily by referring your friends, you get a referral bonus once they make a purchase",
    },
  ];

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText("QERDEQWE");
    // You could add a toast notification here
  };

  return (
    <div className="flex-1 p-8 bg-white rounded-[20px]">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Referrals</h1>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("wallet")}
            className={`px-8 py-3 w-full rounded-lg  text-[10px] transition-colors ${
              activeTab === "wallet"
                ? "bg-[#E53E3E] text-white"
                : " text-gray-600 hover:bg-gray-200"
            }`}
          >
            Wallet
          </button>
          <button
            onClick={() => setActiveTab("faqs")}
            className={`px-8 py-3 w-full rounded-lg  text-[10px] transition-colors ${
              activeTab === "faqs"
                ? "bg-[#E53E3E] text-white"
                : " text-gray-600 hover:bg-gray-200"
            }`}
          >
            FAQs
          </button>
          <button
            onClick={() => setActiveTab("search")}
            className={`px-8 py-3 w-full rounded-lg  text-[10px] transition-colors ${
              activeTab === "search"
                ? "bg-[#E53E3E] text-white"
                : " text-gray-600 hover:bg-gray-200"
            }`}
          >
            Search
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "wallet" && (
          <>
            {/* Referral Earnings Card */}
            <div className="bg-gradient-to-r from-[#E90F0F] to-[#BD0F7B] rounded-3xl px-6 py-5 mb-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="mb-2">
                  <span className="text-[12px] opacity-90">
                    Referral Earnings
                  </span>
                </div>
                <div className="text-4xl font-bold mb-6">N35,000</div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs opacity-90 mb-1">
                      No of referrals
                    </div>
                    <div className="text-xl font-bold">20</div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowWithdrawPopup(true)}
                      className="bg-white bg-opacity-20 text-black px-6 py-2 rounded-full text-[10px]  hover:bg-opacity-30 transition-all"
                    >
                      Withdraw
                    </button>
                    <button 
                      onClick={() => setShowTransferPopup(true)}
                      className="bg-white bg-opacity-20 text-black px-6 py-2 rounded-full text-[10px]  hover:bg-opacity-30 transition-all"
                    >
                      Transfer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Referral Code Section */}
            <div className=" rounded-2xl px-4  mb-8 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="text-[10px] text-gray-600 mb-1 block">
                    Referral Code
                  </label>
                  <div className="text-sm  text-gray-900">QERDEQWE</div>
                </div>
                <button
                  onClick={copyReferralCode}
                  className=" p-3 rounded-lg cursor-pointer "
                >
                  <svg
                    className="w-8 h-8 hover:scale-[1.1] text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Refer and Earn Section */}
            <div className="mb-8">
              <h2 className="text-sm font-bold text-[#E53E3E] mb-4">
                Refer and Earn on Colala
              </h2>
              <p className=" mb-6 text-sm">
                Refer your friends and unlock exclusive rewards. The more
                friends you bring in, the more you earn.
              </p>

              {/* Steps */}
              <div className="">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#E53E3E] font-bold text-sm">1</span>
                  </div>
                  <div className="pt-1">
                    <p className=" font-normal text-xs">
                      Invite a friend with your referral code for them to
                    </p>
                    <p className=" font-normal text-xs">
                      get a one time referral bonus
                    </p>
                  </div>
                </div>

                {/* Connecting Line */}
                <div className="ml-5 w-px h-8  bg-gray-200"></div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#E53E3E] font-bold text-sm">2</span>
                  </div>
                  <div className="pt-1">
                    <p className="font-normal text-xs">
                      Referral completes an order
                    </p>
                  </div>
                </div>

                {/* Connecting Line */}
                <div className="ml-5 w-px h-6 bg-gray-200"></div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#E53E3E] font-bold text-sm">3</span>
                  </div>
                  <div className="pt-1">
                    <p className="font-normal text-xs">
                      Get commissions on their orders
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "faqs" && (
          <>
            {/* FAQs Image Header */}
            <div className="rounded-3xl overflow-hidden mb-8 relative">
              <img
                src={IMAGES.faqsImage}
                alt="FAQ Image"
                className="w-full h-64 object-cover"
              />
              {/* Video Play Button */}
            </div>

            {/* Referral FAQs */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Referral FAQs
              </h2>

              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">
                        {faq.question}
                      </span>
                      <div className="flex-shrink-0">
                        {expandedFAQ === faq.id ? (
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        )}
                      </div>
                    </button>

                    {expandedFAQ === faq.id && (
                      <div className="px-6 pb-4 text-gray-700 text-sm border-t border-gray-100">
                        <div className="pt-4">{faq.answer}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "search" && (
          <>
            {/* Search Input */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Product"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53E3E] focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex gap-4 mb-8">
              <div className="flex-1">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53E3E] focus:border-transparent bg-white"
                >
                  <option value="">Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="laptops">Laptops</option>
                  <option value="phones">Phones</option>
                </select>
              </div>
              <div className="flex-1">
                <select
                  value={selectedCommission}
                  onChange={(e) => setSelectedCommission(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53E3E] focus:border-transparent bg-white"
                >
                  <option value="">Commission</option>
                  <option value="3">3%</option>
                  <option value="5">5%</option>
                  <option value="10">10%</option>
                </select>
              </div>
            </div>

            {/* Products List */}
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-[20px]"
                >
                  <div className="flex  ">
                    {/* Left Side - Product Image and Store Info */}
                    <div className="flex-shrink-0">
                      {/* Product Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-26 h-26 rounded-l-[20px] object-cover"
                      />

                      {/* Store name and rating */}
                      <div className="flex items-center justify-between -mt-[18px] relative rounded-bl-[20px] py-[2px] p-2 bg-[#F2F2F2] ">
                        <div className="flex items-center space-x-2">
                          <img
                            src={IMAGES.sasha}
                            alt="store"
                            className="w-[14px] h-[14px] rounded-full"
                          />
                          <span className="text-red-500 text-[8px] ">
                            {product.store}
                          </span>
                        </div>

                        
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 p-3">
                      <h3 className="font-medium  text-sm mb-1">
                        {product.name}
                      </h3>
                      <p className="text-[#E53E3E] font-bold text-xs mb-6">
                        {product.price}
                      </p>
                      <p className="text-gray-600 text-xs">
                        Commission :{" "}
                        <span className="text-gray-900 font-semibold">
                          {product.commission}
                        </span>
                      </p>
                    </div>

                    {/* Copy Link Button */}
                    <div className="flex-shrink-0 self-end mb-3 mr-5">
                      <button className="bg-[#E53E3E] text-white px-4 py-2 rounded-lg text-[10px] cursor-pointer hover:bg-red-700 transition-colors">
                        Copy link
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Withdrawal Popup */}
      {showWithdrawPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
          <div className="bg-[#F9F9F9] rounded-3xl w-[430px] max-w-full p-6 shadow-2xl relative">
            {/* Close Button */}
            <button 
              onClick={() => setShowWithdrawPopup(false)}
              className="absolute top-4 right-4 cursor-pointer hover:opacity-70"
            >
              <img src={IMAGES.xCircle} alt="Close" className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="text-center mb-6 pop_up">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Withdraw</h2>
            </div>

            {/* Form */}
            <form className="space-y-4">
              {/* Amount to withdraw */}
              <div>
                <input
                  type="text"
                  placeholder="Amount to withdraw"
                  value={withdrawalForm.amount}
                  onChange={(e) => setWithdrawalForm({...withdrawalForm, amount: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-[15px] text-sm px-4 py-5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Account Number */}
              <div>
                <input
                  type="text"
                  placeholder="Account Number"
                  value={withdrawalForm.accountNumber}
                  onChange={(e) => setWithdrawalForm({...withdrawalForm, accountNumber: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-[15px] text-sm px-4 py-5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Bank Name */}
              <div>
                <input
                  type="text"
                  placeholder="Bank Name"
                  value={withdrawalForm.bankName}
                  onChange={(e) => setWithdrawalForm({...withdrawalForm, bankName: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-[15px] text-sm px-4 py-5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Account Name */}
              <div>
                <input
                  type="text"
                  placeholder="Account Name"
                  value={withdrawalForm.accountName}
                  onChange={(e) => setWithdrawalForm({...withdrawalForm, accountName: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-[15px] text-sm px-4 py-5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Save account details checkbox */}
              <div className="flex items-center space-x-3 pt-2 ml-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveDetails"
                    checked={withdrawalForm.saveDetails}
                    onChange={(e) => setWithdrawalForm({...withdrawalForm, saveDetails: e.target.checked})}
                    className="w-4 h-4 text-[#E53E3E] bg-white border-gray-300 rounded focus:ring-[#E53E3E] cursor-pointer accent-[#E53E3E]"
                  />
                  
                </div>
                <label htmlFor="saveDetails" className="text-sm text-gray-700 cursor-pointer">
                  Save account details
                </label>
              </div>

              {/* Process Withdrawal Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#E53E3E] text-white py-5 rounded-lg text-sm hover:bg-red-600 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle withdrawal processing here
                    setShowWithdrawPopup(false);
                  }}
                >
                  Process Withdrawal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transfer Popup */}
      {showTransferPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
          <div className="bg-[#F9F9F9] rounded-3xl w-[400px] max-w-full p-6 shadow-2xl relative">
            {/* Close Button */}
            <button 
              onClick={() => setShowTransferPopup(false)}
              className="absolute top-4 right-4 cursor-pointer hover:opacity-70"
            >
              <img src={IMAGES.xCircle} alt="Close" className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="text-center mb-6 pop_up">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Transfer</h2>
            </div>

            {/* Form */}
            <form className="space-y-4">
              {/* Amount to transfer */}
              <div>
                <input
                  type="text"
                  placeholder="Amount to transfer"
                  value={transferForm.amount}
                  onChange={(e) => setTransferForm({...transferForm, amount: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Process Transfer Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#E53E3E] text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle transfer processing here
                    setTransferredAmount(transferForm.amount);
                    setShowTransferPopup(false);
                    setShowTransferSuccess(true);
                  }}
                >
                  Process Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transfer Success Popup */}
      {showTransferSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
          <div className="bg-[#F9F9F9] rounded-3xl w-[400px] max-w-full p-8 shadow-2xl relative">
            {/* Success Icon */}
            <div className="text-center mb-6 pop_up">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Success Message */}
              <p className="text-gray-700 text-center mb-6">
                You have successfully transferred <span className="font-bold text-gray-900">{transferredAmount}</span> to your shopping wallet
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowTransferSuccess(false);
                  setTransferForm({amount: ""});
                  setTransferredAmount("");
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowTransferSuccess(false);
                  setTransferForm({amount: ""});
                  setTransferredAmount("");
                  // Navigate to wallet - you can add navigation logic here
                }}
                className="flex-1 bg-[#E53E3E] text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors cursor-pointer"
              >
                Go to wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Referrals;
