import React, { useState } from 'react';
import IMAGES from '../../constants';

// Sample review data - in a real app this would come from an API
const sampleReviews = [
  {
    id: 1,
    type: 'store',
    reviewerName: 'Adam Sandler',
    reviewerAvatar: IMAGES.adam,
    rating: 5,
    reviewText: 'The Store is amazing',
    timestamp: '07-16-25/05:33AM',
    storeName: 'Sasha Stores',
    storeAvatar: IMAGES.phoneTablet,
    storeId: '1'
  },
  {
    id: 2,
    type: 'store', 
    reviewerName: 'Adam Sandler',
    reviewerAvatar: IMAGES.adam,
    rating: 4,
    reviewText: 'The Store is amazing',
    timestamp: '07-16-25/05:33AM',
    storeName: 'Sasha Stores',
    storeAvatar: IMAGES.phoneTablet,
    storeId: '1'
  },
  {
    id: 3,
    type: 'store',
    reviewerName: 'Adam Sandler',
    reviewerAvatar: IMAGES.adam,
    rating: 3,
    reviewText: 'The Store is amazing',
    timestamp: '07-16-25/05:33AM',
    storeName: 'Sasha Stores', 
    storeAvatar: IMAGES.phoneTablet,
    storeId: '1'
  },
  {
    id: 4,
    type: 'store',
    reviewerName: 'Adam Sandler',
    reviewerAvatar: IMAGES.adam,
    rating: 5,
    reviewText: 'The Store is amazing',
    timestamp: '07-16-25/05:33AM',
    storeName: 'Sasha Stores',
    storeAvatar: IMAGES.phoneTablet,
    storeId: '1'
  },
  {
    id: 5,
    type: 'store',
    reviewerName: 'Adam Sandler',
    reviewerAvatar: IMAGES.adam,
    rating: 5,
    reviewText: 'The Store is amazing',
    timestamp: '07-16-25/05:33AM',
    storeName: 'Sasha Stores',
    storeAvatar: IMAGES.phoneTablet,
    storeId: '1'
  },
  // Product reviews
  {
    id: 6,
    type: 'product',
    reviewerName: 'Adam Sandler',
    reviewerAvatar: IMAGES.adam,
    rating: 5,
    reviewText: 'Amazing phone quality and fast delivery',
    timestamp: '07-15-25/02:15PM',
    storeName: 'Tech World',
    storeAvatar: IMAGES.phoneTablet,
    storeId: '2'
  },
  {
    id: 7,
    type: 'product',
    reviewerName: 'Adam Sandler',
    reviewerAvatar: IMAGES.adam,
    rating: 4,
    reviewText: 'Good laptop performance, highly recommended',
    timestamp: '07-14-25/11:45AM',
    storeName: 'Electronics Hub',
    storeAvatar: IMAGES.computing,
    storeId: '3'
  },
  {
    id: 8,
    type: 'product',
    reviewerName: 'Adam Sandler',
    reviewerAvatar: IMAGES.adam,
    rating: 5,
    reviewText: 'Perfect headphones with excellent sound quality',
    timestamp: '07-13-25/09:30AM',
    storeName: 'Audio Store',
    storeAvatar: IMAGES.headset,
    storeId: '4'
  },
  {
    id: 9,
    type: 'product',
    reviewerName: 'Adam Sandler',
    reviewerAvatar: IMAGES.adam,
    rating: 3,
    reviewText: 'Decent product but could be better',
    timestamp: '07-12-25/04:20PM',
    storeName: 'Gadget World',
    storeAvatar: IMAGES.electronics,
    storeId: '5'
  },
  {
    id: 10,
    type: 'product',
    reviewerName: 'Adam Sandler',
    reviewerAvatar: IMAGES.adam,
    rating: 5,
    reviewText: 'Excellent camera features, love the quality',
    timestamp: '07-11-25/06:10PM',
    storeName: 'Camera Plus',
    storeAvatar: IMAGES.camera,
    storeId: '6'
  }
];

