import React, { useState } from 'react';
import IMAGES from '../../constants';

interface StoreBuilderPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const StoreBuilderPopup: React.FC<StoreBuilderPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    storeName: 'Sasha Stores',
    email: 'Sashastores@gmail.com',
    phone: '090123456',
    showPhoneOnProfile: true,
    location: 'Lagos',
    categories: ['Electronics'],
    profileBanner: '',
    promotionalBanner: '',
    selectedColor: 'primary'
  });

  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    'Electronics', 'Fashion', 'Beauty', 'Home & Garden', 'Sports', 
    'Books', 'Toys', 'Automotive', 'Health', 'Food & Beverages'
  ];

  const locations = [
    'Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Benin', 
    'Kaduna', 'Jos', 'Ilorin', 'Enugu'
  ];

  const colorOptions = [
    'primary', '#0000FF', '#008000', '#00FF48', '#374F23', '#4C1066', '#800080', '#FBFF00', '#FF0066', '#FFA500'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };



  const handleCategoryRemove = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
  };

  const handleSave = () => {
    console.log('Saving store details:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#F9F9F9] rounded-3xl w-full max-w-md  h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-center p-6 pop_up relative">
          <h2 className="text-[20px] font-bold">Store Builder</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white absolute right-4 "
          >
            <img src={IMAGES.Xcircle} alt="Close" className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 hide-scrollbar space-y-3">
          {/* Upload Logo Section */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">Upload a logo for your store</p>
            <div className="w-20 h-20 rounded-full bg-white mx-auto mb-4 flex items-center justify-center overflow-hidden">
              <img 
                src={IMAGES.sasha} 
                alt="Store Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Store Name */}
          <div>
            <input
              type="text"
              value={formData.storeName}
              onChange={(e) => handleInputChange('storeName', e.target.value)}
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Store Name"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Email"
            />
            <button className="absolute right-3 top-1/2 transform border border-primary text-[10px] px-5 py-1 rounded-[5px] -translate-y-1/2 text-primary text-xs">
              Verify
            </button>
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Phone Number"
            />
          </div>

          {/* Show Phone Toggle */}
          <div className="flex items-center bg-white justify-between  w-full p-3 border border-gray-300 rounded-lg">
            <span className="text-sm text-gray-700">Show Phone on profile</span>
            <div className="relative ">
              <input
                type="checkbox"
                checked={formData.showPhoneOnProfile}
                onChange={(e) => handleInputChange('showPhoneOnProfile', e.target.checked)}
                className="sr-only"
              />
              <div
                onClick={() => handleInputChange('showPhoneOnProfile', !formData.showPhoneOnProfile)}
                className={`w-11 h-[18px] rounded-full cursor-pointer transition-colors  pt-0 ${
                  formData.showPhoneOnProfile ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white pt-2 rounded-full shadow transform transition-transform ${
                    formData.showPhoneOnProfile ? 'translate-x-6' : 'translate-x-0.5'
                  } mt-1 `}
                />
              </div>
            </div>
          </div>

          {/* Location Dropdown */}
          <div className="relative">
            <select
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Select categories</label>
            <div className="relative mb-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white"
              >
                <option value="">Select a category</option>
                {categories.filter(cat => !formData.categories.includes(cat)).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {/* Selected Categories */}
            <div className="flex flex-wrap gap-2">
              {formData.categories.map(category => (
                <span
                  key={category}
                  className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs flex items-center gap-1"
                >
                  {category}
                  <button
                    onClick={() => handleCategoryRemove(category)}
                    className="ml-1 text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Profile Banner Upload */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Upload profile banner for your store</label>
            <div className="w-full h-24 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <img 
                src={IMAGES.storeCover} 
                alt="Profile Banner" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Promotional Banner Upload */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Upload promotional banner for your store</label>
            <div className="bg-[#921313] rounded-2xl pl-5 pr-3 py-3 pt-4 text-white mb-6 relative overflow-hidden">
              <div className="flex  justify-between relative z-10">
                <div className="flex-1">
                  <h3 className="text-white text-[20px] font-semibold ">Shop with ease on 
                    <h3 className="text-white text-[30px] font-bold italic mb-3 font_Oleo" > Sasha Stores</h3>
                  </h3>
                  
                  <p className="text-white text-[10px] opacity-90 mt-7 mb-2 max-w-[170px]">
                    Shop from a variety of Stores for your retail or wholesale
                purposes
                  </p>
                  <button className="bg-white text-red-500 px-6 py-2 rounded-xl font-medium text-sm hover:bg-gray-100 transition-colors">
                    Shop Now
                  </button>
                </div>
                <div className="flex-shrink-0 ">
                  <img
                    src={IMAGES.shoppingBag}
                    alt="Shopping bag with groceries"
                    className="w-50 h-50 object-cover -mt-5  absolute -right-3"
                  />
                </div>
              </div>
              {/* Background decoration circles */}
              <div className="absolute bottom-0 left-0 w-[267px] h-[199px] bg-[#F22C2C] rounded-full translate-y-29 -translate-x-24"></div>
              <div className="absolute top-0 left-0 w-[267px] h-[199px] bg-[#F22C2C] rounded-full -translate-y-40 -translate-x-35"></div>
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm text-gray-700 mb-3">
              Select a color that suits your brand and your store shall be customized as such
            </label>
            <div className="grid grid-cols-5 gap-3">
              {colorOptions.map(color => (
                <button
                  key={color}
                  onClick={() => handleInputChange('selectedColor', color)}
                  className={`w-12 h-12  rounded-full  ${
                    formData.selectedColor === color ? 'ring ring-gray-800 ring-offset-2' : 'border-transparent  '
                  } ${color === 'primary' ? 'bg-primary' : ''}`}
                  style={color !== 'primary' ? { backgroundColor: color } : {}}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 ">
          <button
            onClick={handleSave}
            className="w-full bg-primary text-white  text-sm py-5 rounded-[15px] font-normal hover:bg-red-600 transition-colors"
          >
            Save Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreBuilderPopup;
