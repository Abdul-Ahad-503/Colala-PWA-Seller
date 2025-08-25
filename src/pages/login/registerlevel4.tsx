import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import IMAGES from '../../constants';
import AddNewAddress from './addnewaddress';
import DeliveryPricingDetail from './deliverypricingdetail';

interface RegisterLevel4Props {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (email: string) => void;
  onBackToLogin: () => void;
  onBackToLevel3?: () => void;
}

const RegisterLevel4: React.FC<RegisterLevel4Props> = ({
  isOpen,
  onClose,
  onRegister,
  onBackToLogin,
  onBackToLevel3
}) => {
  const [storeAddress, setStoreAddress] = useState('');
  const [deliveryPricing, setDeliveryPricing] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showDeliveryPricing, setShowDeliveryPricing] = useState(false);

  // Color options matching the image
  const colorOptions = [
    { name: 'Red', value: '#E53E3E', class: 'bg-red-500' },
    { name: 'Blue', value: '#0000FF', class: 'bg-blue-500' },
    { name: 'Purple', value: '#800080', class: 'bg-purple-600' },
    { name: 'Green', value: '#008000', class: 'bg-green-500' },
    { name: 'Orange', value: '#FFA500', class: 'bg-orange-500' },
    { name: 'Lime', value: '#00FF48', class: 'bg-lime-400' },
    { name: 'Dark Purple', value: '#4C1066', class: 'bg-purple-800' },
    { name: 'Yellow', value: '#FBFF00', class: 'bg-yellow-400' },
    { name: 'Pink', value: '#FF0066', class: 'bg-pink-500' },
    { name: 'Dark Green', value: '#374F23', class: 'bg-green-800' },
  ];

  useEffect(() => {
    if (!isOpen) return;

    // Load saved data
    const savedAddress = Cookies.get('registrationStoreAddress');
    const savedDelivery = Cookies.get('registrationDeliveryPricing');
    const savedColor = Cookies.get('registrationSelectedColor');

    if (savedAddress) setStoreAddress(savedAddress);
    if (savedDelivery) setDeliveryPricing(savedDelivery);
    if (savedColor) setSelectedColor(savedColor);
  }, [isOpen]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    Cookies.set('registrationSelectedColor', color, { expires: 7 });
  };

  const handleAddStoreAddress = () => {
    setShowAddAddress(true);
  };

  const handleBackFromAddress = () => {
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
      const savedEmail = Cookies.get('registrationEmail') || 'user@example.com';
      onRegister(savedEmail);
    }, 2000);
  };

  const handleBack = () => {
    if (onBackToLevel3) {
      onBackToLevel3();
    } else {
      onClose();
    }
  };

  const handleViewBenefits = () => {
    setShowBenefits(!showBenefits);
  };

  if (!isOpen) return null;

  // Show Add New Address form
  if (showAddAddress) {
    return (
      <AddNewAddress
        isOpen={true}
        onSave={handleSaveAddress}
        onBack={handleBackFromAddress}
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
    <div className="w-1/2 flex flex-col bg-[#F9F9F9] max-h-[666px]">
      {/* Fixed Header */}
      <div className="p-6 pb-4 flex-shrink-0">
        <div className="text-center mb-6">
          <h2 className="text-[24px] font-medium text-[#E53E3E] mb-2">Register</h2>
          <p className="text-[14px] text-gray-500">Create a free account today</p>
        </div>

        {/* Level 3 Badge */}
        <div className="mb-2 border border-[#E53E3E] rounded-lg p-4">
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
            <div className="w-[23px] h-[23px] bg-[#E53E3E] text-white rounded-full flex items-center justify-center text-[12px] font-bold">
              1
            </div>
            <div className="flex-1 h-0.5 bg-[#E53E3E]"></div>
            <div className="w-[23px] h-[23px] bg-[#E53E3E] text-white rounded-full flex items-center justify-center text-[12px] font-bold">
              2
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content with Custom Scrollbar */}
      <div 
        className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar" 
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#CBD5E0 #F7FAFC'
        }}
      >
        {/* Add Store Address */}
        <div className="mb-3">
          <button
            onClick={handleAddStoreAddress}
            className="flex items-center justify-between py-4 w-[389px] rounded-2xl bg-[#FFFFFF] border border-[#CDCDCD] shadow-medium hover:bg-gray-50 transition-colors"
          >
            <p className="text-[14px] ml-4 text-[#000000]">Add Store Address</p>
            <img src="/public/CaretLeft.svg" alt="Store Address" className="w-5 h-5 mr-3 text-gray-400" />
          </button>
        </div>

        {/* Add Delivery Pricing */}
        <div className="mb-6">
          <button
            onClick={handleAddDeliveryPricing}
            className="flex items-center justify-between py-4 border border-[#CDCDCD] w-[389px] rounded-2xl bg-[#FFFFFF] shadow-medium hover:bg-gray-50 transition-colors"
          >
            <p className="text-[14px] ml-4 text-[#000000]">Add Delivery pricing</p>
            <img src="/public/CaretLeft.svg" alt="Delivery" className="w-5 h-5 mr-3 text-gray-400" />
          </button>
        </div>

        {/* Color Selection */}
        <div className="mb-8">
          <p className="text-[14px] text-[#000000] mb-6">
            Select a color that suits your brand and your store shall be customized as such
          </p>
          
          {/* Color Grid */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            {colorOptions.map((color, index) => (
              <button
                key={index}
                onClick={() => handleColorSelect(color.value)}
                className={`w-12 h-12 rounded-full ${color.class} ${
                  selectedColor === color.value ? 'ring-2 ring-[#000000] ring-offset-2' : ''
                } hover:scale-110 transition-transform`}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons - Now part of scrollable content */}
        <div className="space-y-4 mt-8">
          {/* Back Arrow and Complete Registration Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-50"
            >
              <img src={IMAGES.backarrow} alt="Back" className="w-18 h-18 text-gray-400" />
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !selectedColor}
              className="flex-1 bg-[#E53E3E] text-[14px] hover:bg-red-600 text-white font-medium py-4 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                'Complete Registration'
              )}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full bg-[#EBEBEB] text-[14px] text-[#000000] font-medium py-4 px-6 rounded-xl transition-colors hover:bg-gray-300"
          >
            Login
          </button>
        </div>
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
              Continue with Registration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterLevel4;