const Reviews: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'store' | 'product'>('store');
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editRating, setEditRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [editComment, setEditComment] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const storeReviews = sampleReviews.filter(review => review.type === 'store');
  const productReviews = sampleReviews.filter(review => review.type === 'product');

  const handleReviewClick = (review: any) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const handleEditReview = () => {
    if (selectedReview) {
      setEditRating(selectedReview.rating);
      setEditComment(selectedReview.reviewText);
      setSelectedImages([]);
      setIsModalOpen(false);
      setIsEditModalOpen(true);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditRating(0);
    setEditComment('');
    setSelectedImages([]);
    setHoveredRating(0);
  };

  const handleStarClick = (starRating: number) => {
    setEditRating(starRating);
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

  const handleUpdateReview = () => {
    if (editRating === 0) {
      alert('Please select a rating');
      return;
    }
    
    // Handle update logic here
    console.log('Update review:', { rating: editRating, comment: editComment, images: selectedImages });
    
    // Close modal and reset
    handleCloseEditModal();
  };

  const handleDeleteReview = () => {
    // Handle delete functionality
    console.log('Delete review');
    handleCloseModal();
  };

  const formatDate = (dateString: string) => {
    // Handle the format "07-16-25/05:33AM"
    if (dateString.includes('/')) {
      return dateString; // Return as is since it's already in the desired format
    }
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(',', '/');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-[10px] h-[10px] ${star <= rating ? 'text-red-500' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="flex-1 p-8 bg-white rounded-[20px]">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Reviews</h1>
        
        {/* Tab Navigation */}
        <div className="flex mb-8">
          <button
            onClick={() => setActiveTab('store')}
            className={`px-8 py-3 w-full rounded-lg font-medium transition-colors ${
              activeTab === 'store'
                ? 'bg-[#E53E3E] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Store Reviews
          </button>
          <button
            onClick={() => setActiveTab('product')}
            className={`px-8 py-3 w-full rounded-lg font-medium transition-colors ml-2 ${
              activeTab === 'product'
                ? 'bg-[#E53E3E] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Product Reviews
          </button>
        </div>

        {/* Reviews Content */}
        <div className="space-y-6">
          {activeTab === 'store' && (
            <>
              {storeReviews.map((review) => (
                <div 
                  key={review.id} 
                  className="bg-white border border-gray-200 rounded-xl p-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleReviewClick(review)}
                >
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={review.reviewerAvatar}
                        alt={review.reviewerName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">{review.reviewerName}</h3>
                        <div className="flex items-center mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-500">{review.timestamp}</span>
                  </div>

                  {/* Review Text */}
                  <p className=" mb-2 text-xs">{review.reviewText}</p>

                  {/* Store Info Section */}
                  <div className="bg-gray-50 rounded p-1 border border-[#00000080] flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={review.storeAvatar}
                        alt={review.storeName}
                        className="w-7 h-7 rounded object-cover"
                      />
                      <div>
                        <div className=" text-[8px] text-gray-900">{review.storeName}</div>
                        <div className="text-[6px] text-red-500">4.5 Stars</div>
                      </div>
                    </div>
                    <button 
                      className="text-[#E53E3E] text-[8px] cursor-pointer  hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle view store
                      }}
                    >
                      View Store
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'product' && (
            <>
              {productReviews.map((review) => (
                <div 
                  key={review.id} 
                  className="bg-white border border-gray-200 rounded-xl p-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleReviewClick(review)}
                >
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={review.reviewerAvatar}
                        alt={review.reviewerName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">{review.reviewerName}</h3>
                        <div className="flex items-center mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-500">{review.timestamp}</span>
                  </div>

                  {/* Review Text */}
                  <p className=" mb-2 text-xs">{review.reviewText}</p>

                  {/* Store Info Section */}
                  <div className="bg-gray-50 rounded p-1 border border-[#00000080] flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={review.storeAvatar}
                        alt={review.storeName}
                        className="w-7 h-7 rounded object-cover"
                      />
                      <div>
                        <div className=" text-[8px] text-gray-900">{review.storeName}</div>
                        <div className="text-[6px] text-red-500">4.5 Stars</div>
                      </div>
                    </div>
                    <button 
                      className="text-[#E53E3E] text-[8px] cursor-pointer  hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle view store
                      }}
                    >
                      View Store
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {isModalOpen && selectedReview && (
        <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-[430px] mx-4 relative">
            {/* Header */}
            <div className="flex items-center justify-center mb-6 relative pop_up">
              <h2 className="text-[20px] font-bold text-black OleoScript">My review</h2>
              <button 
                onClick={handleCloseModal}
                className="absolute right-0 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full"
              >
                <img src={IMAGES.xCircle} alt="Close" className="w-6 h-6" />
              </button>
            </div>

            {/* Star Rating Display */}
            <div className="mb-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 flex justify-center shadow-sm">
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star}>
                      {star <= selectedReview.rating ? (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="#E53E3E">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ) : (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="#E5E7EB">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviewer Info */}
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-3">
                <img 
                  src={selectedReview.reviewerAvatar} 
                  alt="Reviewer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-black text-sm">{selectedReview.reviewerName}</h3>
                <div className="flex items-center">
                  {/* Small stars */}
                  <div className="flex space-x-1 mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star}>
                        {star <= selectedReview.rating ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#E53E3E">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#E5E7EB">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{formatDate(selectedReview.timestamp)}</p>
              </div>
            </div>

            {/* Review Images - Sample images for demo */}
            <div className="mb-4">
              <div className="flex space-x-2">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img 
                    src={IMAGES.phoneTablet}
                    alt="Review image 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img 
                    src={IMAGES.computing}
                    alt="Review image 2"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img 
                    src={IMAGES.electronics}
                    alt="Review image 3"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <p className="text-black text-sm leading-relaxed">Really great product, I enjoyed using it for a long time</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleEditReview}
                className="flex-1 px-4 py-3 border border-gray-300 text-black rounded-2xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Edit Review
              </button>
              <button
                onClick={handleDeleteReview}
                className="flex-1 px-4 py-3 bg-[#E53E3E] text-white rounded-2xl text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Delete Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Review Modal */}
      {isEditModalOpen && selectedReview && (
        <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-[430px] h-[530px] mx-4 relative">
            {/* Header */}
            <div className="flex items-center justify-center mb-6 relative pop_up">
              <h2 className="text-[20px] font-bold text-black OleoScript">Leave a review</h2>
              <button 
                onClick={handleCloseEditModal}
                className="absolute right-0 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full"
              >
                <img src={IMAGES.xCircle} alt="Close" className="w-6 h-6" />
              </button>
            </div>

            {/* Star Rating */}
            <div className="mb-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 flex justify-center shadow-sm">
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={handleStarLeave}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      {star <= (hoveredRating || editRating) ? (
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
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                placeholder="Type your review"
                className="w-full h-32 px-4 py-3 shadow-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E53E3E] focus:border-transparent text-sm resize-none bg-white"
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
              onClick={handleUpdateReview}
              className="w-full bg-[#E53E3E] text-white py-3 text-[12px] rounded-2xl font-medium hover:bg-red-600 transition-colors"
            >
              Send Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
