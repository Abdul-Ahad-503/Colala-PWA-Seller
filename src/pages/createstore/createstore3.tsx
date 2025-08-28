import React, { useState, useEffect, useRef } from 'react';
import IMAGES from '../../constants';

interface CreateStore3Props {
  onBackToCategories: () => void;
  onProceedToNext: () => void;
}

const CreateStore3: React.FC<CreateStore3Props> = ({ onBackToCategories, onProceedToNext }) => {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [ninNumber, setNinNumber] = useState('');
  const [cacNumber, setCacNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      onProceedToNext();
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
    console.log('View benefits clicked');
  };

  const handleSaveAndExit = () => {
    console.log('Save and Exit');
  };

  return (
    <div className="w-[680px]">
      {/* Header */}
       <div className="mb-6 border border-[#E53E3E] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[20px] font-medium text-[#E53E3E]">Level 2</span>
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

      {/* Form Fields */}
      <div className="w-[680px] space-y-4">
        {/* Business Name */}
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="Business Name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-[#FFFFFF] text-gray-700 text-[14px]"
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
                <div className="absolute top-full ml-1 left-0 shadow-2xl w-[670px] h-[247px] mt-1 bg-white rounded-2xl border border-gray-200   z-10 overflow-hidden p-2">
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
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-[#FFFFFF] text-gray-700 text-[14px]"
          required
        />

        {/* CAC Number */}
        <input
          type="text"
          value={cacNumber}
          onChange={(e) => setCacNumber(e.target.value)}
          placeholder="CAC Number"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-[#FFFFFF] text-gray-700 text-[14px]"
          required
        />
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex items-center space-x-4">
        {/* Back Arrow */}
        <button
          onClick={onBackToCategories}
          className="p-2 rounded-lg transition-colors"
        >
          <img src={IMAGES.backarrow} alt="Back" />
        </button>








        {/* Save and Exit Button */}
        <button
          onClick={handleProceed}
          disabled={isLoading}
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

        {/* Proceed Button */}
        <button
          onClick={handleSaveAndExit}
          className="w-[300px] h-[60px] bg-[#000000] text-[14px] text-white font-sm rounded-2xl hover:bg-gray-800 transition-colors"
        >
          Save & Exit
        </button>
      </div>
    </div>
  );
};

export default CreateStore3;
