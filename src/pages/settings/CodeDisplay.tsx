import React from 'react';

interface CodeDisplayProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyCode: () => void;
  code: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ isOpen, onClose, onCopyCode, code }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-[389px] h-[245px] mx-4 shadow-2xl">
        {/* Header Text */}
        <div className="text-center mb-6 pop_up">
          <p className="text-gray-800 text-[12px] font-medium">
            Dear customer your code is
          </p>
        </div>

        {/* Code Display */}
        <div className="text-center mb-8">
          <p className="text-black text-[50px] font-bold">
            {code}
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
            onClick={onCopyCode}
            className="flex-1 py-3 px-4 bg-[#E53E3E] text-white rounded-2xl text-[12px] font-sm hover:bg-red-600 transition-colors"
          >
            Copy Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeDisplay;
