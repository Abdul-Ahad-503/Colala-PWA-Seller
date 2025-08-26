import React, { useState } from 'react';
import IMAGES from '../../constants';

interface CreateStore2Props {
  onBackToUpload: () => void;
  onProceedToNext: () => void;
}

const CreateStore2: React.FC<CreateStore2Props> = ({ onBackToUpload, onProceedToNext }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubcategoryToggle = (subcategory: string) => {
    setSelectedSubcategories(prev => 
      prev.includes(subcategory) 
        ? prev.filter(item => item !== subcategory)
        : [...prev, subcategory]
    );
  };

  const handleViewBenefits = () => {
    console.log('View benefits clicked');
  };

  const handleProceedToLevel2 = async () => {
    setIsLoading(true);

    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      onProceedToNext();
    }, 1000);
  };

  const handleSaveAndExit = () => {
    console.log('Save and Exit');
  };

  return (
    <div className="w-[680px]">
      {/* Header */}
      <div className="mb-6 border border-[#E53E3E] w-[680px] h-[93px] rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[20px] font-medium text-[#E53E3E]">Level 1</span>
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
          <div className="flex-1 h-0.5 bg-[#E53E3E]"></div>
          <div className="w-[23px] h-[23px] bg-[#E53E3E] text-white rounded-full flex items-center justify-center text-[14px] font-bold">
            2
          </div>
          <div className="flex-1 h-0.5 bg-[#E53E3E]"></div>
          <div className="w-[23px] h-[23px] bg-[#E53E3E] text-white rounded-full flex items-center justify-center text-[14px] font-bold">
            3
          </div>
        </div>
      </div>

      {/* Content Area with scroll */}
      <div className="max-h-[500px] overflow-y-auto">
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
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex items-center space-x-4">
        {/* Back Arrow */}
        <button
          onClick={onBackToUpload}
          className="p-2 rounded-lg transition-colors"
        >
          <img src={IMAGES.backarrow} alt="Back" />
        </button>

        {/* Save and Exit Button */}
        <button
          onClick={handleSaveAndExit}
          className="w-[257px] h-[60px] bg-[#000000] text-[14px] text-white font-sm rounded-2xl hover:bg-gray-800 transition-colors"
        >
          Save & Exit
        </button>

        {/* Proceed to Level 2 Button */}
        <button
          onClick={handleProceedToLevel2}
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
            'Proceed to Level 2'
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateStore2;
