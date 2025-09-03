import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IMAGES from '../../constants';

const ShoppingWallet: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'withdrawals' | 'payments'>('withdrawals');
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const [showWithdrawSuccess, setShowWithdrawSuccess] = useState(false);
  const [withdrawalForm, setWithdrawalForm] = useState({
    amount: "",
    accountNumber: "",
    bankName: "",
    accountName: "",
    saveDetails: false
  });

  // Mock transaction data
  const withdrawalTransactions = [
    {
      id: 1,
      type: 'Funds Withdrawal',
      status: 'Successful',
      amount: 'N20,000',
      date: '07/10/25 - 05:22 AM',
      icon: IMAGES.ArrowLineUpRight
    },
    {
      id: 2,
      type: 'Funds Withdrawal',
      status: 'Successful', 
      amount: 'N20,000',
      date: '07/10/25 - 05:22 AM',
      icon: IMAGES.ArrowLineUpRight
    },
    {
      id: 3,
      type: 'Funds Withdrawal',
      status: 'Successful',
      amount: 'N20,000',
      date: '07/10/25 - 05:22 AM',
      icon: IMAGES.ArrowLineUpRight
    },
    {
      id: 4,
      type: 'Funds Withdrawal',
      status: 'Successful',
      amount: 'N20,000',
      date: '07/10/25 - 05:22 AM',
      icon: IMAGES.ArrowLineUpRight
    },
    {
      id: 5,
      type: 'Funds Withdrawal',
      status: 'Successful',
      amount: 'N20,000',
      date: '07/10/25 - 05:22 AM',
      icon: IMAGES.ArrowLineUpRight
    },
    {
      id: 6,
      type: 'Funds Withdrawal',
      status: 'Successful',
      amount: 'N20,000',
      date: '07/10/25 - 05:22 AM',
      icon: IMAGES.ArrowLineUpRight
    }
  ];

  const paymentTransactions = [
    {
      id: 1,
      type: 'Ads Payment - Wallet',
      status: 'Successful',
      amount: 'N5,000',
      date: '07/10/25 - 02:30 PM',
      icon: IMAGES.Money
    },
    {
      id: 2,
      type: 'Ads Payment - Wallet',
      status: 'Successful',
      amount: 'N12,500',
      date: '06/10/25 - 11:45 AM',
      icon: IMAGES.Money
    },
    {
      id: 3,
      type: 'Ads Payment - Wallet',
      status: 'Successful',
      amount: 'N8,750',
      date: '05/10/25 - 09:15 AM',
      icon: IMAGES.Money
    },
    {
      id: 4,
      type: 'Ads Payment - Wallet',
      status: 'Successful',
      amount: 'N15,000',
      date: '04/10/25 - 03:22 PM',
      icon: IMAGES.Money
    },
    {
      id: 5,
      type: 'Ads Payment - Wallet',
      status: 'Successful',
      amount: 'N6,200',
      date: '03/10/25 - 01:18 PM',
      icon: IMAGES.Money
    },
    {
      id: 6,
      type: 'Ads Payment - Wallet',
      status: 'Successful',
      amount: 'N9,800',
      date: '02/10/25 - 10:30 AM',
      icon: IMAGES.Money
    }
  ];

  const currentTransactions = activeTab === 'withdrawals' ? withdrawalTransactions : paymentTransactions;

  return (
    <div className="flex-1 bg-white rounded-[20px] min-h-screen p-6 pt-5">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[20px] font-semibold text-black">Shopping Wallet</h1>
      </div>

      {/* Wallet Card */}
      <div className="bg-gradient-to-r from-[#E90F0F] to-[#BD0F7B] rounded-[20px] p-6 mb-6 text-white">
        <div className="mb-4">
          <span className="text-xs opacity-90">Shopping Wallet</span>
        </div>
        
        <div className="mb-4">
          <h2 className="text-[40px] font-bold">N35,000</h2>
        </div>
        
        <button 
          onClick={() => setShowWithdrawPopup(true)}
          className="w-full bg-white text-black text-[10px] py-4 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          Withdraw
        </button>
      </div>

      {/* Transaction History */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm  text-black">Transaction History</h3>
          <button className="p-2">
            <img src={IMAGES.FunnelSimple} alt="Filter" className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6">
          <button
            onClick={() => setActiveTab('withdrawals')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'withdrawals'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Withdrawals
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'payments'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Payments
          </button>
        </div>

        {/* Transaction List */}
        <div className="space-y-[10px]">
          {currentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-[6px]  bg-[#FFFFFF] drop-shadow-sm rounded-[15px] hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-[10px]">
                {/* Transaction Icon */}
                <div className="p-3 bg-gray-200 rounded-lg flex items-center justify-center">
                  <img src={transaction.icon} alt="" className="w-6 h-6" />
                </div>
                
                {/* Transaction Details */}
                <div className="flex flex-col">
                  <span className=" text-black text-sm">{transaction.type}</span>
                  <span className="text-[10px] text-[#008000]">{transaction.status}</span>
                </div>
              </div>
              
              {/* Amount and Date */}
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-[#008000]">{transaction.amount}</span>
                <span className="text-[10px] font-light text-gray-500">{transaction.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdrawal Popup */}
      {showWithdrawPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
          <div className="bg-[#F9F9F9] rounded-3xl w-[430px] max-w-full p-6 shadow-2xl relative ">
            {/* Close Button */}
            <button 
              onClick={() => setShowWithdrawPopup(false)}
              className="absolute top-4 right-4 cursor-pointer hover:opacity-70"
            >
              <img src={IMAGES.Xcircle} alt="Close" className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="text-center flex justify-center mb-6 pop_up ">
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
                    setShowWithdrawSuccess(true);
                  }}
                >
                  Process Withdrawal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Withdrawal Success Popup */}
      {showWithdrawSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
          <div className="bg-white rounded-3xl w-[400px] max-w-full p-8 px-4 shadow-2xl relative">
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Success Message */}
              <p className="text-gray-900 text-center text-lg mb-8">
                Your withdrawal of <span className="font-bold text-gray-900">N{withdrawalForm.amount || '20,000'}</span> is being processed
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  // Generate transaction data
                  const transactionData = {
                    amount: withdrawalForm.amount || "20,000",
                    transactionId: "12qj4w0ickwkdcskt",
                    accountNumber: withdrawalForm.accountNumber || "12qj4w0ickwkdcskt",
                    accountName: withdrawalForm.accountName || "Flutterwave",
                    bankName: withdrawalForm.bankName || "July 20, 2025 - 08:22 AM",
                    channel: "Flutterwave",
                    time: new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })
                  };
                  
                  setShowWithdrawSuccess(false);
                  navigate('/settings/transaction-details', { state: transactionData });
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl text-xs hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowWithdrawSuccess(false);
                  setWithdrawalForm({
                    amount: "",
                    accountNumber: "",
                    bankName: "",
                    accountName: "",
                    saveDetails: false
                  });
                  // Navigate to wallet or stay on current page since this is already the wallet
                }}
                className="flex-1 bg-[#E53E3E] text-white py-4 rounded-2xl font-medium hover:bg-red-600 transition-colors cursor-pointer text-xs"
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

export default ShoppingWallet;
