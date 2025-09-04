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
      gradient: 'from-[#F90909] to-[#920C5F]',
      autodebit: true
    },
    {
      id: 2,
      type: 'My Card',
      brand: 'bank',
      number: '**** **** **** 1234',
      holder: 'Sasha Collins', 
      gradient: 'from-primary to-[#BD0F7B]',
      autodebit: false
    },
    {
      id: 2,
      type: 'My Card',
      brand: 'bank',
      number: '**** **** **** 5678',
      holder: 'Sasha Collins', 
      gradient: 'from-primary to-[#BD0F7B]',
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
      <button className="w-full bg-primary text-white py-4 rounded-[15px] text-sm hover:bg-red-600 transition-colors mb-6">
        Add New Card
      </button>

      {/* Cards Horizontal Scroll */}
      <div className="flex gap-6 overflow-x-auto  pb-4 mb-8 scrollbar-hide">
        {cards.map((card) => (
          <div key={card.id} className="flex-shrink-0 w-[350px] space-y-4 bg-white rounded-2xl shadow-lg">
            {/* Credit Card */}
            <div className={`bg-gradient-to-r ${card.gradient} rounded-[20px] p-[22px] text-white relative overflow-hidden `}>
              {/* Card Header */}
              <div className="flex justify-between  mb-4">
                <div className="flex gap-2">
                  <span className="text-[10px]">{card.type}</span>
                  <div className="">
                    <img src={IMAGES.active} alt="Active" className="w-[38px] h-[13px]" />
                    
                  </div>
                </div>
                <div className="flex items-center">
                  <img src={IMAGES.MasterCard} alt="MasterCard" className="w-12 h-8" />
                </div>
              </div>

              {/* Card Number */}
              <div className="mb-6">
                <p className="text-2xl font-bold ">{card.number}</p>
              </div>

              {/* Card Holder */}
              <div className="mb-6 -mt-4">
                <p className="text-base text-[#FFFFFF80]">{card.holder}</p>
              </div>

              {/* Card Actions */}
              <div className="absolute bottom-4 right-4 flex gap-3">
                <button className="p-2 rounded-full   flex items-center justify-center bg-[#FFFFFF26] hover:bg-opacity-30 transition-colors">
                  <img src={IMAGES.PencilSimpleLine} alt="" className='w-8 h-8' />
                </button>
                <button className="p-2 rounded-full   flex items-center justify-center bg-[#FFFFFF26] hover:bg-opacity-30 transition-colors">
                  <img src={IMAGES.Trash} alt="" className='w-8 h-8' />
                </button>
              </div>
              
            </div>

            {/* Card Settings */}
            <div className=" p-4">
              {/* Autodebit Toggle */}
              <div className="flex items-center justify-between border-[0.3px] border-[#CDCDCD] [box-shadow:4px_4px_20px_0px_#AAAAAA40] p-4 rounded-[15px] mb-4">
                <span className="text-sm text-gray-900">Autodebit</span>
                <button
                  onClick={() => toggleAutodebit(card.id)}
                  className={`relative inline-flex h-6 w-10 items-center rounded-full  transition-colors ${
                    card.autodebit ? 'bg-primary ' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-[14px] w-[14px] transform rounded-full  bg-white transition-transform ${
                      card.autodebit ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Payment History */}
              <div>
                <h3 className="text-sm  text-gray-900 mb-3">Payment History</h3>
                <div className="space-y-3  overflow-y-auto">
                  {paymentHistory.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-1 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {/* Payment Icon */}
                        <div className="p-3 bg-gray-200 rounded-lg flex items-center justify-center">
                          <img src={IMAGES.CreditCard} className='w-6 h-6' alt="" />
                        </div>
                        
                        {/* Payment Details */}
                        <div className="flex flex-col">
                          <span className="text-xs text-black">{payment.type}</span>
                          <span className="text-[10px] text-[#008000]">{payment.status}</span>
                        </div>
                      </div>
                      
                      {/* Amount and Date */}
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-[#008000]">{payment.amount}</span>
                        <span className="text-[8px] font-light text-[#00000080]">{payment.date}</span>
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
