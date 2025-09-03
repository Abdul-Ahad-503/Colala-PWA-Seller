import React, { useState } from 'react';
import IMAGES from '../../constants';

const ShoppingWallet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'withdrawals' | 'payments'>('withdrawals');

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
    // Add payment transactions here if needed
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
        
        <button className="w-full bg-white text-black text-[10px] py-4 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors">
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

        {/* Show message if no transactions in payments tab */}
        {activeTab === 'payments' && paymentTransactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No payment transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingWallet;
