import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import IMAGES from '../../constants';

interface RegisterLevel3Props {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (email: string) => void;
  onBackToLogin: () => void;
  onBackToLevel2?: () => void;
  onProceedToLevel4?: () => void;
}

const RegisterLevel3: React.FC<RegisterLevel3Props> = ({
  isOpen,
  onClose,
  onRegister,
  onBackToLogin,
  onBackToLevel2,
  onProceedToLevel4
}) => {
  const [storeVideo, setStoreVideo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const savedStoreVideo = Cookies.get('registrationStoreVideo');
    if (savedStoreVideo) {
      try {
        const videoData = JSON.parse(savedStoreVideo);
        console.log('Store video data found:', videoData);
      } catch (error) {
        console.error('Error parsing store video data:', error);
      }
    }
  }, [isOpen]);

  const handleStoreVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStoreVideo(file);
      Cookies.set('registrationStoreVideo', JSON.stringify({
        name: file.name,
        size: file.size,
        type: file.type
      }), { expires: 7 });
    }
  };

  const handleSubmit = () => {
    if (!storeVideo) {
      alert('Please upload a video.');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      if (onProceedToLevel4) {
        onProceedToLevel4();
      } else {
        const savedEmail = Cookies.get('registrationEmail') || 'user@example.com';
        onRegister(savedEmail);
      }
    }, 1000);
  };

  const handleBack = () => {
    if (onBackToLevel2) {
      onBackToLevel2();
    } else {
      onClose();
    }
  };

  const handleViewBenefits = () => {
    setShowBenefits(!showBenefits);
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white p-6 relative min-h-screen">
      {/* Header */}
      <div className="text-center mb-3 ml-6">
        <h2 className="text-[24px] font-medium text-[#E53E3E] mb-1 mt-6">Register</h2>
        <p className="text-[14px] text-gray-500">Create a free account today</p>
      </div>

      {/* Level 3 Badge */}
      <div className="relative mx-auto w-[389px] h-[93px] mb-6">
        <div className="border-2 border-red-400 rounded-2xl p-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-red-500 font-bold text-[20px]">Level 3</span>
            </div>
            <button
              onClick={handleViewBenefits}
              className="text-red-500 font-medium text-[14px] hover:text-red-600 transition-colors"
            >
              <u>View Benefits</u>
            </button>
          </div>
          <div className="flex items-center justify-end mt-2">
            <div className="w-[23px] h-[23px] bg-[#E53E3E] text-white rounded-full flex items-center justify-center text-[12px] font-bold">
              1
            </div>
            <div className="flex-1 h-[0.1px] bg-[#ADADAD]"></div>
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-[12px]">
              2
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-sm mx-auto">
        {/* Physical Store Question */}
        <div className="mb-6 w-[385px] h-[60px]">
          <div className="flex items-center justify-between py-6 rounded-2xl bg-white shadow-lg border border-[#CDCDCD]">
            <p className="text-[14px] ml-4 text-gray-900">Does your business have a physical store</p>
            <svg className="w-5 h-5 mr-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Video Upload Section */}
        <div className="mb-8">
          <p className="text-[14px] text-[#000000] mb-4">Upload a 1 minute video of your store</p>

          <div className="text-center mb-8 border border-[#CDCDCD] bg-white rounded-2xl p-8 shadow-lg">
            <input
              type="file"
              id="storeVideo"
              onChange={handleStoreVideoUpload}
              accept="video/mp4,video/webm,video/ogg"
              className="hidden"
            />
            <label htmlFor="storeVideo" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                {storeVideo ? (
                  <div className="text-center">
                    <p className="text-[11px] font-medium text-green-600 mb-1 -mt-6">Video uploaded:</p>
                    <p className="text-[10px] text-gray-600">{storeVideo.name}</p>
                  </div>
                ) : (
                  <p className="text-[10px] -mt-7 text-gray-500">Select video to upload</p>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 -mt-2">
          {/* Back Arrow, Proceed, and Home Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-50"
            >
              <img src={IMAGES.backarrow} alt="Back Arrow" className="w-[54px] h-[60px]" />
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !storeVideo}
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
            className="w-[389px] h-[60px] bg-[#EBEBEB] text-[14px] text-[#000000] font-medium py-4 px-6 rounded-xl transition-colors hover:bg-gray-300"
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
              <h4 className="font-semibold text-gray-900 mb-2">Video Store Showcase</h4>
              <p className="text-gray-600 text-sm">Display your store with a compelling 1-minute video that shows customers what makes your business special.</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Enhanced Visibility</h4>
              <p className="text-gray-600 text-sm">Get priority placement in search results and featured sections of our marketplace.</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Premium Support</h4>
              <p className="text-gray-600 text-sm">Access to dedicated customer support and priority assistance for all your business needs.</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Analytics Dashboard</h4>
              <p className="text-gray-600 text-sm">Detailed insights into your store performance, customer behavior, and sales analytics.</p>
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

export default RegisterLevel3;
