import React, { useState } from 'react';
import IMAGES from '../../constants';
import ResetPassword from './resetpassword';
import CreateStore2 from './createstore2';
import CreateStore3 from './createstore3';
import CreateStore4 from './createstore4';
import CreateStore5 from './createstore5';
import CreateStore6 from './createstore6';

const CreateStore: React.FC = () => {
  const [storeName, setStoreName] = useState('');
  const [storeEmail, setStoreEmail] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [storeLocation, setStoreLocation] = useState('');
  const [showPhoneOnProfile, setShowPhoneOnProfile] = useState(true);
  const [referralCode, setReferralCode] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showUploadStep, setShowUploadStep] = useState(false);
  const [showCategoryStep, setShowCategoryStep] = useState(false);
  const [showLevel2Step, setShowLevel2Step] = useState(false);
  const [showLevel2FilesStep, setShowLevel2FilesStep] = useState(false);
  const [showLevel3Step, setShowLevel3Step] = useState(false);
  const [showLevel4Step, setShowLevel4Step] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const levels = [
    {
      number: 1,
      title: 'Level 1',
      subtitle: 'Percentage Completion',
      subtitle2: '80%',
      progress: 80,
      requirements: [
        'Level requirement 1',
        'Level requirement 2'
      ],
      benefits: [
        'Benefit 1',
        'Benefit 2'
      ]
    },
    {
      number: 2,
      title: 'Level 2',
      subtitle: 'Percentage Completion',
      subtitle2:'80%',
      progress: 80,
      requirements: [
        'Level requirement 1',
        'Level requirement 2'
      ],
      benefits: [
        'Benefit 1',
        'Benefit 2'
      ]
    },
    {
      number: 3,
      title: 'Level 3',
      subtitle: 'Percentage Completion',
      subtitle2:'80%',
      progress: 80,
      requirements: [
        'Level requirement 1',
        'Level requirement 2'
      ],
      benefits: [
        'Benefit 1',
        'Benefit 2'
      ]
    }
  ];

  const handleSaveAndExit = () => {
    console.log('Save and Exit');
  };

  const handleProceed = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowUploadStep(true);
    }, 1000);
  };

  const handleBackToForm = () => {
    setShowUploadStep(false);
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleBannerImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBannerImage(e.target.files[0]);
    }
  };

  const handleUploadProceed = () => {
    setIsLoading(true);
    
    // Move to category step instead of completing
    setTimeout(() => {
      setIsLoading(false);
      setShowUploadStep(false);
      setShowCategoryStep(true);
    }, 1000);
  };

  const handleBackToUpload = () => {
    setShowCategoryStep(false);
    setShowUploadStep(true);
  };

  const handleProceedToNext = () => {
    setIsLoading(true);
    
    // Move to Level 2 step
    setTimeout(() => {
      setIsLoading(false);
      setShowCategoryStep(false);
      setShowLevel2Step(true);
    }, 1000);
  };

  const handleBackToCategories = () => {
    setShowLevel2Step(false);
    setShowCategoryStep(true);
  };

  const handleProceedFromLevel2 = () => {
    setIsLoading(true);
    
    // Move to Level 2 Files step (NIN/CAC upload)
    setTimeout(() => {
      setIsLoading(false);
      setShowLevel2Step(false);
      setShowLevel2FilesStep(true);
    }, 1000);
  };

  const handleBackToLevel2 = () => {
    setShowLevel2FilesStep(false);
    setShowLevel2Step(true);
  };

  const handleProceedFromLevel2Files = () => {
    setIsLoading(true);
    
    // Move to Level 3 step
    setTimeout(() => {
      setIsLoading(false);
      setShowLevel2FilesStep(false);
      setShowLevel3Step(true);
    }, 1000);
  };

  const handleBackToLevel2Files = () => {
    setShowLevel3Step(false);
    setShowLevel2FilesStep(true);
  };

  const handleProceedFromLevel3 = () => {
    setIsLoading(true);
    
    // Move to Level 4 step (address, delivery pricing, color selection)
    setTimeout(() => {
      setIsLoading(false);
      setShowLevel3Step(false);
      setShowLevel4Step(true);
    }, 1000);
  };

  const handleBackToLevel3 = () => {
    setShowLevel4Step(false);
    setShowLevel3Step(true);
  };

  const handleProceedFromLevel4 = () => {
    alert('Store creation completed successfully!');
    // Here you can navigate to completion or dashboard
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      {/* Create Store Title */}
      <div className="bg-[#F9F9F9] px-6 py-4 ">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-[30px] mt-1 mb-0.1 font-semibold text-[#000000]">Create Store</h1>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto  rounded-lg  mt-6 overflow-hidden">
        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-80  p-6">
            {/* Level Cards */}
            <div className="space-y-6">
              {levels.map((level, index) => (
                <div key={level.number} className="relative">
                  {/* Level Number Circle - Outside the card */}
                  <div className={`absolute -left-6 top-6 w-8 h-8 -mt-4  rounded-full flex items-center justify-center border border-[#E53E3E] font-bold text-sm z-10 ${
                    level.number === 1 ? 'bg-red-500 text-white' : 'bg-[white] text-[#E53E3E]' 
                  }`}>
                    {level.number}
                  </div>

                  {/* Connecting Line */}
                  {index < levels.length - 1 && (
                    <div className="absolute  -left-2 top-14 -mt-4 w-[0.1rem] h-[350px] bg-[#E53E3E]"></div>
                  )}

                  {/* Level Card */}
                  <div className={`bg-white rounded-lg w-[310px] h-[330px]  p-4 ml-4 ${
                    level.number === 1 ? ' shadow-lg' : 'border-[white]'
                  }`}>
                    {/* Progress Circle */}
                    <div className="absolute mt-8 ml-18 top-4 right-4 w-6 h-6">
                      <svg className="w-6 h-6 ml-12  transform -rotate-90" viewBox="0 0 40 40">
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          stroke="#f3f4f6"
                          strokeWidth="3"
                          fill="transparent"
                        />
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          stroke="#ef4444"
                          strokeWidth="3"
                          fill="transparent"
                          strokeDasharray={`${level.progress} 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[6px] ml-24 font-semibold text-red-500">{level.progress}%</span>
                      </div>
                    </div>

                    {/* Level Content */}
                    <div className="mr-12">
                      <h3 className="text-base font-semibold text-[#E53E3E] mb-1">{level.title}</h3>
                      <p className="text-[8px] text-gray-600 mb-4">{level.subtitle}</p>
                       <p className="text-[12px] font-bold -mt-3 border-b border-[#D9D9D9]  p-1 text-[#E53E3E] mb-4">{level.subtitle2}</p>

                      {/* Level Requirements */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Level Requirements</h4>
                        <ul className="space-y-1 border-b border-gray-200 p-1">
                          {level.requirements.map((req, index) => (
                            <li key={index} className="flex items-center text-[12px] text-gray-600">
                             <img src="/public/tick.svg" alt="Icon" className="w-4 h-4 mr-2" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Level Benefits */}
                      <div className="mb-2">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Level Benefits</h4>
                        <ul className="space-y-1">
                          {level.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center text-[12px] text-gray-600">
                             <img src="/public/tick.svg" alt="Icon" className="w-4 h-4 mr-2" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* View Details Button */}
                      <button className="w-[280px]  bg-[#E53E3E] text-white text-[12px] font-medium py-3 px-4 rounded-lg hover:bg-[#E53E3E] transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 p-8 ml-12">
            {showLevel4Step ? (
              <CreateStore6
                onBackToLevel3={handleBackToLevel3}
                onProceedToNext={handleProceedFromLevel4}
              />
            ) : showLevel3Step ? (
              <CreateStore5
                onBackToLevel2Files={handleBackToLevel2Files}
                onProceedToNext={handleProceedFromLevel3}
              />
            ) : showLevel2FilesStep ? (
              <CreateStore4
                onBackToLevel2={handleBackToLevel2}
                onProceedToNext={handleProceedFromLevel2Files}
              />
            ) : showLevel2Step ? (
              <CreateStore3
                onBackToCategories={handleBackToCategories}
                onProceedToNext={handleProceedFromLevel2}
              />
            ) : showCategoryStep ? (
              <CreateStore2 
                onBackToUpload={handleBackToUpload}
                onProceedToNext={handleProceedToNext}
              />
            ) : !showUploadStep ? (
              <>
                {/* Header */}
                <div className="mb-6 border border-[#E53E3E] w-[680px] h-[93px] rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[20px] font-medium text-[#E53E3E]">Level 1</span>
                    <button className="text-[14px] text-[#E53E3E] hover:underline">
                      <u>View Benefits</u>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-[23px] h-[23px] bg-[#E53E3E] text-white rounded-full flex items-center justify-center text-[14px] font-bold">
                      1
                    </div>
                    <div className="flex-1 h-0.5 bg-[#ADADAD]"></div>
                    <div className="w-[23px] h-[23px] bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-[14px] font-bold">
                      2
                    </div>
                    <div className="flex-1 h-0.5 bg-[#ADADAD]"></div>
                    <div className="w-[23px] h-[23px] bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-[14px] font-bold">
                      3
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="w-[680px] space-y-4">
                  {/* Store Name */}
                  <div>
                    <input
                      type="text"
                      placeholder="Store Name"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="w-full px-4 py-3 text-[#00000080] border border-gray-300 rounded-lg bg-[#FFFFFF] focus:outline-none focus:ring-2  focus:border-transparent text-[14px] placeholder-gray-500"
                    />
                  </div>

                  {/* Store Email */}
                  <div>
                    <input
                      type="email"
                      placeholder="Store Email"
                      value={storeEmail}
                      onChange={(e) => setStoreEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-[#00000080] text-[14px] placeholder-gray-500"
                    />
                  </div>

                  {/* Store Phone Number */}
                  <div>
                    <input
                      type="tel"
                      placeholder="Store Phone Number"
                      value={storePhone}
                      onChange={(e) => setStorePhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[14px] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-[#00000080] placeholder-gray-500"
                    />
                  </div>

                  {/* Store Location */}
                  <div>
                    <input
                      type="text"
                      placeholder="Store Location"
                      value={storeLocation}
                      onChange={(e) => setStoreLocation(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-[#00000080] text-[14px] placeholder-gray-500"
                    />
                  </div>

                  {/* Change Password */}
                  <div 
                    onClick={() => setShowResetPassword(true)}
                    className="flex items-center justify-between py-3 px-4 text-[#000000] border border-gray-300 rounded-lg bg-[#FFFFFF] cursor-pointer hover:bg-gray-50"
                  >
                    <span className="text-[#000000]">Change Password</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Show Phone on Profile Toggle */}
                  <div className="flex items-center justify-between px-4 rounded-lg border border-gray-300 bg-[#FFFFFF] py-3">
                    <span className="text-gray-700 font-medium">Show Phone on profile</span>
                    <button
                      onClick={() => setShowPhoneOnProfile(!showPhoneOnProfile)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        showPhoneOnProfile ? 'bg-red-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-[#FFFFFF] transition-transform ${
                          showPhoneOnProfile ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Referral Code */}
                  <div>
                    <input
                      type="text"
                      placeholder="Referral Code (Optional)"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-[#FFFFFF] text-[14px]  focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-[#00000080] placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex items-center space-x-4">
                  {/* Back Arrow */}
                  <button className="p-2  rounded-lg transition-colors">
                   <img src={IMAGES.backarrow} alt="Back"  />
                  </button>

                  {/* Save and Exit Button */}
                  <button
                    onClick={handleSaveAndExit}
                    className="w-[257px] h-[60px] bg-[#000000] text-[14px] text-white font-sm rounded-2xl hover:bg-gray-800 transition-colors"
                  >
                    Save and Exit
                  </button>

                  {/* Proceed Button */}
                  <button
                    onClick={handleProceed}
                    disabled={isLoading}
                    className="w-[320px] h-[60px] bg-[#E53E3E] text-[14px] text-white font-sm rounded-2xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                </div>
              </>
            ) : (
              <>
                {/* Upload Step Header */}
                <div className="mb-6 border border-[#E53E3E] w-[680px] h-[93px] rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[20px] font-medium text-[#E53E3E]">Level 1</span>
                    <button className="text-[14px] text-[#E53E3E] hover:underline">
                      <u>View Benefits</u>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-[23px] h-[23px] bg-[#E53E3E] text-white rounded-full flex items-center justify-center text-[14px] font-bold">
                      1
                    </div>
                    <div className="flex-1 h-0.5  bg-[#ADADAD]"></div>
                    <div className="w-[23px] h-[23px] bg-[#E53E3E] text-white rounded-full flex items-center justify-center text-[14px] font-bold">
                      2
                    </div>
                    <div className="flex-1 h-0.5 bg-[#ADADAD]"></div>
                    <div className="w-[23px] h-[23px] bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-[14px] font-bold">
                      3
                    </div>
                  </div>
                </div>

                {/* Upload Content */}
                <div className="w-[680px]">
                  {/* Upload Profile Picture */}
                  <div className="mb-4">
                    <p className="text-[14px] text-[#000000] mb-4">Upload a profile picture for your store</p>
                    <div className="border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageUpload}
                        className="hidden"
                        id="profile-upload"
                      />
                      <label htmlFor="profile-upload" className="cursor-pointer">
                        <div className="w-[101px] h-[101px] mx-auto mb-4 bg-[#F0F0F0] rounded-full flex items-center justify-center">
                         <img src="/public/Camera11.svg" alt="Profile Preview" className="w-[41px] h-[41px] rounded-full object-cover" />
                        </div>
                        {profileImage ? (
                          <p className="text-[14px] text-green-600">{profileImage.name}</p>
                        ) : (
                          <p className="text-[14px] text-gray-500"></p>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Upload Banner */}
                  <div className="mb-8">
                    <p className="text-[14px] text-[#000000] mb-4">Upload a banner for your store</p>
                    <div className="border-gray-300 rounded-lg p-8 text-center bg-[#F0F0F0]">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerImageUpload}
                        className="hidden"
                        id="banner-upload"
                      />
                      <label htmlFor="banner-upload" className="cursor-pointer">
                        <div className="w-[638px] h-[120px] mx-auto mb-4 rounded-lg flex items-center justify-center ">
                         <img src="/public/Camera11.svg" alt="Banner Preview" className="w-[41px] h-[41px] rounded-full object-cover" />
                        </div>
                        {bannerImage ? (
                          <p className="text-[14px] text-green-600">{bannerImage.name}</p>
                        ) : (
                          <p className="text-[10px] text-[#00000080] -mt-14 ml-5">Upload banner</p>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4">
                    {/* Back Arrow */}
                    <button 
                      onClick={handleBackToForm}
                      className="p-2 rounded-lg transition-colors"
                    >
                      <img src={IMAGES.backarrow} alt="Back" />
                    </button>

                    {/* Proceed Button */}
                    <button
                      onClick={handleUploadProceed}
                      disabled={isLoading}
                      className="flex-1 bg-[#E53E3E] text-[14px]  text-white font-sm py-4 px-4 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Reset Password Modal */}
      <ResetPassword 
        isOpen={showResetPassword} 
        onClose={() => setShowResetPassword(false)} 
      />
    </div>
  );
};

export default CreateStore;
