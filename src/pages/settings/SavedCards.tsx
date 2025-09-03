import React, { useState } from 'react';
import IMAGES from '../../constants';

const SavedCards: React.FC = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'My Card',
      brand: 'bank',
      number: '**** **** **** 1234',
      holder: 'Sasha Collins',
      gradient: 'from-[#E53E3E] via-[#BD0F7B] to-[#7B2CBF]',
      autodebit: true
    },
    {
      id: 2,
      type: 'My Card',
      brand: 'bank',
      number: '**** **** **** 1234',
      holder: 'Sasha Collins', 
      gradient: 'from-[#E53E3E] to-[#BD0F7B]',
      autodebit: false
    }
  ]);

  const paymentHistory = [
    {
      id: 1,
      type: 'Debit - Sub Payment',
      status: 'Successful',
      amount: 'N20,000',
      date: '07/10/25 - 06:22 AM'
    },
    {
      id: 2,
      type: 'Debit - Sub Payment', 
      status: 'Successful',
      amount: 'N20,000',
      date: '07/10/25 - 06:22 AM'
    },
    {
      id: 3,
      type: 'Debit - Sub Payment',
      status: 'Successful', 
      amount: 'N20,000',
      date: '07/10/25 - 06:22 AM'
    },
    {
      id: 4,
      type: 'Debit - Sub Payment',
      status: 'Successful',
      amount: 'N20,000', 
      date: '07/10/25 - 06:22 AM'
    }
  ];

  const toggleAutodebit = (cardId: number) => {
    setCards(cards.map(card => 
      card.id === cardId ? { ...card, autodebit: !card.autodebit } : card
    ));
  };

  return (
    <div className="flex-1 bg-white rounded-[20px] max-w-[653px] min-h-screen p-6 pt-5">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[20px] font-semibold text-black">Saved Cards</h1>
      </div>

      {/* Add New Card Button */}
      <button className="w-full bg-[#E53E3E] text-white py-4 rounded-[15px] font-medium hover:bg-red-600 transition-colors mb-6">
        Add New Card
      </button>

      {/* Cards Horizontal Scroll */}
      <div className="flex gap-6 overflow-x-auto  pb-4 mb-8 scrollbar-hide">
        {cards.map((card) => (
          <div key={card.id} className="flex-shrink-0 w-[400px] space-y-4">
            {/* Credit Card */}
            <div className={`bg-gradient-to-r ${card.gradient} rounded-[20px] p-6 text-white relative overflow-hidden h-[200px]`}>
              {/* Card Header */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs opacity-90">{card.type}</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs opacity-90">{card.brand}</span>
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full"></div>
                </div>
              </div>

              {/* Card Number */}
              <div className="mb-6">
                <p className="text-lg font-bold tracking-wider">{card.number}</p>
              </div>

              {/* Card Holder */}
              <div className="mb-4">
                <p className="text-sm opacity-90">{card.holder}</p>
              </div>

              {/* Card Actions */}
              <div className="absolute bottom-4 right-4 flex gap-3">
                <button className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {/* Decorative circles */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
            </div>

            {/* Card Settings */}
            <div className="bg-white border border-gray-200 rounded-[15px] p-4">
              {/* Autodebit Toggle */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-900">Autodebit</span>
                <button
                  onClick={() => toggleAutodebit(card.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    card.autodebit ? 'bg-[#E53E3E]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      card.autodebit ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Payment History */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Payment History</h3>
                <div className="space-y-3 max-h-[240px] overflow-y-auto">
                  {paymentHistory.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {/* Payment Icon */}
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        
                        {/* Payment Details */}
                        <div className="flex flex-col">
                          <span className="text-sm text-black font-medium">{payment.type}</span>
                          <span className="text-xs text-green-600">{payment.status}</span>
                        </div>
                      </div>
                      
                      {/* Amount and Date */}
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-green-600">{payment.amount}</span>
                        <span className="text-xs text-gray-500">{payment.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedCards;
