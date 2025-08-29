import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import IMAGES from '../../constants';
import AddNewAddress from './addnewaddress';
import DeliveryPricingDetail from './deliverypricingdetail';

interface CreateStore6Props {
  onBackToLevel3: () => void;
  onProceedToNext: () => void;
}

const CreateStore6: React.FC<CreateStore6Props> = ({
  onBackToLevel3,
  onProceedToNext
}) => {
  const [storeAddress, setStoreAddress] = useState('');
  const [deliveryPricing, setDeliveryPricing] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showDeliveryPricing, setShowDeliveryPricing] = useState(false);

  // Color options matching the image - exact layout from the provided image
  const colorOptions = [
    // First row (7 colors)
    { name: 'Red', value: '#E53E3E', style: { backgroundColor: '#E53E3E' } },
    { name: 'Blue', value: '#0000FF', style: { backgroundColor: '#0000FF' } },
    { name: 'Purple', value: '#800080', style: { backgroundColor: '#800080' } },
    { name: 'Green', value: '#008000', style: { backgroundColor: '#008000' } },
    { name: 'Orange', value: '#FFA500', style: { backgroundColor: '#FFA500' } },
    { name: 'Brown', value: '#9F7B39', style: { backgroundColor: '#9F7B39' } },
    { name: 'Dark Red', value: '#7F0909', style: { backgroundColor: '#7F0909' } },
    // Second row (5 colors)
    { name: 'Lime Green', value: '#00FF48', style: { backgroundColor: '#00FF48' } },
    { name: 'Dark Purple', value: '#00FF48', style: { backgroundColor: '#4B0082' } },
    { name: 'Yellow', value: '#FBFF00', style: { backgroundColor: '#FBFF00' } },
    { name: 'Pink', value: '#FF0066', style: { backgroundColor: '#FF0066' } },
    { name: 'Dark Green', value: '#374F23', style: { backgroundColor: '#374F23' } },
  ];

  useEffect(() => {
    // Load saved data
    const savedAddress = Cookies.get('createStoreAddress');
    const savedDelivery = Cookies.get('createStoreDeliveryPricing');
    const savedColor = Cookies.get('createStoreSelectedColor');

    if (savedAddress) setStoreAddress(savedAddress);
    if (savedDelivery) setDeliveryPricing(savedDelivery);
    if (savedColor) setSelectedColor(savedColor);
  }, []);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    Cookies.set('createStoreSelectedColor', color, { expires: 7 });
  };

  const handleAddStoreAddress = () => {
    setShowAddAddress(true);
  };

  const handleCloseAddAddress = () => {
    setShowAddAddress(false);
  };

  const handleSaveAddress = (addressData: any) => {
    setStoreAddress(addressData.fullAddress);
    setShowAddAddress(false);
  };

  const handleAddDeliveryPricing = () => {
    setShowDeliveryPricing(true);
  };

  const handleBackFromDeliveryPricing = () => {
    setShowDeliveryPricing(false);
  };

  const handleSubmit = () => {
    if (!storeAddress || !deliveryPricing || !selectedColor) {
      alert('Please complete all required fields.');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onProceedToNext();
    }, 2000);
  };

  const handleViewBenefits = () => {
    setShowBenefits(!showBenefits);
  };

  const handleSaveAndExit = () => {
    console.log('Save and Exit');
  };

  // Show Add New Address form
  if (showAddAddress) {
    return (
      <AddNewAddress
        isOpen={true}
        onSave={handleSaveAddress}
        onBack={handleCloseAddAddress}
        onClose={handleCloseAddAddress}
      />
    );
  }

  // Show Delivery Pricing Detail form
  if (showDeliveryPricing) {
    return (
      <DeliveryPricingDetail
        isOpen={true}
        onBack={handleBackFromDeliveryPricing}
      />
    );
  }

  return (
    <div className="w-[680px]">
      {/* Header */}
      <div className="mb-6 border border-[#E53E3E] w-[680px] h-[93px] rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[20px] font-medium text-[#E53E3E]">Level 3</span>
          <button
            onClick={handleViewBenefits}
            className="text-[14px] text-[#E53E3E] hover:underline"
          >
            <u>View Benefits</u>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[23px] h-[23px] bg-[#E53E3E] text-white rounded-full flex items-center justify-center text-[14px] font-bold">
            1
          </div>
          <div className="flex-1 h-0.5 bg-[#E53E3E]"></div>
          <div className="w-[23px] h-[23px] bg-[#E53E3E] text-white rounded-full flex items-center justify-center text-[14px] font-bold">
            2
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div 
        className="w-[680px] space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar" 
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#CBD5E0 #F7FAFC'
        }}
      >
        {/* Add Store Address */}
        <div className="mb-3">
          <button
            onClick={handleAddStoreAddress}
            className="flex items-center justify-between py-4 w-[680px] rounded-2xl bg-[#FFFFFF] border border-[#CDCDCD] shadow-medium hover:bg-gray-50 transition-colors"
          >
            <p className="text-[14px] ml-4 text-[#000000]">Add Store Address</p>
            <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Add Delivery Pricing */}
        <div className="mb-6">
          <button
            onClick={handleAddDeliveryPricing}
            className="flex items-center justify-between py-4 border border-[#CDCDCD] w-[680px] rounded-2xl bg-[#FFFFFF] shadow-medium hover:bg-gray-50 transition-colors"
          >
            <p className="text-[14px] ml-4 text-[#000000]">Add Delivery pricing</p>
            <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Color Selection */}
        <div className="mb-8">
          <p className="text-[14px] text-[#000000] mb-1">
            Select a color that suits your brand and your store shall 
          </p>
          <p className="text-[14px] text-[#000000] mb-4">be customized as such</p>

          {/* Color Grid - Two rows like in the image */}
          <div className="space-y-4 mb-8">
            {/* First Row - 7 colors */}
            <div className="flex gap-4 justify-start">
              {colorOptions.slice(0, 7).map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleColorSelect(color.value)}
                  style={color.style}
                  className={`w-[71px] h-[71px] rounded-full border-2 ${
                    selectedColor === color.value ? 'border-black' : 'border-gray-300'
                  } hover:scale-110 transition-transform`}
                  title={color.name}
                />
              ))}
            </div>
            
            {/* Second Row - 5 colors */}
            <div className="flex gap-4 justify-start">
              {colorOptions.slice(7, 12).map((color, index) => (
                <button
                  key={index + 7}
                  onClick={() => handleColorSelect(color.value)}
                  style={color.style}
                  className={`w-[71px] h-[71px] rounded-full  ${
                    selectedColor === color.value ? 'ring-1 ring-[#000000] ring-offset-2' : ''
                  } hover:scale-110 transition-transform`}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex items-center space-x-4">
        {/* Back Arrow */}
        <button
          onClick={onBackToLevel3}
          className="p-2 rounded-lg transition-colors"
        >
          <img src={IMAGES.backarrow} alt="Back" />
        </button>

        {/* Proceed Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading || !selectedColor}
          className="w-[300px] h-[60px] bg-[#E53E3E] text-[14px] text-white font-sm rounded-2xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : (
            'Proceed'
          )}
        </button>

        {/* Save and Exit Button */}
        <button
          onClick={handleSaveAndExit}
          className="w-[300px] h-[60px] bg-[#000000] text-[14px] text-white font-sm rounded-2xl hover:bg-gray-800 transition-colors"
        >
          Save & Exit
        </button>
      </div>

      {showBenefits && (
        <div className="absolute inset-0 bg-white z-10 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[20px] font-bold text-gray-900">Level 3 Benefits</h3>
            <button
              onClick={handleViewBenefits}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Custom Store Branding</h4>
              <p className="text-gray-600 text-sm">Personalize your store with custom colors and branding that reflects your business identity.</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Delivery Management</h4>
              <p className="text-gray-600 text-sm">Set custom delivery pricing and manage your delivery zones efficiently.</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Store Location Services</h4>
              <p className="text-gray-600 text-sm">Add your store address for better customer reach and location-based services.</p>
            </div>
          </div>
          <div className="mt-8">
            <button
              onClick={handleViewBenefits}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Continue with Store Creation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateStore6;
