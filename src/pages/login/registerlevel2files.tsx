import React, { useState } from 'react';
import Cookies from 'js-cookie';
import IMAGES from '../../constants';

interface RegisterLevel2FilesProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
  onBackToLevel2: () => void;
  onProceedToLevel3: () => void;
}

const RegisterLevel2Files: React.FC<RegisterLevel2FilesProps> = ({ 
  isOpen, 
  onClose, 
  onBackToLogin,
  onBackToLevel2,
  onProceedToLevel3
}) => {
  const [ninSlipFile, setNinSlipFile] = useState<File | null>(null);
  const [cacCertificateFile, setCacCertificateFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLevel] = useState(2);

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

  const handleProceedToLevel3 = async () => {
    // Validate required files
    if (!ninSlipFile || !cacCertificateFile) {
      alert('Please upload both NIN Slip and CAC Certificate');
      return;
    }

    setIsLoading(true);

    // Simulate processing and then proceed to Level 3
    setTimeout(() => {
      // Store Level 2 file upload data in cookies
      const level2FileData = {
        ninSlipFileName: ninSlipFile.name,
        cacCertificateFileName: cacCertificateFile.name,
        level2FilesCompletedTime: new Date().toISOString(),
        currentLevel: 2,
        isLevel2FilesCompleted: true,
      };

      // Get existing registration data and merge with Level 2 file data
      const existingData = Cookies.get('userRegistration');
      const updatedData = existingData 
        ? { ...JSON.parse(existingData), ...level2FileData }
        : level2FileData;

      // Update cookies
      Cookies.set('userRegistration', JSON.stringify(updatedData), { expires: 7 });

      setIsLoading(false);
      
      // Callback to parent to open Level 3
      onProceedToLevel3();
    }, 1000);
  };

  const handleViewBenefits = () => {
    // Handle view benefits action
    console.log('View benefits clicked');
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
          <img src={IMAGES.Xcircle} alt="Close" className="w-8 h-8" />
        </button>

        {/* Left Side */}
        <div className="w-1/2 bg-gradient-to-br from-red-500 to-red-600 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <img 
              src={IMAGES.login} 
              alt="Woman with phone" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Level 2 Files Form with Scrollbar */}
        <div className="w-1/2 flex flex-col">
          {/* Fixed Header - Outside scroll area */}
          <div className="p-8 pb-4">
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
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-8 pb-8">
            <form onSubmit={(e) => { e.preventDefault(); handleProceedToLevel3(); }} className="space-y-6">
              
              {/* NIN Slip Upload */}
              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-3">
                  Upload a copy of your NIN Slip
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors">
                  <input
                    type="file"
                    id="ninSlip"
                    onChange={handleNinSlipUpload}
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                  <label htmlFor="ninSlip" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <img src={IMAGES.camera} alt="Upload" className="w-8 h-8 text-gray-400" />
                      </div>
                      {ninSlipFile ? (
                        <div className="text-center">
                          <p className="text-[14px] font-medium text-green-600 mb-1">File uploaded:</p>
                          <p className="text-[12px] text-gray-600">{ninSlipFile.name}</p>
                        </div>
                      ) : (
                        <p className="text-[14px] text-gray-500">Upload a clear picture of your NIN Slip</p>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* CAC Certificate Upload */}
              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-3">
                  Upload a copy of your CAC Certificate
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors">
                  <input
                    type="file"
                    id="cacCertificate"
                    onChange={handleCacCertificateUpload}
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                  <label htmlFor="cacCertificate" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <img src={IMAGES.camera} alt="Upload" className="w-8 h-8 text-gray-400" />
                      </div>
                      {cacCertificateFile ? (
                        <div className="text-center">
                          <p className="text-[14px] font-medium text-green-600 mb-1">File uploaded:</p>
                          <p className="text-[12px] text-gray-600">{cacCertificateFile.name}</p>
                        </div>
                      ) : (
                        <p className="text-[14px] text-gray-500">Upload a clear picture of your CAC Certificate</p>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Additional spacing for scrolling */}
              <div className="h-6"></div>
            </form>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Back Arrow, Proceed, and Home Buttons */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={onBackToLevel2}
                  className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-50"
                >
                  <img src={IMAGES.backarrow} alt="Back" className="w-18 h-18" />
                </button>
                <button
                  type="button"
                  onClick={handleProceedToLevel3}
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
                    'Proceed to Level 3'
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLevel2Files;
