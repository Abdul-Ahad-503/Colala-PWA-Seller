import React, { useState } from 'react';
import IMAGES from '../../constants';

interface CreateStore4Props {
  onBackToLevel2: () => void;
  onProceedToNext: () => void;
}

const CreateStore4: React.FC<CreateStore4Props> = ({ onBackToLevel2, onProceedToNext }) => {
  const [ninSlipFile, setNinSlipFile] = useState<File | null>(null);
  const [cacCertificateFile, setCacCertificateFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNinSlipUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNinSlipFile(file);
    }
  };

  const handleCacCertificateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCacCertificateFile(file);
    }
  };

  const handleProceed = async () => {
    // Validate required files
    if (!ninSlipFile || !cacCertificateFile) {
      alert('Please upload both NIN Slip and CAC Certificate');
      return;
    }

    setIsLoading(true);

    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      onProceedToNext();
    }, 1000);
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
      <div className="mb-6 border border-[#E53E3E] w-[680px] h-[93px] rounded-lg p-3">
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
          <div className="w-[23px] h-[23px] bg-[#E53E3E] text-white rounded-full flex items-center justify-center text-[14px] font-bold">
            1
          </div>
          <div className="flex-1 h-0.5 bg-[#ADADAD]"></div>
          <div className="w-[23px] h-[23px] bg-[#E53E3E] text-white rounded-full flex items-center justify-center text-[14px] font-bold">
            2
          </div>
          
          
        </div>
      </div>

      {/* Content Area with scroll */}
      <div className="max-h-[400px] overflow-y-auto">
        {/* NIN Slip Upload */}
        <div className="mb-6">
          <label className="block text-[14px] font-medium text-[#000000] mb-3">
            Upload a copy of your NIN Slip
          </label>
          <div className="border border-gray-200 rounded-lg p-8 bg-[#FFFFFF] text-center hover:bg-gray-50 transition-colors">
            <input
              type="file"
              id="ninSlip"
              onChange={handleNinSlipUpload}
              accept="image/*,.pdf"
              className="hidden"
            />
            <label htmlFor="ninSlip" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <img src="/public/Camera11.svg" alt="Upload" className="w-8 h-8 text-gray-400" />
                </div>
                {ninSlipFile ? (
                  <div className="text-center">
                    <p className="text-[14px] font-medium text-green-600 mb-1">File uploaded:</p>
                    <p className="text-[12px] text-gray-600">{ninSlipFile.name}</p>
                  </div>
                ) : (
                  <p className="text-[12px] text-gray-500 -mt-6">Upload a clear picture of your NIN Slip</p>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* CAC Certificate Upload */}
        <div className="mb-6">
          <label className="block text-[14px] font-medium text-[#000000] mb-3">
            Upload a copy of your CAC Certificate
          </label>
          <div className="border border-gray-200 rounded-lg p-8 bg-[#FFFFFF] text-center hover:bg-gray-50 transition-colors">
            <input
              type="file"
              id="cacCertificate"
              onChange={handleCacCertificateUpload}
              accept="image/*,.pdf"
              className="hidden"
            />
            <label htmlFor="cacCertificate" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                 <img src="/public/Camera11.svg" alt="Upload" className="w-8 h-8 text-gray-400" />
                </div>
                {cacCertificateFile ? (
                  <div className="text-center">
                    <p className="text-[14px] font-medium text-green-600 mb-1">File uploaded:</p>
                    <p className="text-[12px] text-gray-600">{cacCertificateFile.name}</p>
                  </div>
                ) : (
                  <p className="text-[12px] text-gray-500 -mt-6">Upload a clear picture of your CAC Certificate</p>
                )}
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex items-center space-x-4">
        {/* Back Arrow */}
        <button
          onClick={onBackToLevel2}
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
            'Proceed to Level 3'
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

export default CreateStore4;
