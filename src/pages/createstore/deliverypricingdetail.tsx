import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import AddNewPricing from './addnewpricing';

interface DeliveryPricingDetailProps {
  isOpen: boolean;
  onBack: () => void;
}

interface DeliveryLocation {
  id: string;
  state: string;
  localGovernment: string;
  price: string;
  isActive: boolean;
}

const DeliveryPricingDetail: React.FC<DeliveryPricingDetailProps> = ({
  isOpen,
  onBack
}) => {
  const [selectedState, setSelectedState] = useState('');
  const [showAddPricingModal, setShowAddPricingModal] = useState(false);
  const [deliveryLocations, setDeliveryLocations] = useState<DeliveryLocation[]>([
    {
      id: '1',
      state: 'Lagos',
      localGovernment: 'Ikeja',
      price: 'N2,000',
      isActive: true
    },
    {
      id: '2',
      state: 'Lagos',
      localGovernment: 'Ikeja',
      price: 'N2,000',
      isActive: false
    },
    {
      id: '3',
      state: 'Lagos',
      localGovernment: 'Ikeja',
      price: 'N2,000',
      isActive: false
    }
  ]);

  useEffect(() => {
    if (!isOpen) return;

    // Load saved data for createstore
    const savedPricingData = Cookies.get('createStoreDeliveryPricingData');
    if (savedPricingData) {
      try {
        const data = JSON.parse(savedPricingData);
        setDeliveryLocations(data || deliveryLocations);
      } catch (error) {
        console.error('Error parsing delivery pricing data:', error);
      }
    }
  }, [isOpen]);

  const handleToggleLocation = (id: string) => {
    setDeliveryLocations(prev => 
      prev.map(location => 
        location.id === id 
          ? { ...location, isActive: !location.isActive }
          : location
      )
    );
  };

  const handleDeleteLocation = (id: string) => {
    setDeliveryLocations(prev => prev.filter(location => location.id !== id));
  };

  const handleAddNewPrice = () => {
    setShowAddPricingModal(true);
  };

  const handleCloseAddPricingModal = () => {
    setShowAddPricingModal(false);
  };

  const handleSaveNewPricing = (pricingData: any) => {
    setDeliveryLocations(prev => [...prev, pricingData]);
    setShowAddPricingModal(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #F7FAFC;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #CBD5E0;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #A0AEC0;
          }
        `}
      </style>
      <div className="w-[680px]">
        {/* Header with Back Button and Title - matching image 2 */}
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-[18px] font-medium text-[#000000]">
            <span className="text-gray-500">Level 3</span>
            <span className="text-black">/</span>
            <span className="text-black font-bold">Pricing</span>
          </h3>
        </div>

        {/* Content */}
        <div 
          className="w-[680px] space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar" 
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#CBD5E0 #F7FAFC'
          }}
        >
          {/* State Dropdown */}
          <div className="mb-6">
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-[126px] bg-[#EDEDED] text-[#000000] text-[10px] font-medium py-4 px-4 rounded-xl appearance-none cursor-pointer"
              >
                <option value="">State</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Kano">Kano</option>
                <option value="Rivers">Rivers</option>
                <option value="Oyo">Oyo</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-5 h-5 mr-62 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Delivery Locations List */}
          <div className="space-y-3 mb-6 w-[600px]">
            {deliveryLocations.map((location) => (
              <div key={location.id} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                {/* State Label and Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-medium text-gray-500 uppercase">State</span>
                  {location.isActive && (
                    <span className="bg-[#008000] ml-8 text-white text-[10px] px-4 py-1 rounded-tr-2xl -mt-5 font-medium">
                      Free Delivery Active
                    </span>
                  )}
                </div>

                {/* State Value */}
                <div className="mb-3">
                  <div className="text-[10px] font-medium text-[#000000] mb-1">{location.state}</div>
                </div>

                {/* Local Government Label and Value */}
                <div className="mb-3">
                  <div className="text-[10px] font-medium text-gray-500 uppercase mb-1">Local Government</div>
                  <div className="text-[12px] font-medium text-[#000000]">{location.localGovernment}</div>
                </div>

                {/* Price Label and Value */}
                <div className="mb-4">
                  <div className="text-[10px] font-medium text-gray-500 uppercase mb-1">Price</div>
                  <div className="text-[12px] font-medium text-[#000000]">{location.price}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 -mt-10">
                  <button
                    onClick={() => handleToggleLocation(location.id)}
                    className="bg-[#E53E3E] ml-56 text-white text-[8px] font-medium py-2 px-6 rounded-2xl hover:bg-red-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLocation(location.id)}
                    className="bg-white text-[#E53E3E] text-[8px] font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Price Button */}
          <div className="mb-6">
            <button
              onClick={handleAddNewPrice}
              className="w-full bg-[#E53E3E] text-white font-medium py-4 px-6 rounded-xl transition-colors hover:bg-red-600 text-[14px]"
            >
              Add New Price
            </button>
          </div>
        </div>

        {/* Add New Pricing Modal */}
        <AddNewPricing
          isOpen={showAddPricingModal}
          onClose={handleCloseAddPricingModal}
          onSave={handleSaveNewPricing}
        />
      </div>
    </>
  );
};

export default DeliveryPricingDetail;
