import React from 'react';

interface BusinessTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: string) => void;
}

const BusinessTypeModal: React.FC<BusinessTypeModalProps> = ({ isOpen, onClose, onSelect }) => {
  const handleOptionSelect = (type: string) => {
    onSelect(type);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-[430px] h-[190px] shadow-xl">
        {/* Header */}
        <div className="flex items-center  justify-center pop_up relative p-6 pb-4 mb-4">
          <h2 className="text-[20px]  font-semibold text-black flex-1 text-center">Business Type</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 ml-4"
          >
            <img src="/public/Vector.svg" alt="Close" className='w-5 h-5 ml-2 -mt-4' />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 -mt-4">
          {/* Business type options */}
          <div className="space-y-1">
            <button
              onClick={() => handleOptionSelect('physical')}
              className="w-full p-2.5 bg-[#EDEDED] hover:bg-gray-200 rounded-lg text-left transition-colors"
            >
              <span className="text-[12px] text-gray-700 ">Yes, I have a physical store</span>
            </button>
            
            <button
              onClick={() => handleOptionSelect('home')}
              className="w-full p-2.5 bg-[#EDEDED]  hover:bg-gray-200 rounded-lg text-left transition-colors"
            >
              <span className="text-[12px] text-gray-700 ">No, I run my business from home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessTypeModal;
