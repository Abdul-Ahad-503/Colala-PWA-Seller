import React from 'react';
import IMAGES from '../../constants';

const LoyaltyPoints: React.FC = () => {
  const storePoints = [
    {
      id: 1,
      name: "Sasha Stores",
      points: 200,
      avatar: IMAGES.sasha
    },
    {
      id: 2,
      name: "Abc Stores", 
      points: 200,
      avatar: IMAGES.vee
    },
    {
      id: 3,
      name: "ASH Stores",
      points: 150,
      avatar: IMAGES.adam
    },
    {
      id: 4,
      name: "AJW Stores",
      points: 220,
      avatar: IMAGES.sasha
    },
    {
      id: 5,
      name: "Ajj Stores",
      points: 180,
      avatar: IMAGES.vee
    },
    {
      id: 6,
      name: "Asjs Stores",
      points: 170,
      avatar: IMAGES.adam
    },
    {
      id: 7,
      name: "odj Stores",
      points: 210,
      avatar: IMAGES.sasha
    },
    {
      id: 8,
      name: "Okkh Stores",
      points: 190,
      avatar: IMAGES.vee
    }
  ];

  return (
    <div className="flex-1 p-4 bg-white rounded-[20px]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Points</h1>
        
        {/* Total Points Header */}
        <div className="bg-gradient-to-r from-[#FF0000] to-[#70064B] text-white px-4 py-3 rounded-2xl mb-6">
          <div className="flex flex-col">
            <p className="text-[10px]  mb-2 opacity-90">Total Points Balance</p>
            <h2 className="text-[18px] font-bold">5,000</h2>
          </div>
        </div>

        {/* Points/Store Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Points/Store</h3>
        </div>
        
        <div className="space-y-4">
          {storePoints.map((store) => (
            <div
              key={store.id}
              className="flex items-center justify-between py-1 border border-[#00000040] px-0 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 pl-4">
                <img
                  src={store.avatar}
                  alt={store.name}
                  className="w-13 h-13 rounded-full object-cover"
                />
                <span className="font-medium text-gray-900 text-[16px]">{store.name}</span>
              </div>
              <span className="text-lg font-bold text-[#E53E3E] pr-6">{store.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyPoints;
