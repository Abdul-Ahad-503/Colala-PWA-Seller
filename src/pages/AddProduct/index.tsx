import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IMAGES from '../../constants';
import { useDynamicColors } from '../../hooks/useDynamicColors';

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const colors = useDynamicColors();
  
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    brand: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    discountPrice: '',
    wholesalePrice: '',
    loyaltyPoints: false,
    couponCode: '',
    infoTag1: '',
    infoTag2: '',
    infoTag3: '',
    availabilityLocations: '',
    deliveryLocations: ''
  });
  
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productVideo, setProductVideo] = useState<File | null>(null);
  const [variants, setVariants] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setProductImages(prev => [...prev, ...files].slice(0, 10));
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProductVideo(file);
    }
  };

  const removeImage = (index: number) => {
    setProductImages(prev => prev.filter((_, i) => i !== index));
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

  const handleSubmit = () => {
    console.log('Product data:', { formData, productImages, productVideo, variants });
    navigate('/');
  };

  // Check if form is valid for submission
  const isFormValid = () => {
    const requiredFields = [
      formData.productName.trim(),
      formData.category.trim(),
      formData.brand.trim(),
      formData.shortDescription.trim(),
      formData.fullDescription.trim(),
      formData.price.trim()
    ];
    
    const hasRequiredFields = requiredFields.every(field => field !== '');
    const hasMinimumImages = productImages.length >= 3;
    const hasVideo = productVideo !== null;
    
    return hasRequiredFields && hasMinimumImages && hasVideo;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-black">Add Product</h1>
        </div>

        {/* Content - Two Column Layout */}
        <div className="flex gap-8">
          {/* Left Section - Image/Video Upload */}
          <div className="w-[400px] space-y-8">
            {/* Video Upload Section - Moved to top */}
            <div className="space-y-4">
              <h3 className="text-base font-medium text-black">Upload at least 1 video of your product</h3>
              
              <div className="grid grid-cols-3 gap-4">
                {/* Video upload slot */}
                {productVideo ? (
                  <div className="w-25 h-25 bg-white rounded-[15px] overflow-hidden relative border border-gray-200">
                    <video
                      src={URL.createObjectURL(productVideo)}
                      className="w-full h-full object-cover"
                      controls
                    />
                    <button
                      onClick={() => setProductVideo(null)}
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
                {productVideo && (
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
              <h3 className="text-base font-medium text-black">Upload at least 3 clear pictures of your product</h3>

              <div className="flex gap-4 flex-wrap">
                {/* When no images uploaded - show single large upload area */}
                {productImages.length === 0 ? (
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
                    {productImages.map((image, index) => (
                      <div key={index} className="w-25 h-25 bg-white rounded-[15px] overflow-hidden relative border border-gray-200">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Product ${index + 1}`}
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
                    {productImages.length < 4 && (
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
            {/* Product Name */}
            <div>
              <input
                type="text"
                placeholder="Product Name"
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                className="w-full p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0"
              />
            </div>

            {/* Category */}
            <div className="flex items-center justify-between p-4 py-5 border border-[#CDCDCD] rounded-2xl text-sm bg-white cursor-pointer hover:bg-gray-50 transition-colors">
              <span className={`text-sm ${formData.category ? 'text-black' : 'text-gray-400'}`}>
                {formData.category || 'Category'}
              </span>
              <img src={IMAGES.caretLeft} alt="Arrow" className="w-6 h-6" />
            </div>

            {/* Brand */}
            <div className="flex items-center justify-between p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white cursor-pointer hover:bg-gray-50 transition-colors">
              <span className={`text-sm ${formData.brand ? 'text-black' : 'text-gray-400'}`}>
                {formData.brand || 'Brand'}
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
                placeholder="full description"
                value={formData.fullDescription}
                onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                rows={6}
                className="w-full p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0 resize-none"
              />
            </div>

            {/* Price */}
            <div>
              <input
                type="text"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="w-full p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0"
              />
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

            {/* Add Wholesale Price */}
            <div>
              <button 
                className="text-base font-medium underline"
                style={colors.getPrimaryText()}
                onClick={() => {/* Handle wholesale price addition */}}
              >
                Add Wholesale price
              </button>
            </div>

            {/* Add Variants */}
            <div className="space-y-4 pt-4">
              <div>
                <h3 className="text-base font-medium text-black">Add Variants</h3>
                <p className="text-sm text-gray-500">Variants include colors and sizes</p>
              </div>
              
              {variants.map((variant, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Add New Variant"
                    value={variant}
                    onChange={(e) => updateVariant(index, e.target.value)}
                    className="flex-1 p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0"
                  />
                  <button
                    onClick={() => removeVariant(index)}
                    className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}

              <div className="flex items-center justify-between p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white cursor-pointer hover:bg-gray-50 transition-colors" onClick={addVariant}>
                <span className="text-sm text-gray-400">Add New Variant</span>
                <img src={IMAGES.caretLeft} alt="Arrow" className="w-6 h-6" />
              </div>
            </div>

            {/* Promotions */}
            <div className="space-y-4 pt-4">
              <div>
                <h3 className="text-base font-medium text-black">Promotions</h3>
                <p className="text-sm text-gray-500">Promote your product via coupon codes</p>
              </div>

              <div className="flex items-center justify-between p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                <span className={`text-sm ${formData.couponCode ? 'text-black' : 'text-gray-400'}`}>
                  {formData.couponCode || 'Coupon code to be used'}
                </span>
                <img src={IMAGES.caretLeft} alt="Arrow" className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.loyaltyPoints}
                  onChange={(e) => handleInputChange('loyaltyPoints', e.target.checked)}
                  className="w-5 h-5 rounded border-[#CDCDCD]"
                />
                <span className="text-sm text-black">Buyers can use loyalty points during purchase</span>
              </div>
            </div>

            {/* Others */}
            <div className="space-y-4 pt-4">
              <h3 className="text-base font-medium text-black">Others</h3>
              
              <div>
                <input
                  type="text"
                  placeholder="Information tag 1 (optional)"
                  value={formData.infoTag1}
                  onChange={(e) => handleInputChange('infoTag1', e.target.value)}
                  className="w-full p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Information tag 2 (optional)"
                  value={formData.infoTag2}
                  onChange={(e) => handleInputChange('infoTag2', e.target.value)}
                  className="w-full p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Information tag 3 (optional)"
                  value={formData.infoTag3}
                  onChange={(e) => handleInputChange('infoTag3', e.target.value)}
                  className="w-full p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0"
                />
              </div>

              <div className="flex items-center justify-between p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                <span className={`text-sm ${formData.availabilityLocations ? 'text-black' : 'text-gray-400'}`}>
                  {formData.availabilityLocations || 'Availability locations'}
                </span>
                <img src={IMAGES.caretLeft} alt="Arrow" className="w-6 h-6" />
              </div>

              <div className="flex items-center justify-between p-4 py-5 border border-[#CDCDCD] rounded-2xl bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                <span className={`text-sm ${formData.deliveryLocations ? 'text-black' : 'text-gray-400'}`}>
                  {formData.deliveryLocations || 'Delivery locations'}
                </span>
                <img src={IMAGES.caretLeft} alt="Arrow" className="w-6 h-6" />
              </div>
            </div>

            {/* Post Product Button */}
            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className={`w-full py-4 text-white rounded-2xl font-medium text-base transition-opacity ${
                  !isFormValid() ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
                style={colors.getButtonStyle()}
              >
                Post Product
              </button>
            </div>

            {/* Bulk Upload Section */}
            <div className="space-y-6 pt-6">
              <div>
                <h3 className="text-base font-medium text-black mb-2">Upload several products at once with our bulk template,</h3>
                <p className="text-base font-medium text-black">follow the steps below to proceed:</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Download bulk template below</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Fill the template accordingly</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Upload the filled template in the space provided</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Bulk Upload Successful</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#CDCDCD]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                    <span className="text-sm font-bold text-green-600">CSV</span>
                  </div>
                  <div>
                    <p className="text-base font-medium text-black">Download CSV bulk template</p>
                    <p className="text-sm text-gray-500">200 kb</p>
                  </div>
                </div>
                <button className="w-10 h-10 flex items-center justify-center">
                  <img src={IMAGES.DownloadSimple} alt="Download" className="w-6 h-6" />
                </button>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-white">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <img src={IMAGES.DownloadSimple} alt="Upload" className="w-8 h-8 opacity-40 rotate-180" />
                </div>
                <p className="text-base text-gray-500">Upload Filled template</p>
              </div>

              <button className="w-full py-4 bg-black text-white rounded-2xl font-medium text-base">
                Upload bulk Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
