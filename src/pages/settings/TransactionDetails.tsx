import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface TransactionDetailsProps {
  amount: string;
  transactionId: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  channel: string;
  time: string;
}

const TransactionDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transactionData = location.state as TransactionDetailsProps;

  // Default data if no state is passed
  const defaultData = {
    amount: "N20,000",
    transactionId: "12qj4w0ickwkdcskt",
    accountNumber: "12qj4w0ickwkdcskt",
    accountName: "Flutterwave",
    bankName: "July 20, 2025 - 08:22 AM",
    channel: "Flutterwave",
    time: "July 20, 2025 - 08:22 AM"
  };

  const data = transactionData || defaultData;

  return (
    <div className="flex-1 bg-white rounded-[20px] min-h-screen p-6 pt-5">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
          <button 
            onClick={() => navigate('/settings/shopping-wallet')}
            className="hover:text-gray-700"
          >
            Shopping Wallet
          </button>
          <span>/</span>
          <span className="text-black font-medium">Full Transaction details</span>
        </div>
      </div>

      {/* Transaction Card */}
      <div className="bg-gradient-to-b from-[#E53E3E] to-[#E53E3E] rounded-t-[30px] p-3 h-50 relative">
        {/* White Content Card */}
        <div className="bg-white rounded-[20px] p-6 mt-8 absolute left-1/2 transform -translate-x-1/2 w-full max-w-md shadow-lg">
          {/* Success Icon */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            {/* Amount */}
            <h2 className="text-2xl font-bold text-[#E53E3E] mb-6">-{data.amount}</h2>
          </div>

          {/* Transaction Details Cards */}
          <div className="space-y-4">
            {/* First Card Group */}
            <div className="bg-gray-100 rounded-[20px] p-4 space-y-3">
              {/* Amount */}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-900 text-sm font-medium">Amount</span>
                <span className="text-[#E53E3E] font-semibold">{data.amount}</span>
              </div>
              
              {/* Divider */}
              <div className="border-t border-gray-300"></div>

              {/* Transaction ID */}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-900 text-sm font-medium">Transaction id</span>
                <span className="text-gray-700 font-medium">{data.transactionId}</span>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-300"></div>

              {/* Channel */}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-900 text-sm font-medium">Channel</span>
                <span className="text-gray-700 font-medium">{data.channel}</span>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-300"></div>

              {/* Time */}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-900 text-sm font-medium">Time</span>
                <span className="text-gray-700 font-medium">{data.time}</span>
              </div>
            </div>

            {/* Second Card Group */}
            <div className="bg-gray-100 rounded-[20px] p-4 space-y-3">
              {/* Account Number */}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-900 text-sm font-medium">Account Number</span>
                <span className="text-gray-700 font-medium">{data.accountNumber}</span>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-300"></div>

              {/* Account Name */}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-900 text-sm font-medium">Account Name</span>
                <span className="text-gray-700 font-medium">{data.accountName}</span>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-300"></div>

              {/* Bank Name */}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-900 text-sm font-medium">Bank Name</span>
                <span className="text-gray-700 font-medium">{data.bankName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
