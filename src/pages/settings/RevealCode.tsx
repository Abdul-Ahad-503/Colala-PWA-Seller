import React from 'react';

interface RevealCodeProps {
  isOpen: boolean;
  onClose: () => void;
  onRevealCode: () => void;
}

const RevealCode: React.FC<RevealCodeProps> = ({ isOpen, onClose, onRevealCode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  backdrop-brightness-50   flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-[389px] h-[245px] mx-4 shadow-2xl">
        {/* Warning Icon */}
        <div className="flex justify-center mb-6 pop_up">
          <div className="flex items-center justify-center w-12 h-12 bg-[#FF000033] rounded-full">
            <div className="flex items-center justify-center w-16 h-16  rounded-full">
              <span><img src="/public/Vector.svg" alt="Alert Icon" /></span>
            </div>
          </div>
        </div>

        {/* Confirmation Text */}
        <div className="text-center mb-8">
          <p className="text-gray-800 text-[14px] font-medium">
            Do you confirm that your product has been delivered?
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-white border border-[#CACACA] text-gray-700 rounded-2xl text-[12px] font-medium hover:bg-gray-200 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={onRevealCode}
            className="flex-1 py-3 px-4 bg-[#E53E3E] text-white rounded-2xl text-[12px] font-medium hover:bg-red-600 transition-colors"
          >
            Reveal Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevealCode;
