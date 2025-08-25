import React, { useState } from 'react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectState: (state: string) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  onSelectState
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const nigerianStates = [
    { name: 'Abia State', count: '5000 products' },
    { name: 'Adamawa State', count: '5000 products' },
    { name: 'Akwa Ibom State', count: '5000 products' },
    { name: 'Anambra State', count: '5000 products' },
    { name: 'Bauchi State', count: '5000 products' },
    { name: 'Bayelsa State', count: '5000 products' },
    { name: 'Benue State', count: '5000 products' },
    { name: 'Borno State', count: '5000 products' },
    { name: 'Cross River State', count: '5000 products' },
    { name: 'Delta State', count: '5000 products' },
    { name: 'Ebonyi State', count: '5000 products' },
    { name: 'Edo State', count: '5000 products' },
    { name: 'Ekiti State', count: '5000 products' },
    { name: 'Enugu State', count: '5000 products' },
    { name: 'FCT, Abuja', count: '5000 products' },
    { name: 'Gombe State', count: '5000 products' },
    { name: 'Imo State', count: '5000 products' },
    { name: 'Jigawa State', count: '5000 products ' },
    { name: 'Kaduna State', count: '5000 products' },
    { name: 'Kano State', count: '5000 products' },
    { name: 'Katsina State', count: '5000 products' },
    { name: 'Kebbi State', count: '5000 products' },
    { name: 'Kogi State', count: '5000 products' },
    { name: 'Kwara State', count: '5000 products' },
    { name: 'Lagos State', count: '5000 products' },
    { name: 'Nasarawa State', count: '5000 products' },
    { name: 'Niger State', count: '5000 products' },
    { name: 'Ogun State', count: '5000 products' },
    { name: 'Ondo State', count: '5000 products' },
    { name: 'Osun State', count: '5000 products' },
    { name: 'Oyo State', count: '5000 products' },
    { name: 'Plateau State', count: '5000 products' },
    { name: 'Rivers State', count: '5000 products' },
    { name: 'Sokoto State', count: '5000 products' },
    { name: 'Taraba State', count: '5000 products' },
    { name: 'Yobe State', count: '5000 products' },
    { name: 'Zamfara State', count: '5000 products' }
  ];

  const popularStates = [
    { name: 'All Locations', count: '5000 products' },
    { name: 'Lagos State', count: '5000 products' },
    { name: 'Oyo State', count: '5000 products' },
    { name: 'FCT, Abuja', count: '5000 products' },
    { name: 'Rivers State', count: '5000 products' }
  ];

  const filteredStates = nigerianStates.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStateSelect = (stateName: string) => {
    onSelectState(stateName);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: transparent;
          }
        `}
      </style>
      <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-[430px] h-[650px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6  pop_up border-gray-100">
          <h2 className="text-[20px]  ml-36 -mt-2 font-bold text-[#000000]">Location</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full  flex items-center justify-center transition-colors"
          >
            <img src="/public/Vector.svg" alt="Close" className="w-5 h-5 ml-6 -mt-4 " />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 -mt-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl text-[12px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {/* <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg> */}
          </div>
        </div>

        {/* Content */}
        <div 
          className="flex-1 overflow-y-auto custom-scrollbar"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'transparent transparent'
          }}
        >
          {!searchTerm && (
            <>
              {/* Popular Section */}
              <div className="px-4 pb-4 -mt-1 mr-3">
                <h3 className="text-[14px]  font-medium text-[#000000] mb-3">Popular</h3>
                <div className="space-y-1">
                  {popularStates.map((state, index) => (
                    <button
                      key={index}
                      onClick={() => handleStateSelect(state.name)}
                      className="w-[390px] h-[50px] flex items-center justify-between py-3 px-2 bg-[#EDEDED] rounded-lg transition-colors text-left"
                    >
                      <div>
                        <div className="text-[12px] text-[#000000] font-medium">{state.name}</div>
                        <div className="text-[8px] text-gray-500">{state.count}</div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* All States Section */}
              <div className="px-4  -mt-5 pt-4">
                <h3 className="text-[14px] font-medium text-[#000000] mb-3">All States</h3>
                <div className="space-y-1">
                  {nigerianStates.map((state, index) => (
                    <button
                      key={index}
                      onClick={() => handleStateSelect(state.name)}
                      className="w-[390px] h-[50px] flex items-center justify-between py-3 px-2  bg-[#EDEDED] rounded-lg transition-colors text-left"
                    >
                      <div>
                        <div className="text-[12px] text-[#000000] font-medium">{state.name}</div>
                        <div className="text-[8px] text-gray-500">{state.count}</div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Search Results */}
          {searchTerm && (
            <div className="px-4">
              <h3 className="text-[14px] font-medium text-[#000000] mb-3">Search Results</h3>
              <div className="space-y-1">
                {filteredStates.length > 0 ? (
                  filteredStates.map((state, index) => (
                    <button
                      key={index}
                      onClick={() => handleStateSelect(state.name)}
                      className="w-full flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                    >
                      <div>
                        <div className="text-[14px] text-[#000000] font-medium">{state.name}</div>
                        <div className="text-[12px] text-gray-500">{state.count}</div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <div className="text-[14px] text-gray-500">No states found matching "{searchTerm}"</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
      </div>
    </>
  );
};

export default LocationModal;
