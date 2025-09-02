import React, { useState } from 'react';

interface ProductLeaveReviewProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: { rating: number; comment: string; images: File[] }) => void;
  productName?: string;
}

const ProductLeaveReview: React.FC<ProductLeaveReviewProps> = ({ 
  isOpen, 
  onClose, 
  onSubmitReview,
//   productName = "Product"
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  if (!isOpen) return null;

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 3 - selectedImages.length);
      setSelectedImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    onSubmitReview({
      rating,
      comment,
      images: selectedImages
    });
    
    // Reset form
    setRating(0);
    setComment('');
    setSelectedImages([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-[430px] h-[530px] mx-4 relative">
        {/* Header */}
        <div className="flex items-center justify-center mb-6 relative pop_up">
          <h2 className="text-[20px] font-bold text-black OleoScript">Leave a review</h2>
          <button 
            onClick={onClose}
            className="absolute right-0 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full"
          >
            <img src="/public/XCircle.png" alt="Close" className="w-6 h-6" />
          </button>
        </div>

        {/* Star Rating */}
        <div className="mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 flex justify-center shadow-sm">
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={handleStarLeave}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  {star <= (hoveredRating || rating) ? (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="#E53E3E">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ) : (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="#E5E7EB">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Review Type */}
        <div className="mb-4">
          <p className="text-[12px] text-black mb-3">Type review</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Type your review"
            className="w-full h-32 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none shadow-lg focus:ring-2 focus:ring-[#E53E3E] focus:border-transparent text-sm resize-none bg-white"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            {/* Upload Button */}
            <label className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#E53E3E] transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                disabled={selectedImages.length >= 3}
              />
              <span className="text-2xl text-gray-400">+</span>
            </label>

            {/* Selected Images */}
            {selectedImages.map((image, index) => (
              <div key={index} className="relative w-16 h-16">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}

            {/* Placeholder Images */}
            {Array.from({ length: Math.max(0, 3 - selectedImages.length - 1) }).map((_, index) => (
              <div key={`placeholder-${index}`} className="w-16 h-16 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#E53E3E] text-white text-[12px] py-3 rounded-2xl font-medium hover:bg-red-600 transition-colors"
        >
          Send Review
        </button>
      </div>
    </div>
  );
};

export default ProductLeaveReview;
