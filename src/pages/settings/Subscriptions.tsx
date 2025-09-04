import React, { useState } from 'react';
import IMAGES from '../../constants';

const Subscriptions: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('basic');

  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      period: '/month',
      benefits: [
        'Free benefit 1',
        'Free benefit 2',
        'Free benefit 3',
        'Free benefit 4'
      ],
      daysLeft: 'days left',
      status: 'Subscription Active',
      cardBg: 'bg-gradient-to-br from-[#FDB47D] to-[#FF7395]',
      textColor: 'text-white'
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 'N19.99',
      period: '/month',
      benefits: [
        'Up to 25 products',
        'Advanced analytics',
        'Priority support',
        'Custom branding',
        'API access'
      ],
      daysLeft: 'Upgrade',
      status: 'Upgrade',
      cardBg: 'bg-gradient-to-br from-[#E1729A] to-[#3056A9]',
      textColor: 'text-white'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'N39.99',
      period: '/month',
      benefits: [
        'Unlimited products',
        'Advanced analytics',
        'Priority support',
        'Custom branding',
        'API access',
        'White-label solution'
      ],
      daysLeft: 'Update',
      status: 'Upgrade',
      cardBg: 'bg-gradient-to-br from-green-500 to-teal-600',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="flex-1 bg-white rounded-[20px] min-h-screen">
      {/* Main container with pink background and sky gradient */}
      <div 
        className="w-full min-h-screen rounded-3xl py-8 relative overflow-hidden bg-[#FFC4C4]"
        style={{backgroundColor: '#FFC4C4'}}>        
        <div className="max-w-[674px] mx-auto relative z-10">
          <div className=''>
            <h1 className="text-[20px] pl-5 font-semibold text-black mb-4">Subscription</h1>
          </div>

          {/* Air Balloon positioned in center-top */}
          <img 
            src={IMAGES.airbaloon} 
            alt="Hot Air Balloon" 
            className="w-full h-[982px] object-cover -z-20 absolute -top-17 left-1/2 transform -translate-x-1/2"
          />

          {/* Subscription Cards - Horizontal Scrollable */}
          <div className="mt-80 pl-4">
            <div className="flex gap-6 max-w-[674px] overflow-x-auto scrollbar-hide pb-6">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`${plan.cardBg} rounded-3xl p-6 relative overflow-hidden w-[513px] h-[847px] shadow-xl flex-shrink-0`}
                >
                  {/* Plan Header */}
                  <div className="mb-5">
                    <h3 className={`font_Oleo_400 text-black `}>
                      {plan.name}
                    </h3>
                    <div className="bg-white rounded-r-full px-6 py-4 -ml-6">
                      <div className="flex flex-col">
                        <span className="bg-gradient-to-r from-[#D44768] to-[#F27E35] bg-clip-text text-transparent text-[50px] font-bold">{plan.price}</span>
                        <span className="bg-gradient-to-r from-[#D44768] to-[#F27E35] bg-clip-text text-transparent text-[20px] ml-2">{plan.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-1 mb-8">
                    {plan.benefits.map((benefit, index) => (
                      <div 
                        key={index}
                        className="bg-black/30 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-[10px]"
                      >
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className={`${plan.textColor}  text-sm`}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  

                  {/* Status/Action Button */}
                  <div className="mt-17 text-center relative">
                    {/* Days Left Badge */}
                  <div className="bg-black px-9 max-w-29 absolute -top-6 z-0 inset-x-0 mx-auto clip-trapezoid">
                    <span className={`${plan.textColor} text-[10px]`}>
                      {plan.daysLeft}
                    </span>
                  </div>
                    <button
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full py-4 rounded-2xl font-bold text-lg z-10 transition-all duration-200 ${
                        plan.id === 'basic'
                          ? 'bg-white/90 text-gray-900 border-2 border-white/50'
                          : 'bg-white text-gray-900 hover:bg-gray-100'
                      } ${
                        selectedPlan === plan.id ? 'ring-2 ring-white shadow-lg' : ''
                      }`}
                    >
                      <div className="flex items-center justify-center gap-3">
                        {plan.id === 'basic' && (
                          <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span>{plan.status}</span>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
