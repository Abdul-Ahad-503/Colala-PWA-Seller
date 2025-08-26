import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IMAGES from '../../constants';
import { useDynamicColors } from '../../hooks/useDynamicColors';

const AddService: React.FC = () => {
  const navigate = useNavigate();
  const colors = useDynamicColors();
  
  const [formData, setFormData] = useState({
    serviceName: '',
    serviceCategory: '',
    shortDescription: '',
    fullDescription: '',
    priceRange: '',
    discountPrice: '',
    loyaltyPoints: false,
    couponCode: '',
    infoTag1: '',
    infoTag2: '',
    infoTag3: '',
    availabilityLocations: '',
    deliveryLocations: ''
  });
  
  const [serviceImages, setServiceImages] = useState<File[]>([]);
  const [serviceVideo, setServiceVideo] = useState<File | null>(null);
  const [variants, setVariants] = useState<string[]>([]);
  const [subServices, setSubServices] = useState<{name: string, fromPrice: string, toPrice: string}[]>([
    {name: 'General', fromPrice: 'N5,000', toPrice: 'N20,000'},
    {name: 'Male Wear', fromPrice: 'N5,000', toPrice: 'N20,000'},
    {name: 'Female Wear', fromPrice: 'N5,000', toPrice: 'N20,000'},
    {name: 'Kids Wear', fromPrice: 'N5,000', toPrice: 'N20,000'},
    {name: 'Wedding Wears', fromPrice: 'N5,000', toPrice: 'N20,000'}
  ]);
  const [isDescriptionPopupOpen, setIsDescriptionPopupOpen] = useState(false);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [isPriceRangePopupOpen, setIsPriceRangePopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Service Category');
  const [selectedPriceRange, setSelectedPriceRange] = useState('Price range');

  // Service-specific datasets
  const serviceCategories = [
    'Home Services',
    'Beauty & Wellness',
    'Automotive',
    'Event Planning',
    'Professional Services',
    'Fitness & Health',
    'Education & Tutoring',
    'Tech Support',
    'Cleaning Services',
    'Repair Services'
  ];

  const priceRanges = [
    'Under $50',
    '$50 - $100',
    '$100 - $250',
    '$250 - $500',
    '$500 - $1000',
    '$1000 - $2500',
    '$2500 - $5000',
    'Above $5000',
    'Custom Quote'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setServiceImages(prev => [...prev, ...files].slice(0, 10));
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setServiceVideo(file);
    }
  };

  const removeImage = (index: number) => {
    setServiceImages(prev => prev.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setVariants(prev => [...prev, '']);
  };

  const updateVariant = (index: number, value: string) => {
    setVariants(prev => prev.map((variant, i) => i === index ? value : variant));
  };

  const removeVariant = (index: number) => {
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  const addSubService = () => {
    setSubServices(prev => [...prev, {name: '', fromPrice: '', toPrice: ''}]);
  };

  const updateSubService = (index: number, field: 'name' | 'fromPrice' | 'toPrice', value: string) => {
    setSubServices(prev => prev.map((subService, i) => 
      i === index ? { ...subService, [field]: value } : subService
    ));
  };

  const removeSubService = (index: number) => {
    setSubServices(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log('Service data:', { formData, serviceImages, serviceVideo, variants, subServices });
    navigate('/');
  };

  // Check if form is valid for submission
  const isFormValid = () => {
    const requiredFields = [
      formData.serviceName.trim(),
      selectedCategory !== 'Service Category' ? selectedCategory : '',
      formData.shortDescription.trim(),
      formData.fullDescription.trim(),
      selectedPriceRange !== 'Price range' ? selectedPriceRange : ''
    ];
    
    const hasRequiredFields = requiredFields.every(field => field !== '');
    const hasMinimumImages = serviceImages.length >= 3;
    const hasVideo = serviceVideo !== null;
    
    return hasRequiredFields && hasMinimumImages && hasVideo;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-black">Add Service</h1>
        </div>

        {/* Content - Two Column Layout */}
        <div className="flex gap-8">
          {/* Left Section - Image/Video Upload */}
          <div className="w-[400px] space-y-8">
            {/* Video Upload Section - Moved to top */}
            <div className="space-y-4">
              <h3 className="text-base font-medium text-black">Upload at least 1 video of your service</h3>
              
              <div className="grid grid-cols-3 gap-4">
                {/* Video upload slot */}
                {serviceVideo ? (
                  <div className="w-25 h-25 bg-white rounded-[15px] overflow-hidden relative border border-gray-200">
                    <video
                      src={URL.createObjectURL(serviceVideo)}
                      className="w-full h-full object-cover"
                      controls
                    />
                    <button
                      onClick={() => setServiceVideo(null)}
                      className="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-opacity-70"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="">
                    <label className="w-25 h-25 bg-white rounded-[15px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <img src={IMAGES.camera} alt="Upload Video" className="w-6 h-6 opacity-60" />
                      </div>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}

                {/* Empty slot when video is uploaded */}
                {serviceVideo && (
                  <label className="w-25 h-25 bg-white rounded-[15px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <img src={IMAGES.camera} alt="Upload Video" className="w-6 h-6 opacity-60" />
                    </div>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4">
              <h3 className="text-base font-medium text-black">Upload at least 3 clear pictures of your service</h3>

              <div className="flex gap-4 flex-wrap">
                {/* When no images uploaded - show single large upload area */}
                {serviceImages.length === 0 ? (
                  <div className="">
                    <label className="w-25 h-25 bg-white rounded-[15px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <img src={IMAGES.image} alt="Upload" className="w-6 h-6 opacity-60" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <>
                    {/* Show uploaded images */}
                    {serviceImages.map((image, index) => (
                      <div key={index} className="w-25 h-25 bg-white rounded-[15px] overflow-hidden relative border border-gray-200">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Service ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-opacity-70"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    
                    {/* Show empty slot for additional uploads if less than 4 images */}
                    {serviceImages.length < 4 && (
                      <label className="w-25 h-25 bg-white rounded-[15px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                          <img src={IMAGES.image} alt="Upload" className="w-6 h-6 opacity-60" />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Form Fields */}
          <div className="flex-1 space-y-[10px]">
            {/* Service Name */}
            <div>
              <input
                type="text"
                placeholder="Service Name"
                value={formData.serviceName}
                onChange={(e) => handleInputChange('serviceName', e.target.value)}
                className="w-full p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0"
              />
            </div>

            {/* Service Category */}
            <div 
              className="flex items-center justify-between p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setIsCategoryPopupOpen(true)}
            >
              <span className={`text-sm ${selectedCategory !== 'Service Category' ? 'text-black' : 'text-gray-400'}`}>
                {selectedCategory}
              </span>
              <img src={IMAGES.caretLeft} alt="Arrow" className="w-6 h-6" />
            </div>

            {/* Short Description */}
            <div>
              <input
                type="text"
                placeholder="Short description"
                value={formData.shortDescription}
                onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                className="w-full p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0"
              />
            </div>

            {/* Full Description */}
            <div>
              <textarea
                placeholder="Add Full Description"
                value={formData.fullDescription}
                onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                rows={6}
                className="w-full p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0 resize-none"
              />
            </div>

            {/* Price Range */}
            <div 
              className="flex items-center justify-between p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setIsPriceRangePopupOpen(true)}
            >
              <span className={`text-sm ${selectedPriceRange !== 'Price range' ? 'text-black' : 'text-gray-400'}`}>
                {selectedPriceRange}
              </span>
              <img src={IMAGES.caretLeft} alt="Arrow" className="w-6 h-6" />
            </div>

            {/* Discount Price */}
            <div>
              <input
                type="text"
                placeholder="Discount Price"
                value={formData.discountPrice}
                onChange={(e) => handleInputChange('discountPrice', e.target.value)}
                className="w-full p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0"
              />
            </div>

            {/* Add Sub-Service Section */}
            <div className="space-y-4 pt-4">
              <div>
                <h3 className="text-base font-medium text-black">Add Sub-Service (Optional)</h3>
                <p className="text-sm text-gray-500">You can add subservices name and prices for more clarity to your users</p>
              </div>

              {/* Column Headers */}
              <div className="flex gap-4 mb-2">
                <div className="flex-1">
                  <span className="text-sm font-medium text-black">Name</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-black">Price Range</span>
                </div>
              </div>

              {/* Sub-Services List */}
              {subServices.map((subService, index) => (
                <div key={index} className="flex gap-4 items-center">
                  {/* Service Name */}
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Subservice name"
                      value={subService.name}
                      onChange={(e) => updateSubService(index, 'name', e.target.value)}
                      className="w-70 p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0"
                    />
                  </div>

                  {/* Price Range */}
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      placeholder="From"
                      value={subService.fromPrice}
                      onChange={(e) => updateSubService(index, 'fromPrice', e.target.value)}
                      className="flex-1 p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0"
                    />
                    <input
                      type="text"
                      placeholder="To"
                      value={subService.toPrice}
                      onChange={(e) => updateSubService(index, 'toPrice', e.target.value)}
                      className="flex-1 p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Post Service Button */}
            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className={`w-full py-4 text-white rounded-2xl font-medium text-base transition-opacity ${
                  !isFormValid() ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
                style={colors.getButtonStyle()}
              >
                Post Service
              </button>
            </div>
          </div>
        </div>

      {/* Service Category Popup */}
      {isCategoryPopupOpen && (
        <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-3xl w-full max-w-md h-auto flex flex-col overflow-hidden relative">
            {/* Header */}
            <div className="flex items-center justify-center pop_up p-6 bg-white border-b border-gray-100">
              <h2 className="text-lg font-semibold text-black">Select Service Category</h2>
              <button
                onClick={() => setIsCategoryPopupOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors absolute top-4 right-4"
              >
                <img src={IMAGES.Xcircle} alt="Close" className="w-6 h-6" />
              </button>
            </div>

            {/* Category List */}
            <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
              {serviceCategories.map((category, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-colors ${
                    selectedCategory === category 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsCategoryPopupOpen(false);
                  }}
                >
                  <span className={`text-sm ${
                    selectedCategory === category ? 'text-blue-600 font-medium' : 'text-black'
                  }`}>{category}</span>
                  {selectedCategory === category && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Price Range Popup */}
      {isPriceRangePopupOpen && (
        <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-3xl w-full max-w-md h-auto flex flex-col overflow-hidden relative">
            {/* Header */}
            <div className="flex items-center justify-center pop_up p-6 bg-white border-b border-gray-100">
              <h2 className="text-lg font-semibold text-black">Select Price Range</h2>
              <button
                onClick={() => setIsPriceRangePopupOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors absolute top-4 right-4"
              >
                <img src={IMAGES.Xcircle} alt="Close" className="w-6 h-6" />
              </button>
            </div>

            {/* Price Range List */}
            <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
              {priceRanges.map((range, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-colors ${
                    selectedPriceRange === range 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedPriceRange(range);
                    setIsPriceRangePopupOpen(false);
                  }}
                >
                  <span className={`text-sm ${
                    selectedPriceRange === range ? 'text-blue-600 font-medium' : 'text-black'
                  }`}>{range}</span>
                  {selectedPriceRange === range && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Description Popup */}
      {isDescriptionPopupOpen && (
        <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md h-auto flex flex-col overflow-hidden relative">
            {/* Header */}
            <div className="flex items-center justify-center pop_up p-6 bg-white border-b border-gray-100">
              <h2 className="text-lg font-semibold text-black">Service Description</h2>
              <button
                onClick={() => setIsDescriptionPopupOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors absolute top-4 right-4"
              >
                <img src={IMAGES.Xcircle} alt="Close" className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Service details */}
              <div>
                <textarea
                  placeholder="Describe your service in detail..."
                  value={formData.fullDescription}
                  onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                  rows={6}
                  className="w-full p-4 border border-gray-200 rounded-2xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0 resize-none"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="p-6 pt-0">
              <button
                onClick={() => {
                  setIsDescriptionPopupOpen(false);
                }}
                className="w-full py-4 text-white rounded-2xl font-medium text-base"
                style={colors.getButtonStyle()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default AddService;
