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
      daysLeft: '-days left',
      benefits: [
        'Free benefit 1',
        'Free benefit 2', 
        'Free benefit 3',
        'Free benefit 4'
      ],
      status: 'Subscription Active',
      cardBg: 'bg-gradient-to-br from-orange-300 via-orange-400 to-pink-400',
      textColor: 'text-white'
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 'N5,000',
      period: '/month',
      daysLeft: '-days left',
      benefits: [
        'Standard benefit 1',
        'Standard benefit 2',
        'Standard benefit 3', 
        'Standard benefit 4'
      ],
      status: 'Subscribe Now',
      cardBg: 'bg-gradient-to-br from-purple-400 via-purple-500 to-blue-500',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="flex-1  bg-white rounded-[20px] min-h-screen">

      
      {/* Main container with pink background and sky gradient */}
      <div 
        className="w-full min-h-screen rounded-3xl py-8 relative overflow-hidden bg-[#FFC4C4]"
        style={{backgroundColor: '#FFC4C4'}}>        
        <div className="max-w-6xl mx-auto relative z-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Subscription</h1>
            </div>

          {/* Air Balloon positioned in center-top */}
          <img 
              src={IMAGES.airbaloon} 
              alt="Hot Air Balloon" 
              className="w-full h-[982px] object-contain -z-20 absolute  -top-17 left-1/2 transform -translate-x-1/2"
            />
            
          

          {/* Subscription Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-80 ">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`${plan.cardBg} rounded-3xl p-6 relative overflow-hidden min-h-[450px] shadow-xl`}
              >
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className={`text-3xl font-bold ${plan.textColor} italic mb-4`}>
                    {plan.name}
                  </h3>
                  <div className="bg-white rounded-full px-6 py-4 inline-block">
                    <div className="text-center">
                      <span className="text-red-500 text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-500 text-base ml-2">{plan.period}</span>
                    </div>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-4 mb-8">
                  {plan.benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="bg-black/30 backdrop-blur-sm rounded-2xl px-5 py-4 flex items-center gap-4"
                    >
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className={`${plan.textColor} font-medium text-lg`}>
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Days Left Badge */}
                <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 inline-block mb-6">
                  <span className={`${plan.textColor} text-sm font-medium`}>
                    {plan.daysLeft}
                  </span>
                </div>

                {/* Status/Action Button */}
                <div className="absolute bottom-6 left-6 right-6">
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200 ${
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
  );
};

export default Subscriptions;
