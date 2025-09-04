import React, { useState } from 'react';

interface RequestCodeProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: (code: string) => void;
}

const RequestCode: React.FC<RequestCodeProps> = ({ isOpen, onClose, onProceed }) => {
  const [customerCode, setCustomerCode] = useState('');

  const handleProceed = () => {
    if (customerCode.trim()) {
      onProceed(customerCode);
      setCustomerCode(''); // Reset the input
    }
  };

  const handleGoBack = () => {
    setCustomerCode(''); // Reset the input
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-4xl p-6 w-[389px] mx-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-[12px] font-semibold text-gray-800">Input Customer code</h2>
        </div>

       

        {/* Input Field (Hidden but functional) */}
        <input
          type="text"
          value={customerCode}
          onChange={(e) => setCustomerCode(e.target.value)}
          className="w-full  rounded-lg p-3 mb-6 text-center text-lg"
          placeholder="Enter customer code"
          autoFocus
        />

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleGoBack}
            className="flex-1 py-4 px-4 bg-[white] border border-[#CACACA] text-[12px] text-black rounded-2xl font-medium  transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={handleProceed}
            className="flex-1 py-4 px-4 bg-primary text-[12px] text-white rounded-2xl font-medium hover:bg-red-600 transition-colors"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCode;
