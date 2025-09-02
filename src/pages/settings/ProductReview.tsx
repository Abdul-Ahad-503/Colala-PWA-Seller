import React from 'react';

interface ReviewData {
  rating: number;
  comment: string;
  images: string[]; // URLs of the images
  reviewerName: string;
  reviewDate: string;
}

interface ProductReviewProps {
  isOpen: boolean;
  onClose: () => void;
  reviewData: ReviewData;
  onEditReview: () => void;
  onDeleteReview: () => void;
}

const ProductReview: React.FC<ProductReviewProps> = ({ 
  isOpen, 
  onClose, 
  reviewData,
  onEditReview,
  onDeleteReview
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
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

  return (
    <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-[430px] mx-4 relative">
        {/* Header */}
        <div className="flex items-center justify-center mb-6 relative pop_up">
          <h2 className="text-[20px] font-bold text-black font-OleoScript">My review</h2>
          <button 
            onClick={onClose}
            className="absolute right-0 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full"
          >
            <img src="/public/XCircle.png" alt="Close" className="w-6 h-6" />
          </button>
        </div>

        {/* Star Rating Display */}
        <div className="mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 flex justify-center shadow-sm">
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star}>
                  {star <= reviewData.rating ? (
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
              src="/public/chris.svg" 
              alt="Reviewer" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-black text-sm">{reviewData.reviewerName}</h3>
            <div className="flex items-center">
              {/* Small stars */}
              <div className="flex space-x-1 mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star}>
                    {star <= reviewData.rating ? (
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
            <p className="text-xs text-gray-500">{formatDate(reviewData.reviewDate)}</p>
          </div>
        </div>

        {/* Review Images */}
        {reviewData.images.length > 0 && (
          <div className="mb-4">
            <div className="flex space-x-2">
              {reviewData.images.map((image, index) => (
                <div key={index} className="w-16 h-16 rounded-lg  overflow-hidden">
                  <img 
                    src={image} 
                    alt={`Review image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Review Text */}
        <div className="mb-6">
          <p className="text-black text-[12px] leading-relaxed">{reviewData.comment}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onEditReview}
            className="flex-1 px-4 py-3 border border-gray-300 text-black rounded-2xl text-[12px] font-medium hover:bg-gray-50 transition-colors"
          >
            Edit Review
          </button>
          <button
            onClick={onDeleteReview}
            className="flex-1 px-4 py-3 bg-[#E53E3E] text-white rounded-2xl text-[12px] hover:bg-red-600 transition-colors"
          >
            Delete Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
