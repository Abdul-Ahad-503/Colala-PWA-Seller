import React, { useState, useEffect } from 'react';
import ProductLeaveReview from './ProductLeaveReview';
import StoreLeaveReview from './StoreLeaveReview';
import ProductReview from './ProductReview';
import StoreReview from './StoreReview';

interface FullOrderDetailProps {
  onBack: () => void;
  orderData: {
    orderId: string;
    items: Array<{
      id: number;
      name: string;
      price: string;
      quantity: number;
      image: string;
    }>;
    storeName: string;
    deliveryAddress: {
      phone: string;
      address: string;
    };
  };
}

const FullOrderDetail: React.FC<FullOrderDetailProps> = ({ onBack, orderData }) => {
  const [hasProductReview, setHasProductReview] = useState(false);
  const [hasStoreReview, setHasStoreReview] = useState(false);
  
  // Modal states for review components
  const [showProductLeaveReview, setShowProductLeaveReview] = useState(false);
  const [showStoreLeaveReview, setShowStoreLeaveReview] = useState(false);
  const [showProductReview, setShowProductReview] = useState(false);
  const [showStoreReview, setShowStoreReview] = useState(false);

  // Review data from localStorage
  const [productReviewData, setProductReviewData] = useState<any>(null);
  const [storeReviewData, setStoreReviewData] = useState<any>(null);

  // Load reviews from localStorage on component mount
  useEffect(() => {
    const loadReviews = () => {
      // Load product review
      const savedProductReview = localStorage.getItem(`product_review_${orderData.orderId}`);
      if (savedProductReview) {
        const reviewData = JSON.parse(savedProductReview);
        setProductReviewData(reviewData);
        setHasProductReview(true);
      }

      // Load store review
      const savedStoreReview = localStorage.getItem(`store_review_${orderData.orderId}_${orderData.storeName}`);
      if (savedStoreReview) {
        const reviewData = JSON.parse(savedStoreReview);
        setStoreReviewData(reviewData);
        setHasStoreReview(true);
      }
    };

    loadReviews();
  }, [orderData.orderId, orderData.storeName]);

  const handleProductReviewClick = () => {
    if (hasProductReview) {
      setShowProductReview(true);
    } else {
      setShowProductLeaveReview(true);
    }
  };

  const handleStoreReviewClick = () => {
    if (hasStoreReview) {
      setShowStoreReview(true);
    } else {
      setShowStoreLeaveReview(true);
    }
  };

  const handleProductReviewSubmit = (review: { rating: number; comment: string; images: File[] }) => {
    // Convert File objects to base64 strings for localStorage
    const convertImagesToBase64 = async (files: File[]) => {
      const promises = files.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });
      return Promise.all(promises);
    };

    convertImagesToBase64(review.images).then(imageBase64Array => {
      const reviewData = {
        rating: review.rating,
        comment: review.comment,
        images: imageBase64Array,
        reviewerName: "You", // Current user
        reviewDate: new Date().toISOString()
      };

      // Save to localStorage
      localStorage.setItem(`product_review_${orderData.orderId}`, JSON.stringify(reviewData));
      
      // Update state
      setProductReviewData(reviewData);
      setHasProductReview(true);
      setShowProductLeaveReview(false);
    });
  };

  const handleStoreReviewSubmit = (review: { rating: number; comment: string; images: File[] }) => {
    // Convert File objects to base64 strings for localStorage
    const convertImagesToBase64 = async (files: File[]) => {
      const promises = files.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });
      return Promise.all(promises);
    };

    convertImagesToBase64(review.images).then(imageBase64Array => {
      const reviewData = {
        rating: review.rating,
        comment: review.comment,
        images: imageBase64Array,
        reviewerName: "You", // Current user
        reviewDate: new Date().toISOString()
      };

      // Save to localStorage
      localStorage.setItem(`store_review_${orderData.orderId}_${orderData.storeName}`, JSON.stringify(reviewData));
      
      // Update state
      setStoreReviewData(reviewData);
      setHasStoreReview(true);
      setShowStoreLeaveReview(false);
    });
  };

  const handleEditProductReview = () => {
    setShowProductReview(false);
    setShowProductLeaveReview(true);
  };

  const handleEditStoreReview = () => {
    setShowStoreReview(false);
    setShowStoreLeaveReview(true);
  };

  const handleDeleteProductReview = () => {
    // Remove from localStorage
    localStorage.removeItem(`product_review_${orderData.orderId}`);
    
    // Update state
    setHasProductReview(false);
    setProductReviewData(null);
    setShowProductReview(false);
  };

  const handleDeleteStoreReview = () => {
    // Remove from localStorage
    localStorage.removeItem(`store_review_${orderData.orderId}_${orderData.storeName}`);
    
    // Update state
    setHasStoreReview(false);
    setStoreReviewData(null);
    setShowStoreReview(false);
  };

  return (
    <div className="lg:col-span-2">
      {/* Header */}
      {/* <div className="flex items-center mb-4">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
        >
          <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-[16px] font-medium text-black">
          Order details / Full Order details
        </h2>
      </div> */}

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Store Container */}
        <div className="lg:col-span-2 space-y-3">
          {/* Store Header with Checkbox on the side */}
          <div className="flex items-center w-[613px] space-x-4">
            {/* Header Section in separate rounded container */}
            <div className="flex-1 bg-[#E53E3E] text-white px-6 py-3  pb-7 flex items-center justify-between rounded-2xl">
              <span className="font-medium text-sm">{orderData.storeName}</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-white text-[#E53E3E] px-2 py-1 rounded-full font-medium">
                  Start Chat
                </span>
                {/* Heart (Favorite) Button */}
                <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Close (X) Button */}
                <button className="w-8 h-8  rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Store Container connected to header - All sections in one white container */}
          <div className="bg-white rounded-2xl  overflow-hidden ml-0.5  relative -mt-8 h-[1400px] w-[613px] ">
            <div className="p-4 pt-6">
              {/* Order Items */}
              <div className="space-y-3 mb-0.5">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex items-center bg-[#F9F9F9] rounded-2xl p-4 space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-black text-[12px] mb-1">{item.name}</h3>
                      <p className="text-[#E53E3E] font-bold text-[12px] mb-2">{item.price}</p>
                      <p className="text-[#E53E3E] text-[12px]">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Section */}
              <div className="bg-white rounded-2xl p-4 ">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-black text-[12px] font-medium">Do you have a coupon code, input here</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="NEW200"
                    defaultValue="NEW200"
                    className="w-full px-7 py-3 pr-24 border border-[#CDCDCD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53E3E] text-sm"
                    readOnly
                  />
                </div>
              </div>

              {/* Discount Points Section */}
              <div className="bg-white rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-black text-[12px] font-medium">Discount Points</span>
                  <span className="text-[#E53E3E] text-[12px] font-medium">Bal: 200 Points</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="200"
                    defaultValue="200"
                    className="flex-1 px-7 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53E3E] text-sm"
                    readOnly
                  />
                </div>
              </div>

              {/* Loyalty Points Notice */}
              <div className="bg-[#FF000033] border border-[#FF0000] rounded-2xl p-2">
                <p className="text-center text-[#FF0000] text-[10px]">
                  Kindly note that 1 point is equivalent to N1
                </p>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-black text-[12px] font-medium">Delivery Address</span>
                  <span className="text-[#E53E3E] text-[12px] font-medium"><u>Delivery New Location</u></span>
                </div>
                <div className="border border-[#CDCDCD] rounded-lg p-2">
                  <div className="text-[#00000080] font-medium text-[12px]">Phone number</div>
                  <div className="text-black text-[12px]">{orderData.deliveryAddress.phone}</div>
                  <div className="text-[#00000080] text-[12px]">Address</div>
                  <div className="text-gray-600 text-[12px]">{orderData.deliveryAddress.address}</div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-2xl p-2">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between bg-[#EDEDED] p-2 border border-[#CACACA] rounded-lg mb-1">
                    <span className="text-black text-[12px]">Ord id</span>
                    <span className="text-black text-[12px] font-medium">Ord 12244nnne</span>
                  </div>
                  <div className="flex justify-between bg-[#EDEDED] p-2 border border-[#CACACA] rounded-lg mb-1">
                    <span className="text-black text-[12px]">No of Items</span>
                    <span className="text-black text-[12px] font-bold">2</span>
                  </div>
                  <div className="flex justify-between bg-[#EDEDED] p-2 border border-[#CACACA] rounded-lg mb-1">
                    <span className="text-black text-[12px]">Items Cost</span>
                    <span className="text-[#E53E3E] text-[12px] font-bold">5,000,000</span>
                  </div>
                  <div className="flex justify-between bg-[#EDEDED] p-2 border border-[#CACACA] rounded-lg mb-1">
                    <span className="text-black text-[12px]">Coupon Discount</span>
                    <span className="text-red-500 text-[12px] font-bold">-5,000</span>
                  </div>
                  <div className="flex justify-between bg-[#EDEDED] p-2 border border-[#CACACA] rounded-lg mb-1">
                    <span className="text-black text-[12px]">Points Discount</span>
                    <span className="text-red-500 text-[12px] font-bold">-10,000</span>
                  </div>
                  <div className="flex justify-between bg-[#EDEDED] p-2 border border-[#CACACA] rounded-lg mb-1">
                    <span className="text-black text-[12px]">Delivery fee</span>
                    <span className="text-[#E53E3E] text-[12px] font-bold">10,000</span>
                  </div>
                  <div className="flex justify-between bg-[#EDEDED] p-2 border border-[#CACACA] rounded-lg mb-1">
                    <span className="text-black text-[12px]">Total to pay</span>
                    <span className="text-[#E53E3E] font-bold text-[12px]">N4,995,000</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <button 
                  onClick={handleProductReviewClick}
                  className="flex-1 py-3 bg-white border border-[#CACACA] text-[#000000] rounded-2xl text-[12px] font-medium hover:bg-gray-200 transition-colors"
                >
                  {hasProductReview ? 'View Product Review' : 'Leave Product Review'}
                </button>
                <button 
                  onClick={handleStoreReviewClick}
                  className="flex-1 py-3 bg-white border border-[#CACACA] text-[#000000] rounded-2xl text-[12px] font-medium hover:bg-gray-200 transition-colors"
                >
                  {hasStoreReview ? 'View Store Review' : 'Leave Store Review'}
                </button>
              </div>

              {/* Tracking Info Section - Added within store container */}
              <div className="bg-white rounded-2xl p-4 mt-4">
                <div className="space-y-3">
                  {/* Tracking id */}
                  <div className="bg-[#EDEDED] border border-[#CACACA] rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-black text-[12px]">Tracking id</span>
                      <span className="text-black text-[12px] font-bold">Ord-2248 dndkwd</span>
                    </div>
                  </div>

                  {/* Vendor Product Service */}
                  <div className="bg-[#EDEDED] border border-[#CACACA] rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-black text-[12px]">Vendor Product Service</span>
                      <span className="text-black text-[12px] font-bold">View Store Service</span>
                    </div>
                  </div>

                  {/* Packaging */}
                  <div className="bg-[#EDEDED] border border-[#CACACA] rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-black text-[12px]">Packaging</span>
                      <span className="text-black text-[12px] font-bold">View Store Service</span>
                    </div>
                  </div>

                  {/* Total Items */}
                  <div className="bg-[#EDEDED] border border-[#CACACA] rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-black text-[12px]">Total Items</span>
                      <span className="text-black text-[12px] font-bold">4</span>
                    </div>
                  </div>

                  {/* Payment method */}
                  <div className="bg-[#EDEDED] border border-[#CACACA] rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-black text-[12px]">Payment method</span>
                      <span className="text-black text-[12px] font-bold">Shopping Wallet</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-[#EDEDED] border border-[#CACACA] rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-black text-[12px]">Total</span>
                      <span className="text-[#E53E3E] text-[12px] font-bold">N9,990,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Additional space */}
        <div className="lg:col-span-1 space-y-3">
          {/* This space can be used for additional content if needed */}
        </div>
      </div>

      {/* Review Modals */}
      <ProductLeaveReview
        isOpen={showProductLeaveReview}
        onClose={() => setShowProductLeaveReview(false)}
        onSubmitReview={handleProductReviewSubmit}
      />

      <StoreLeaveReview
        isOpen={showStoreLeaveReview}
        onClose={() => setShowStoreLeaveReview(false)}
        onSubmitReview={handleStoreReviewSubmit}
      />

      <ProductReview
        isOpen={showProductReview}
        onClose={() => setShowProductReview(false)}
        reviewData={productReviewData}
        onEditReview={handleEditProductReview}
        onDeleteReview={handleDeleteProductReview}
      />

      <StoreReview
        isOpen={showStoreReview}
        onClose={() => setShowStoreReview(false)}
        reviewData={storeReviewData}
        onEditReview={handleEditStoreReview}
        onDeleteReview={handleDeleteStoreReview}
      />
    </div>
  );
};

export default FullOrderDetail;
