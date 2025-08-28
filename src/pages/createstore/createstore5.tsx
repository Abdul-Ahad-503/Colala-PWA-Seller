import React, { useState } from 'react';
import IMAGES from '../../constants';
import BusinessTypeModal from './businesstypemodal';

interface CreateStore5Props {
  onBackToLevel2Files: () => void;
  onProceedToNext: () => void;
}

const CreateStore5: React.FC<CreateStore5Props> = ({ onBackToLevel2Files, onProceedToNext }) => {
  const [storeVideo, setStoreVideo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBusinessTypeModal, setShowBusinessTypeModal] = useState(false);

  const handleStoreVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStoreVideo(file);
    }
  };

  const handleProceed = () => {
    if (!storeVideo) {
      alert('Please upload a video.');
      return;
    }

    setIsLoading(true);
    
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

  const handleBusinessTypeSelect = (type: string) => {
    console.log('Business type selected:', type);
  };

  return (
    <div className="w-[680px]">
      {/* Header */}
      <div className="mb-6 border border-[#E53E3E] w-[680px] h-[93px] rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[20px] font-medium text-[#E53E3E]">Level 3</span>
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
          <div className="w-[23px] h-[23px] bg-[#CACACA] text-[#00000080] rounded-full flex items-center justify-center text-[14px] font-bold">
            2
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-[680px] space-y-6">
        {/* Physical Store Question */}
        <div className="mb-6">
          <button
            onClick={() => setShowBusinessTypeModal(true)}
            className="w-full flex items-center justify-between py-4 px-4 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <span className="text-[14px] text-gray-700">Does your business have a physical store</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Video Upload Section */}
        <div className="mb-8">
          <label className="block text-[14px] font-medium text-[#000000] mb-4">
            Upload a 1 minute video of your store
          </label>

          <div className="border border-gray-200 rounded-lg p-8 bg-[#FFFFFF] text-center hover:bg-gray-50 transition-colors">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                {storeVideo ? (
                  <div className="text-center">
                    <p className="text-[14px] font-medium text-green-600 mb-1">Video uploaded:</p>
                    <p className="text-[12px] text-gray-600">{storeVideo.name}</p>
                  </div>
                ) : (
                  <p className="text-[12px] text-gray-500 -mt-6">Select video to upload</p>
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
          onClick={onBackToLevel2Files}
          className="p-2 rounded-lg transition-colors"
        >
          <img src={IMAGES.backarrow} alt="Back" />
        </button>







        {/* Save and Exit Button */}
        <button
          onClick={handleProceed}
          disabled={isLoading || !storeVideo}
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

      {/* Business Type Modal */}
      <BusinessTypeModal
        isOpen={showBusinessTypeModal}
        onClose={() => setShowBusinessTypeModal(false)}
        onSelect={handleBusinessTypeSelect}
      />
    </div>
  );
};

export default CreateStore5;
