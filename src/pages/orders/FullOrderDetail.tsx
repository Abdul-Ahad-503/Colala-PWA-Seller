import React, { useState } from 'react';


interface FullOrderDetailProps {
  onBack: () => void;
  customerName: string;
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

const FullOrderDetail: React.FC<FullOrderDetailProps> = ({ onBack, customerName, orderData }) => {
  const [isProductReviewModalOpen, setIsProductReviewModalOpen] = useState(false);
  const [isStoreReviewModalOpen, setIsStoreReviewModalOpen] = useState(false);
  const [isProductViewModalOpen, setIsProductViewModalOpen] = useState(false);
  const [isStoreViewModalOpen, setIsStoreViewModalOpen] = useState(false);
  const [hasProductReview, setHasProductReview] = useState(false);
  const [hasStoreReview, setHasStoreReview] = useState(false);
  
  // Store the actual review data
  const [productReviewData, setProductReviewData] = useState<any>(null);
  const [storeReviewData, setStoreReviewData] = useState<any>(null);

  const handleProductReviewSubmit = (review: { rating: number; comment: string; images: File[] }) => {
    // Convert File objects to URLs for display
    const imageUrls = review.images.map(file => URL.createObjectURL(file));
    
    const reviewData = {
      rating: review.rating,
      comment: review.comment,
      images: imageUrls,
      reviewerName: "Chris Pine", // You can make this dynamic
      reviewDate: new Date().toISOString()
    };
    
    setProductReviewData(reviewData);
    setHasProductReview(true);
    setIsProductReviewModalOpen(false);
  };

  const handleStoreReviewSubmit = (review: { rating: number; comment: string; images: File[] }) => {
    // Convert File objects to URLs for display
    const imageUrls = review.images.map(file => URL.createObjectURL(file));
    
    const reviewData = {
      rating: review.rating,
      comment: review.comment,
      images: imageUrls,
      reviewerName: "Chris Pine", // You can make this dynamic
      reviewDate: new Date().toISOString()
    };
    
    setStoreReviewData(reviewData);
    setHasStoreReview(true);
    setIsStoreReviewModalOpen(false);
  };

  const handleProductReviewClick = () => {
    if (hasProductReview) {
      setIsProductViewModalOpen(true);
    } else {
      setIsProductReviewModalOpen(true);
    }
  };

  const handleStoreReviewClick = () => {
    if (hasStoreReview) {
      setIsStoreViewModalOpen(true);
    } else {
      setIsStoreReviewModalOpen(true);
    }
  };

  const handleEditProductReview = () => {
    setIsProductViewModalOpen(false);
    setIsProductReviewModalOpen(true);
  };

  const handleEditStoreReview = () => {
    setIsStoreViewModalOpen(false);
    setIsStoreReviewModalOpen(true);
  };

  const handleDeleteProductReview = () => {
    setProductReviewData(null);
    setHasProductReview(false);
    setIsProductViewModalOpen(false);
  };

  const handleDeleteStoreReview = () => {
    setStoreReviewData(null);
    setHasStoreReview(false);
    setIsStoreViewModalOpen(false);
  };
  return (
    <div className="lg:col-span-2 ml-14 -mt-14">
      {/* Header */}
      <div className="flex items-center mb-4 mt-12 px-2 pt-4">
       
        <h2 className="text-base text-[14px]  font-semibold">
          <span className="text-gray-400">{customerName}'s Orders</span>
          <span className="text-gray-400"> / </span>
          <span className="text-gray-400">Order Tracker</span>
          <span className="text-gray-400"> / </span>
          <span className="text-black">Full Order details</span>
        </h2>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Store Container */}
        <div className="lg:col-span-2 space-y-3">
          {/* Store Header with Checkbox on the side */}
          <div className="flex items-center space-x-4">
            {/* Checkbox */}
            {/* <div>
              <input
                type="checkbox"
                defaultChecked={true}
                className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
            </div> */}
            
            {/* Header Section in separate rounded container */}
            <div className="flex-1 bg-primary text-white px-6 py-3 pb-7 flex items-center justify-between rounded-2xl">
              <span className="font-medium text-sm">{orderData.orderId}</span>
              <div className="flex items-center space-x-2">
                
               
              </div>
            </div>
          </div>

          {/* Store Container connected to header - All sections in one white container */}
          <div className="bg-white rounded-2xl overflow-hidden ml-0.5  relative -mt-8 min-h-[400px]">
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
                      <p className="text-primary font-bold text-[12px] mb-2">{item.price}</p>
                      <p className="text-primary text-[12px]">Qty: {item.quantity}</p>
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
                    className="w-full px-7 py-3 pr-24 border border-[#CDCDCD] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    readOnly
                  />
                  
                </div>
              </div>

              {/* Discount Points Section */}
              <div className="bg-white rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-black text-[12px] font-medium">Discount Points</span>
                  <span className="text-primary text-[12px] font-medium">Bal: 200 Points</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="200"
                    defaultValue="200"
                    className="flex-1 px-7 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
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
                  <span className="text-primary text-[12px] font-medium"><u>Delivery New Location</u></span>
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
                    <span className="text-primary text-[12px] font-bold">5,000,000</span>
                  </div>
                  <div className="flex justify-between bg-[#EDEDED] p-2 border border-[#CACACA] rounded-lg mb-1">
                    <span className="text-black text-[12px]">Coupon Discount</span>
                    <span className="text-primary text-[12px] font-bold">-5,000</span>
                  </div>
                  <div className="flex justify-between bg-[#EDEDED] p-2 border border-[#CACACA] rounded-lg mb-1">
                    <span className="text-black text-[12px]">Points Discount</span>
                    <span className="text-primary text-[12px] font-bold">-10,000</span>
                  </div>
                  <div className="flex justify-between bg-[#EDEDED] p-2 border border-[#CACACA] rounded-lg mb-1">
                    <span className="text-black text-[12px]">Delivery fee</span>
                    <span className="text-primary text-[12px] font-bold">10,000</span>
                  </div>
                  <div className="flex justify-between bg-[#EDEDED] p-2 border border-[#CACACA] rounded-lg mb-1">
                    <span className="text-black text-[12px]">Total to pay</span>
                    <span className="text-primary font-bold text-[12px]">N4,995,000</span>
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
            </div>
          </div>
        </div>

        {/* Right Side - Tracking Info */}
        <div className="lg:col-span-1 space-y-3 w-[279px]">
          {/* Tracking Info Section */}
          <div className="space-y-3">
            {/* Tracking id */}
            <div className="bg-[#EDEDED] border border-[#CACACA] rounded-lg p-3 mb-1">
              <div className="flex justify-between items-center">
                <span className="text-black text-[12px]">Tracking id</span>
                <span className="text-black text-[12px] font-bold">Ord-2248 dndkwd</span>
              </div>
            </div>

            {/* Total Items */}
            <div className="bg-[#EDEDED] border border-[#CACACA] rounded-lg p-3 mb-1">
              <div className="flex justify-between items-center">
                <span className="text-black text-[12px]">Total Items</span>
                <span className="text-black text-[12px] font-bold">4</span>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-[#EDEDED] border border-[#CACACA] rounded-lg p-3 mb-1">
              <div className="flex justify-between items-center">
                <span className="text-black text-[12px]">Payment method</span>
                <span className="text-black text-[12px] font-bold">Shopping Wallet</span>
              </div>
            </div>

            {/* Total */}
            <div className="bg-[#EDEDED] border border-[#CACACA] rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-black text-[12px]">Total</span>
                <span className="text-primary text-[12px] font-bold">N9,990,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

     

           
        
    

    </div>
  );
};

export default FullOrderDetail;
