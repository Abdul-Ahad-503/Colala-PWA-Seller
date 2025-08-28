import React, { useState } from 'react';

interface AddNewPricingProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pricingData: any) => void;
}

const AddNewPricing: React.FC<AddNewPricingProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedLocalGovernment, setSelectedLocalGovernment] = useState('');
  const [deliveryFee, setDeliveryFee] = useState('');
  const [isFreeDelivery, setIsFreeDelivery] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showLGADropdown, setShowLGADropdown] = useState(false);

  const nigerianStates = [
    'Abia State',
    'Adamawa State', 
    'Akwa Ibom State',
    'Anambra State',
    'Bauchi State',
    'Bayelsa State',
    'Benue State',
    'Borno State',
    'Cross River State',
    'Delta State',
    'Ebonyi State',
    'Edo State',
    'Ekiti State',
    'Enugu State',
    'FCT, Abuja',
    'Gombe State',
    'Imo State',
    'Jigawa State',
    'Kaduna State',
    'Kano State',
    'Katsina State',
    'Kebbi State',
    'Kogi State',
    'Kwara State',
    'Lagos State',
    'Nasarawa State',
    'Niger State',
    'Ogun State',
    'Ondo State',
    'Osun State',
    'Oyo State',
    'Plateau State',
    'Rivers State',
    'Sokoto State',
    'Taraba State',
    'Yobe State',
    'Zamfara State'
  ];

  const localGovernments = [
    'Ikeja',
    'Lagos Island',
    'Victoria Island',
    'Surulere',
    'Alimosho',
    'Kosofe',
    'Mushin',
    'Oshodi-Isolo',
    'Eti-Osa',
    'Agege'
  ];

  const handleSave = () => {
    if (!selectedState || !selectedLocalGovernment || (!deliveryFee && !isFreeDelivery)) {
      alert('Please complete all required fields.');
      return;
    }

    const pricingData = {
      id: Date.now().toString(),
      state: selectedState,
      localGovernment: selectedLocalGovernment,
      price: isFreeDelivery ? 'Free' : `N${deliveryFee}`,
      isActive: isFreeDelivery
    };

    onSave(pricingData);
    
    // Reset form
    setSelectedState('');
    setSelectedLocalGovernment('');
    setDeliveryFee('');
    setIsFreeDelivery(false);
  };

  const handleStateClick = () => {
    setShowStateDropdown(!showStateDropdown);
  };

  const handleLGAClick = () => {
    if (selectedState) {
      setShowLGADropdown(!showLGADropdown);
    }
  };

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setSelectedLocalGovernment(''); // Reset LGA when state changes
    setShowStateDropdown(false);
  };

  const handleLGASelect = (lga: string) => {
    setSelectedLocalGovernment(lga);
    setShowLGADropdown(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#F9F9F9] rounded-3xl w-[430px] h-[426px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-center pop_up relative p-6 pb-4 mb-4">
          <h2 className="text-[20px] font-medium text-[#000000] italic">Add New</h2>
          <button
            onClick={onClose}
            className="absolute right-6 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 ml-4 -mt-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-4">
          {/* State Field */}
          <div className="relative">
            <div 
              onClick={handleStateClick}
              className="flex items-center justify-between py-4 px-5 bg-[#FFFFFF] rounded-xl mb-1 border border-[#CDCDCD] cursor-pointer"
            >
              <span className="text-[14px] text-[#000000]">
                {selectedState || 'State'}
              </span>
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            {showStateDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                {nigerianStates.map((state) => (
                  <div
                    key={state}
                    onClick={() => handleStateSelect(state)}
                    className="py-3 px-5 hover:bg-gray-50 cursor-pointer text-[14px] text-[#000000]"
                  >
                    {state}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Local Government Field */}
          <div className="relative">
            <div 
              onClick={handleLGAClick}
              className={`flex items-center justify-between py-4 px-5 bg-[#FFFFFF] rounded-xl border border-[#CDCDCD] ${selectedState ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
            >
              <span className="text-[14px] text-[#000000]">
                {selectedLocalGovernment || 'Local Government'}
              </span>
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            {showLGADropdown && selectedState && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                {localGovernments.map((lga) => (
                  <div
                    key={lga}
                    onClick={() => handleLGASelect(lga)}
                    className="py-3 px-5 hover:bg-gray-50 cursor-pointer text-[14px] text-[#000000]"
                  >
                    {lga}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Delivery Fee Field */}
          <div>
            <input
              type="text"
              placeholder="Delivery Fee"
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(e.target.value)}
              disabled={isFreeDelivery}
              className="w-full py-4 px-5 bg-[#FFFFFF] border border-[#CDCDCD] rounded-xl text-[14px] text-[#000000] placeholder-gray-400 focus:outline-none disabled:opacity-50"
            />
          </div>

          {/* Free Delivery Checkbox */}
          <div className="pt-2 -mt-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isFreeDelivery}
                  onChange={(e) => {
                    setIsFreeDelivery(e.target.checked);
                    if (e.target.checked) {
                      setDeliveryFee('');
                    }
                  }}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded ${isFreeDelivery ? 'bg-red-500' : 'bg-white border-2 border-gray-300'} flex items-center justify-center`}>
                  {isFreeDelivery && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-[14px] text-[#000000]">Mark for free delivery</span>
            </label>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              onClick={handleSave}
              className="w-full bg-[#E53E3E] text-white font-sm py-4 px-6 rounded-xl transition-colors text-[14px]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewPricing;
