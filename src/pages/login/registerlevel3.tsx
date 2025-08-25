import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import IMAGES from '../../constants';

interface RegisterLevel3Props {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (email: string) => void;
  onBackToLogin: () => void;
  onBackToLevel2?: () => void;
}

const RegisterLevel3: React.FC<RegisterLevel3Props> = ({
  isOpen,
  onClose,
  onRegister,
  onBackToLogin,
  onBackToLevel2
}) => {
  const [storeVideo, setStoreVideo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const currentLevel = 3;

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
    }
  };

  const handleSubmit = async () => {
    if (!storeVideo) {
      return;
    }

    setIsLoading(true);
    try {
      const storeVideoData = {
        name: storeVideo.name,
        size: storeVideo.size,
        type: storeVideo.type,
        lastModified: storeVideo.lastModified
      };
      
      Cookies.set('registrationStoreVideo', JSON.stringify(storeVideoData), { expires: 7 });
      
      alert('Registration completed successfully!');
      onClose();
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('There was an error submitting your registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (onBackToLevel2) {
      onBackToLevel2();
    }
  };

  const handleViewBenefits = () => {
    setShowBenefits(!showBenefits);
  };

  if (!isOpen) return null;

  return (
    <div className="w-1/2 flex flex-col">
      {/* Fixed Header */}
      <div className="p-8 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 mr-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-[24px] font-bold text-gray-900">Register</h2>
            </div>
          </div>

          <div className="mb-4">
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
                <div className="flex-1 h-0.5 bg-[#E53E3E]"></div>
                <div className="w-[23px] h-[23px] bg-[#E53E3E] text-white rounded-full flex items-center justify-center text-[12px] font-bold">
                  3
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-3">
                Store Video
              </label>
              <p className="text-[12px] text-gray-600 mb-3">Take a nice 20-second video about your store</p>
              <div className="border border-[#CDCDCD] rounded-2xl p-8 text-center bg-[#FFFFFF] transition-colors">
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
                      <img src="/public/camera.svg" alt="Upload" className="w-8 h-8 text-gray-400" />
                    </div>
                    {storeVideo ? (
                      <div className="text-center">
                        <p className="text-[14px] font-medium text-green-600 mb-1">Video uploaded:</p>
                        <p className="text-[12px] text-gray-600">{storeVideo.name}</p>
                      </div>
                    ) : (
                      <p className="text-[10px] -mt-6 text-gray-500">Upload a 20-second video about your store</p>
                    )}
                  </div>
                </label>
              </div>
            </div>

            <div className="h-6"></div>
          </form>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleBack}
                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-50"
              >
                <img src={IMAGES.backarrow} alt="Back" className="w-18 h-18" />
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || !storeVideo}
                className="flex-1 bg-red-500 text-[10px] hover:bg-red-600 text-white font-sm py-5 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-black text-[14px] hover:bg-gray-800 text-white font-sm py-4 px-6 rounded-xl transition-colors"
              >
                Home
              </button>
            </div>

            <button
              type="button"
              onClick={onBackToLogin}
              className="w-full bg-[#EBEBEB] text-[14px] text-[#000000] font-medium py-4 px-6 rounded-xl transition-colors"
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
              <p className="text-gray-600 text-sm">Display your store with a compelling 20-second video that shows customers what makes your business special.</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Enhanced Visibility</h4>
              <p className="text-gray-600 text-sm">Level 3 stores get premium placement in search results and featured listings.</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Complete Profile</h4>
              <p className="text-gray-600 text-sm">Access to all platform features including advanced analytics and customer insights.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterLevel3;
