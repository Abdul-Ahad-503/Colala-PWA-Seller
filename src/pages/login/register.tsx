import React, { useState } from 'react';
import Cookies from 'js-cookie';
import IMAGES from '../../constants';
import RegisterLevel2 from './registerlevel2';
import RegisterLevel3 from './registerlevel3';
import RegisterLevel4 from './registerlevel4';

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (email: string) => void;
  onBackToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ isOpen, onClose, onRegister, onBackToLogin }) => {
  const [storeName, setStoreName] = useState('');
  const [storeEmail, setStoreEmail] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [storeLocation, setStoreLocation] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLevel] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showUploadStep, setShowUploadStep] = useState(false);
  const [showCategoryStep, setShowCategoryStep] = useState(false);
  const [showLevel2, setShowLevel2] = useState(false);
  const [showLevel3, setShowLevel3] = useState(false);
  const [showLevel4, setShowLevel4] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (!storeName || !storeEmail || !storePhone || !storeLocation || !password) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (!agreedToTerms) {
      alert('Please agree to the terms and privacy policy');
      return;
    }
    
    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      // Move to upload step instead of completing registration
      setShowUploadStep(true);
    }, 1000);
  };

  const handleProceed = async () => {
    setIsLoading(true);

    // Simulate moving to category step
    setTimeout(() => {
      setIsLoading(false);
      // Move to category step instead of completing registration
      setShowCategoryStep(true);
    }, 1000);
  };

  const handleProceedToLevel2 = async () => {
    setIsLoading(true);

    // Store Level 1 registration data and move to Level 2
    setTimeout(() => {
      // Store Level 1 registration data in cookies
      const level1Data = {
        storeName,
        storeEmail,
        storePhone,
        storeLocation,
        selectedCategory,
        whatsappLink,
        instagramLink,
        facebookLink,
        twitterLink,
        registrationTime: new Date().toISOString(),
        level1Completed: true,
      };

      // Set cookie for Level 1 data
      Cookies.set('userRegistration', JSON.stringify(level1Data), { expires: 7 });
      Cookies.set('userEmail', storeEmail, { expires: 7 });

      setIsLoading(false);
      // Move to Level 2 instead of completing registration
      setShowLevel2(true);
    }, 1000);
  };

  const handleBackToLevel1 = () => {
    setShowLevel2(false);
  };

  const handleBackToLevel2 = () => {
    setShowLevel3(false);
    setShowLevel2(true);
  };

  const handleBackToLevel3 = () => {
    setShowLevel4(false);
    setShowLevel3(true);
  };

  const handleProceedToLevel4 = () => {
    setShowLevel3(false);
    setShowLevel4(true);
  };

  const handleProceedToLevel3 = () => {
    setShowLevel2(false);
    setShowLevel3(true);
  };

  const handleBackToUpload = () => {
    setShowCategoryStep(false);
  };

  const handleSubcategoryToggle = (subcategory: string) => {
    setSelectedSubcategories(prev => 
      prev.includes(subcategory) 
        ? prev.filter(item => item !== subcategory)
        : [...prev, subcategory]
    );
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

  const handleViewBenefits = () => {
    // Handle view benefits action
    console.log('View benefits clicked');
  };

  if (!isOpen) return null;

  // Show Level 2 registration after completing Level 1
  if (showLevel2) {
    return (
      <RegisterLevel2
        isOpen={isOpen}
        onClose={onClose}
        onRegister={onRegister}
        onBackToLogin={onBackToLogin}
        onBackToLevel1={handleBackToLevel1}
        onProceedToLevel3={handleProceedToLevel3}
      />
    );
  }

  // Show Level 4 registration after completing Level 3
  if (showLevel4) {
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

          {/* Left Side - Same as other levels */}
          <div className="w-1/2 bg-gradient-to-br from-red-500 to-red-600 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <img 
                src={IMAGES.login} 
                alt="Woman with phone" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Level 4 Content */}
          <RegisterLevel4
            isOpen={true}
            onClose={onClose}
            onRegister={onRegister}
            onBackToLogin={onBackToLogin}
            onBackToLevel3={handleBackToLevel3}
          />
        </div>
      </div>
    );
  }

  // Show Level 3 registration after completing Level 2
  if (showLevel3) {
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

          {/* Left Side - Same as other levels */}
          <div className="w-1/2 bg-gradient-to-br from-red-500 to-red-600 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <img 
                src={IMAGES.login} 
                alt="Woman with phone" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Level 3 Content */}
          <RegisterLevel3
            isOpen={true}
            onClose={onClose}
            onRegister={onRegister}
            onBackToLogin={onBackToLogin}
            onBackToLevel2={handleBackToLevel2}
            onProceedToLevel4={handleProceedToLevel4}
          />
        </div>
      </div>
    );
  }

  // Show category step after upload step
  if (showCategoryStep) {
    return (
      <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl overflow-hidden w-[876px] max-w-4xl h-[666px] flex relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6  right-6 w-10 h-10 -mt-3 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
          >
            <img src={IMAGES.Xcircle} alt="Close" className="w-8 h-8 ml-10" />
          </button>

          {/* Left Side - Same as before */}
          <div className="w-1/2 bg-gradient-to-br from-red-500 to-red-600 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <img 
                src={IMAGES.login} 
                alt="Woman with phone" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Category and Social Links with Scrollbar */}
          <div className="w-1/2 flex flex-col">
            {/* Fixed Header */}
            <div className="p-8 pb-4">
              <div className="text-center mb-6">
                <h2 className="text-[24px] font-semibold text-[#E53E3E] mb-2">Register</h2>
                <p className="text-gray-500 text-[14px]">Create a free account today</p>
              </div>

              {/* Level Progress - All steps completed */}
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

            {/* Scrollable Category and Social Links Area */}
            <div className="flex-1 overflow-y-auto px-8 pb-8">
              {/* Add Category Section */}
              <div className="mb-6">
                <p className="text-[14px] text-gray-700 mb-4 font-medium">Add Category</p>
                
                {/* Select Category Dropdown */}
                <div className="relative mb-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-[14px] appearance-none cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home & Garden</option>
                    <option value="sports">Sports</option>
                    <option value="books">Books</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Category Tags */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => handleSubcategoryToggle('Electronics')}
                    className={`px-4 py-2 rounded-full text-[12px] font-medium transition-colors ${
                      selectedSubcategories.includes('Electronics')
                        ? 'bg-[#E53E3E] text-white'
                        : 'bg-[#FFDEDE] text-[#E53E3E] hover:bg-[#FFDEDE]'
                    }`}
                  >
                    Electronics
                  </button>
                  <button
                    onClick={() => handleSubcategoryToggle('Phones')}
                    className={`px-4 py-2 rounded-full text-[12px] font-medium transition-colors ${
                      selectedSubcategories.includes('Phones')
                        ? 'bg-[#E53E3E] text-white'
                        : 'bg-[#FFDEDE] text-[#E53E3E] hover:bg-[#FFDEDE]'
                    }`}
                  >
                    Phones
                  </button>
                </div>
              </div>

              {/* Add Social Links Section */}
              <div className="mb-8">
                <p className="text-[14px] text-gray-700 mb-4 font-medium">Add Social Links</p>
                
                <div className="space-y-4">
                  {/* WhatsApp Link */}
                  <input
                    type="url"
                    value={whatsappLink}
                    onChange={(e) => setWhatsappLink(e.target.value)}
                    placeholder="Add Whatsapp link"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-[14px]"
                  />

                  {/* Instagram Link */}
                  <input
                    type="url"
                    value={instagramLink}
                    onChange={(e) => setInstagramLink(e.target.value)}
                    placeholder="Add Instagram link"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-[14px]"
                  />

                  {/* Facebook Link */}
                  <input
                    type="url"
                    value={facebookLink}
                    onChange={(e) => setFacebookLink(e.target.value)}
                    placeholder="Add Facebook link"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-[14px]"
                  />

                  {/* Twitter Link */}
                  <input
                    type="url"
                    value={twitterLink}
                    onChange={(e) => setTwitterLink(e.target.value)}
                    placeholder="Add X (formerly twitter) link"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-[14px]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {/* Back Arrow, Proceed to Level 2, and Home Buttons */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleBackToUpload}
                    className="w-12 h-12 rounded-full  flex items-center justify-center hover:bg-gray-50"
                  >
                   <img src={IMAGES.backarrow} alt="Back" className="w-18 h-18" />
                  </button>
                  <button
                    onClick={handleProceedToLevel2}
                    disabled={isLoading}
                    className="flex-1 bg-red-500 text-[11px] hover:bg-red-600 text-white font-lg py-5 px-5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      'Proceed to Level 2'
                    )}
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 bg-black text-[14px] hover:bg-gray-800 text-white font-medium py-4 px-5 rounded-xl transition-colors"
                  >
                    Home
                  </button>
                </div>

                {/* Login Button */}
                <button
                  onClick={onBackToLogin}
                  className="w-full bg-[#EBEBEB] text-[14px] hover:bg-gray-200 text-[#000000] font-medium py-4 px-2 rounded-xl transition-colors"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show upload step after registration form is submitted
  if (showUploadStep) {
    return (
      <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl overflow-hidden w-[876px] max-w-4xl h-[666px] flex relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 -mt-3 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
          >
            <img src={IMAGES.Xcircle} alt="Close" className="w-8 h-8 ml-10" />
          </button>

          {/* Left Side - Same as before */}
          <div className="w-1/2 bg-gradient-to-br from-red-500 to-red-600 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <img 
                src={IMAGES.login} 
                alt="Woman with phone" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Upload Form with Scrollbar */}
          <div className="w-1/2 flex flex-col">
            {/* Fixed Header */}
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
                  <div className="flex-1 h-0.5 bg-gray-200"></div>
                  <div className="w-[23px] h-[23px] bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-[12px] font-bold">
                    3
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Upload Area */}
            <div className="flex-1 overflow-y-auto px-8 pb-8">
              {/* Upload Profile Picture */}
              <div className="mb-2">
                <p className="text-[14px] text-[#000000] mb-4 -mt-1">Upload a profile picture for your store</p>
                <div className=" border-gray-300 rounded-lg p-4 text-center ">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="hidden"
                    id="profile-upload"
                  />
                  <label htmlFor="profile-upload" className="cursor-pointer">
                    <div className="w-[90px] h-[90px] mx-auto mb-4 bg-[#F0F0F0] rounded-full flex items-center justify-center">
                      <svg className="w-[41px] h-[41px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
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
                <p className="text-[14px] text-[#000000] mb-4 -mt-1">Upload a banner for your store</p>
                <div className=" border-gray-300 rounded-lg p-4 text-center bg-[#F0F0F0]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerImageUpload}
                    className="hidden"
                    id="banner-upload"
                  />
                  <label htmlFor="banner-upload" className="cursor-pointer">
                    <div className="w-16 h-16 mx-auto mb-4  rounded-full flex items-center justify-center">
                      <svg className="w-[41px] h-[41px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    {bannerImage ? (
                      <p className="text-[14px] text-green-600">{bannerImage.name}</p>
                    ) : (
                      <p className="text-[10px] text-gray-500 -mt-4">Upload banner</p>
                    )}
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {/* Back Arrow and Proceed Button */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleBackToForm}
                    className="w-12 h-12 rounded-ful flex items-center justify-center hover:bg-gray-50"
                  >
                   <img src={IMAGES.backarrow} alt="Back" className="w-20 h-20" />
                  </button>
                  <button
                    onClick={handleProceed}
                    disabled={isLoading}
                    className="flex-1 bg-[#E53E3E] text-[14px] hover:bg-red-600 text-white font-sm py-4 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

                {/* Login Button */}
                <button
                  onClick={onBackToLogin}
                  className="w-full bg-gray-100 text-[14px] hover:bg-[#EBEBEB] text-[#000000] font-medium py-4 px-6 rounded-xl transition-colors"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

        {/* Left Side - Same as Login (Just red frame with main image) */}
        <div className="w-1/2 bg-gradient-to-br from-red-500 to-red-600 relative overflow-hidden">
          {/* Main Image - Woman with phone covering full left side */}
          <div className="absolute top-0 left-0 w-full h-full">
            <img 
              src={IMAGES.login} 
              alt="Woman with phone" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Register Form with Scrollbar */}
        <div className="w-1/2 flex flex-col">
          {/* Fixed Header - Outside scroll area */}
          <div className="p-8 pb-4">
            <div className="text-center mb-6">
              <h2 className="text-[24px] font-semibold text-[#E53E3E] mb-2">Register</h2>
              <p className="text-gray-500 text-[14px]">Create a free account today</p>
            </div>

            {/* Level Progress */}
            <div className="mb-6 border border-[#E53E3E] rounded-lg p-3">
              <div className="flex items-center  justify-between mb-2">
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
                <div className="flex-1 h-0.5 bg-gray-200"></div>
                <div className="w-[23px] h-[23px] bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-[12px] font-bold">
                  2
                </div>
                <div className="flex-1 h-0.5 bg-gray-200"></div>
                <div className="w-[23px] h-[23px] bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-[12px] font-bold">
                  3
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Form Area */}
          <div className="flex-1 overflow-y-auto px-8 pb-8">
            {/* Registration Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Store Name */}
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Store Name"
                className="w-full px-4 py-3 border border-[#CDCDCD] rounded-lg  bg-[#FFFFFF] text-gray-700 text-[14px]"
                required
              />

              {/* Store Email */}
              <input
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                placeholder="Store Email"
                className="w-full px-4 py-3 border border-[#CDCDCD] rounded-lg bg-[#FFFFFF] text-gray-700 text-[14px]"
                required
              />

              {/* Store Phone Number */}
              <input
                type="tel"
                value={storePhone}
                onChange={(e) => setStorePhone(e.target.value)}
                placeholder="Store Phone Number"
                className="w-full px-4 py-3 border border-[#CDCDCD] rounded-lg bg-[#FFFFFF] text-gray-700 text-[14px]"
                required
              />

              {/* Store Location */}
              <input
                type="text"
                value={storeLocation}
                onChange={(e) => setStoreLocation(e.target.value)}
                placeholder="Store Location"
                className="w-full px-4 py-3 border border-[#CDCDCD] rounded-lg bg-[#FFFFFF] text-gray-700 text-[14px]"
                required
              />

              {/* Password */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-[#CDCDCD] rounded-lg bg-[#FFFFFF] text-gray-700 text-[14px]"
                required
              />

              {/* Referral Code */}
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Referral Code (Optional)"
                className="w-full px-4 py-3 border border-[#CDCDCD] rounded-lg bg-[#FFFFFF] text-gray-700 text-[14px]"
              />

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-500 text-[12px] hover:bg-red-600 text-white font-medium py-4 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Login Button */}
              <button
                type="button"
                onClick={onBackToLogin}
                className="w-full bg-gray-100 text-[12px] hover:bg-gray-200 text-[#000000] mb-2 font-medium py-4 px-6 rounded-xl transition-colors"
              >
                Login
              </button>

              {/* Terms and Privacy */}
              <div className="mt-4">
                <label className="flex items-start gap-2 ml-6 text-[10px] text-gray-600">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 w-3 h-3 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    required
                  />
                  <span>
                    By proceeding you agree to Colala's{' '}
                    <button type="button" className="text-[#E53E3E] hover:underline">terms of use</button>{' '}
                    and{' '}
                    <button type="button" className="text-[#E53E3E] hover:underline">privacy policy</button>
                  </span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
