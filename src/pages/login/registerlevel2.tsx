import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import IMAGES from '../../constants';
import RegisterLevel2Files from './registerlevel2files';
import RegisterLevel3 from './registerlevel3';

interface RegisterLevel2Props {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (email: string) => void;
  onBackToLogin: () => void;
  onBackToLevel1: () => void;
  onProceedToLevel3?: () => void;
}

const RegisterLevel2: React.FC<RegisterLevel2Props> = ({ 
  isOpen, 
  onClose, 
  onRegister, 
  onBackToLogin,
  onBackToLevel1,
  onProceedToLevel3
}) => {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [ninNumber, setNinNumber] = useState('');
  const [cacNumber, setCacNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLevel] = useState(2);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLevel2Files, setShowLevel2Files] = useState(false);
  const [showLevel3, setShowLevel3] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const businessTypeOptions = [
    { value: 'general', label: 'General' },
    { value: 'plc', label: 'PLC' },
    { value: 'ltd', label: 'LTD' },
    { value: 'inc', label: 'Inc' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProceed = async () => {
    // Validate required fields
    if (!businessName || !businessType || !ninNumber || !cacNumber) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    // Simulate processing and then proceed to Level 2 Files (NIN/CAC upload)
    setTimeout(() => {
      // Store Level 2 registration data in cookies
      const level2Data = {
        businessName,
        businessType,
        ninNumber,
        cacNumber,
        level2CompletedTime: new Date().toISOString(),
        currentLevel: 2,
        isLevel2Completed: true,
      };

      // Get existing registration data and merge with Level 2 data
      const existingData = Cookies.get('userRegistration');
      const updatedData = existingData 
        ? { ...JSON.parse(existingData), ...level2Data }
        : level2Data;

      // Update cookies
      Cookies.set('userRegistration', JSON.stringify(updatedData), { expires: 7 });

      setIsLoading(false);
      
      // Open Level 2 file upload step (NIN/CAC uploads)
      setShowLevel2Files(true);
    }, 1000);
  };

  const handleBusinessTypeSelect = (option: { value: string; label: string }) => {
    setBusinessType(option.value);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getSelectedBusinessTypeLabel = () => {
    const selected = businessTypeOptions.find(option => option.value === businessType);
    return selected ? selected.label : 'Business Type';
  };

  const handleViewBenefits = () => {
    // Handle view benefits action
    console.log('View benefits clicked');
  };

  const handleBackToLevel2 = () => {
    setShowLevel2Files(false);
  };

  const handleProceedToLevel3 = () => {
    setShowLevel2Files(false);
    if (onProceedToLevel3) {
      onProceedToLevel3();
    } else {
      // Fallback to internal state if prop not provided
      setShowLevel3(true);
    }
  };

  const handleLevel3Complete = (email: string) => {
    onRegister(email);
    setShowLevel3(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl overflow-hidden w-[876px] max-w-4xl h-[666px] flex relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 -mt-3 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
        >
          <img src={IMAGES.Xcircle} alt="Close" className="w-8 h-8 ml-10" />
        </button>

        {/* Left Side - Same as before */}
        <div className="w-1/2 bg-gradient-to-br from-red-500 to-red-600 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <img 
              src={IMAGES.login} 
              alt="Woman with phone" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Level 2 Form (No scrollbar needed) */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-[24px] font-semibold text-[#E53E3E] mb-2">Register</h2>
            <p className="text-gray-500 text-[14px]">Create a free account today</p>
          </div>

          {/* Level Progress */}
          <div className="mb-6 border border-[#E53E3E] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[20px] font-medium text-[#E53E3E]">Level {currentLevel}</span>
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

          {/* Level 2 Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleProceed(); }} className="space-y-4">
            {/* Business Name */}
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Business Name"
              className="w-full px-4 py-3 border border-[#CDCDCD] rounded-lg bg-[#FFFFFF] text-gray-700 text-[14px]"
              required
            />

            {/* Business Type Custom Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={toggleDropdown}
                className="w-full px-4 py-3 border border-[#CDCDCD] rounded-lg bg-[#FFFFFF] text-black text-[14px] cursor-pointer flex justify-between items-center"
              >
                <span className={businessType ? 'text-black' : 'text-gray-500'}>
                  {getSelectedBusinessTypeLabel()}
                </span>
                <div className="flex items-center">
                  <svg 
                    className={`w-5 h-5 text-gray-400 transform transition-transform ${isDropdownOpen ? 'rotate-90' : 'rotate-0'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              {/* Dropdown Options */}
              {isDropdownOpen && (
                <div className="absolute top-full -ml-6 left-0 shadow-2xl w-[420px] h-[247px] mt-1 bg-white rounded-2xl border border-gray-200   z-10 overflow-hidden p-2">
                  {businessTypeOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleBusinessTypeSelect(option)}
                      className="px-4 py-3 text-[14px] text-black bg-[#EDEDED] hover:bg-[#EDEDED] cursor-pointer rounded-lg mb-2 last:mb-0 transition-colors"
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* NIN Number */}
            <input
              type="text"
              value={ninNumber}
              onChange={(e) => setNinNumber(e.target.value)}
              placeholder="NIN Number"
              className="w-full px-4 py-3 border border-[#CDCDCD] rounded-lg bg-[#FFFFFF] text-gray-700 text-[14px]"
              required
            />

            {/* CAC Number */}
            <input
              type="text"
              value={cacNumber}
              onChange={(e) => setCacNumber(e.target.value)}
              placeholder="CAC Number"
              className="w-full px-4 py-3 border border-[#CDCDCD] rounded-lg bg-[#FFFFFF] text-gray-700 text-[14px]"
              required
            />

            {/* Action Buttons */}
            <div className="space-y-4 mt-6">
              {/* Back Arrow, Proceed, and Home Buttons */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={onBackToLevel1}
                  className="w-12 h-12 rounded-full  flex items-center justify-center hover:bg-gray-50"
                >
                  <img src={IMAGES.backarrow} alt="Back" className="w-18 h-18" />
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-red-500 text-[14px] hover:bg-red-600 text-white font-medium py-4 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-black text-[14px] hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-xl transition-colors"
                >
                  Home
                </button>
              </div>

              {/* Login Button */}
              <button
                type="button"
                onClick={onBackToLogin}
                className="w-full bg-gray-100 text-[14px] hover:bg-gray-200 text-[#000000] font-medium py-4 px-6 rounded-xl transition-colors"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Level 2 Files Registration Modal */}
      <RegisterLevel2Files
        isOpen={showLevel2Files}
        onClose={onClose}
        onBackToLogin={onBackToLogin}
        onBackToLevel2={handleBackToLevel2}
        onProceedToLevel3={handleProceedToLevel3}
      />

      {/* Level 3 Registration Modal */}
      <RegisterLevel3
        isOpen={showLevel3}
        onClose={onClose}
        onRegister={handleLevel3Complete}
        onBackToLogin={onBackToLogin}
        onBackToLevel2={() => setShowLevel3(false)}
      />
    </div>
  );
};

export default RegisterLevel2;
