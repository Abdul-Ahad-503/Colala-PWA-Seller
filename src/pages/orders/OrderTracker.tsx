import React, { useState } from 'react';
import RequestCode from './RequestCode';
import FullOrderDetail from './FullOrderDetail';


interface OrderTrackerProps {
  onBack: () => void;
  storeName: string;
  storeData: {
    id: string;
    name: string;
    items: Array<{
      id: number;
      name: string;
      price: string;
      quantity: number;
      image: string;
    }>;
  };
  onShowFullOrderDetail: (orderData: any) => void;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({ onBack, storeName, storeData, onShowFullOrderDetail }) => {
  const [isRevealCodeModalOpen, setIsRevealCodeModalOpen] = useState(false);
  const [isCodeDisplayModalOpen, setIsCodeDisplayModalOpen] = useState(false);
  const [showDeliveryTracking, setShowDeliveryTracking] = useState(false);
  const [isRequestCodeModalOpen, setIsRequestCodeModalOpen] = useState(false);
  const [showFullOrderDetail, setShowFullOrderDetail] = useState(false);
  const deliveryCode = "1415"; // This could be dynamic based on the order

  const handleRevealCodeClick = () => {
    setIsRevealCodeModalOpen(true);
  };

  const handleCloseRevealCodeModal = () => {
    setIsRevealCodeModalOpen(false);
  };

  const handleRevealCode = () => {
    // Close the first modal and open the code display modal
    setIsRevealCodeModalOpen(false);
    setIsCodeDisplayModalOpen(true);
  };

  const handleCloseCodeDisplayModal = () => {
    setIsCodeDisplayModalOpen(false);
  };

  const handleMarkAsOutForDelivery = () => {
    setShowDeliveryTracking(true);
  };

  const handleBackFromDeliveryTracking = () => {
    setShowDeliveryTracking(false);
  };

  const handleRequestCodeClick = () => {
    console.log('Request Code button clicked');
    setIsRequestCodeModalOpen(true);
  };

  const handleCloseRequestCodeModal = () => {
    setIsRequestCodeModalOpen(false);
  };

  const handleRequestCodeProceed = (code: string) => {
    console.log('Customer code entered:', code);
    setIsRequestCodeModalOpen(false);
    // You can add additional logic here to handle the code
  };

  const handleViewWalletClick = () => {
    setShowFullOrderDetail(true);
  };

  const handleBackFromFullOrderDetail = () => {
    setShowFullOrderDetail(false);
  };

  const handleCopyCode = () => {
    // Copy the code to clipboard
    navigator.clipboard.writeText(deliveryCode).then(() => {
      console.log('Code copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
    setIsCodeDisplayModalOpen(false);
    
    // Prepare order data and show full order detail
    const orderData = {
      orderId: "Ord-1234mdnmw",
      items: storeData.items,
      storeName: storeData.name,
      deliveryAddress: {
        phone: "07033256789",
        address: "No 7, alani street, Ajah, Lagos"
      }
    };
    onShowFullOrderDetail(orderData);
  };

  // If showing full order detail, render the full order detail view
  if (showFullOrderDetail) {
    const orderData = {
      orderId: "Ord-1234mdnmw",
      items: storeData.items,
      storeName: storeData.name,
      deliveryAddress: {
        phone: "07033256789",
        address: "No 7, alani street, Ajah, Lagos"
      }
    };

    return (
      <FullOrderDetail
        onBack={handleBackFromFullOrderDetail}
        customerName={storeName}
        orderData={orderData}
      />
    );
  }

  // If showing delivery tracking, render the delivery tracking view
  if (showDeliveryTracking) {
    return (
      <div className="lg:col-span-2 ml-14 -mt-14">
        {/* Header with back button */}
        <div className="flex items-center mb-6 mt-12 px-2 pt-4">
         
          <h2 className="text-base text-[14px] font-semibold">
            <span className="text-gray-400">{storeName}</span>
            <span className="text-gray-400"> / </span>
            <span className="text-black">Order Tracker</span>
          </h2>
        </div>

        {/* Full Details and Open Chat buttons */}
        <div className="flex space-x-3 mb-6 px-4">
          <button className="flex-1 py-3 px-2 bg-gray-50 border border-[#CACACA] rounded-2xl text-gray-700 font-medium text-sm hover:bg-gray-100 transition-colors">
            Full Details
          </button>
          <button className="flex-1 py-3 px-2 bg-[#E53E3E] text-white rounded-2xl font-medium text-sm hover:bg-red-600 transition-colors">
            Open Chat
          </button>
        </div>

        {/* Delivery Tracking Timeline */}
        <div className="px-4 pb-4">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-16 w-px h-[800px] -mt-5 bg-[#E53E3E]"></div>
            
            {/* Order Placed */}
            <div className="relative mb-6">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 ml-2 bg-[#E53E3E] text-white rounded-full text-sm font-semibold relative z-10 mr-4 mt-4">
                  1
                </div>
                <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={storeData.items[0]?.image || "/iphone.svg"}
                      alt={storeData.items[0]?.name || "Product"}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#E53E3E] text-[20px] mb-1">Order Placed</h3>
                      <p className="text-gray-600 text-[12px] mb-1">
                        {storeData.items[0]?.name || "Iphone 16 pro max + iphone i6 pro m..."}
                      </p>
                      <p className="text-[#E53E3E] font-bold text-[12px]">
                        {storeData.items[0]?.price || "N2,500,000"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 mt-12 text-[6px]">5th Aug 2024-07:23 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Out for Delivery */}
            <div className="relative mb-6">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 ml-2 bg-[#E53E3E] text-white rounded-full text-sm font-semibold relative z-10 mr-4 mt-4">
                  2
                </div>
                <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={storeData.items[0]?.image || "/iphone.svg"}
                      alt={storeData.items[0]?.name || "Product"}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#E53E3E] text-[20px] mb-1">Out for Delivery</h3>
                      <p className="text-gray-600 text-[12px] mb-1">
                        {storeData.items[0]?.name || "Iphone 16 pro max + iphone i6 pro m..."}
                      </p>
                      <p className="text-[#E53E3E] font-bold text-[12px]">
                        {storeData.items[0]?.price || "N2,500,000"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 mt-12 text-[6px]">5th Aug 2024-07:25 AM</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="w-full py-3 bg-[#E53E3E] text-white rounded-2xl text-sm font-medium">
                      Out for delivery
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivered */}
            <div className="relative mb-6">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 ml-2 bg-[#E53E3E] text-white rounded-full text-sm font-semibold relative z-10 mr-4 mt-4">
                  3
                </div>
                <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={storeData.items[0]?.image || "/iphone.svg"}
                      alt={storeData.items[0]?.name || "Product"}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#E53E3E] text-[20px] mb-1">Delivered</h3>
                      <p className="text-gray-600 text-[12px] mb-1">
                        {storeData.items[0]?.name || "Iphone 16 pro max + iphone i6 pro m..."}
                      </p>
                      <p className="text-[#E53E3E] font-bold text-[12px]">
                        {storeData.items[0]?.price || "N2,500,000"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 mt-12 text-[6px]">5th Aug 2024-08:15 AM</p>
                    </div>
                  </div>
                  
                  {/* Alert message */}
                  <div className="mt-4 flex items-center bg-[#FFF5F5] border border-[#E53E3E] rounded-lg p-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full mr-3">
                      <svg className="w-4 h-4 text-[#E53E3E]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <p className="text-[#E53E3E] text-[10px]">
                      This item needs to be hand picked up by the seller on delivery
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-4 space-y-2">
                    <button 
                      onClick={handleRequestCodeClick}
                      className="w-full py-2 bg-[#E53E3E] text-white rounded-2xl text-[12px] font-medium hover:bg-red-600 transition-colors"
                    >
                      Request Code
                    </button>
                    <button className="w-full py-2 bg-white text-gray-700 rounded-2xl border border-[#CACACA] text-[12px] font-medium hover:bg-gray-50 transition-colors">
                      Dispute
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Funds Released */}
            <div className="relative mb-6">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 ml-2 bg-[#E53E3E] text-white rounded-full text-sm font-semibold relative z-10 mr-4 mt-4">
                  4
                </div>
                <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={storeData.items[0]?.image || "/iphone.svg"}
                      alt={storeData.items[0]?.name || "Product"}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#E53E3E] text-[20px] mb-1">Funds Released</h3>
                      <p className="text-gray-600 text-[12px] mb-1">
                        {storeData.items[0]?.name || "Iphone 16 pro max + iphone i6 pro m..."}
                      </p>
                      <p className="text-[#E53E3E] font-bold text-[12px]">
                        {storeData.items[0]?.price || "N2,500,000"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 mt-12 text-[6px]">5th Aug 2024-09:00 AM</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button 
                      onClick={handleViewWalletClick}
                      className="w-full py-2 bg-[#E53E3E] text-white rounded-2xl text-[12px] font-medium hover:bg-red-600 transition-colors"
                    >
                      View Wallet
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Completed */}
            <div className="relative">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 ml-2 bg-[#E53E3E] text-white rounded-full text-sm font-semibold relative z-10 mr-4 mt-4">
                  5
                </div>
                <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={storeData.items[0]?.image || "/iphone.svg"}
                      alt={storeData.items[0]?.name || "Product"}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#E53E3E] text-[20px] mb-1">Order Completed</h3>
                      <p className="text-gray-600 text-[12px] mb-1">
                        {storeData.items[0]?.name || "Iphone 16 pro max + iphone i6 pro m..."}
                      </p>
                      <p className="text-[#E53E3E] font-bold text-[12px]">
                        {storeData.items[0]?.price || "N2,500,000"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 mt-12 text-[6px]">5th Aug 2024-09:30 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Request Code Modal */}
        <RequestCode
          isOpen={isRequestCodeModalOpen}
          onClose={handleCloseRequestCodeModal}
          onProceed={handleRequestCodeProceed}
        />
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 ml-14 -mt-14 ">
      {/* Header with back button */}
      <div className="flex items-center mb-6 mt-12  px-2 pt-4">
      
        <h2 className="text-base text-[14px] font-semibold">
          <span className="text-gray-400">{storeName}</span>
          <span className="text-gray-400"> / </span>
          <span className="text-black">Order Tracker</span>
        </h2>
      </div>

      {/* Full Details and Open Chat buttons */}
      <div className="flex space-x-3 mb-6 px-4">
        <button className="flex-1 py-3 px-2 bg-gray-50 border border-[#CACACA] rounded-2xl text-gray-700 font-medium text-sm hover:bg-gray-100 transition-colors">
          Full Details
        </button>
        <button className="flex-1 py-3 px-2 bg-[#E53E3E] text-white rounded-2xl font-medium text-sm hover:bg-red-600 transition-colors">
          Open Chat
        </button>
      </div>

      {/* Order Timeline - ONLY First 2 Steps */}
      <div className="px-4 pb-4">
        <div className="relative">
          {/* Timeline Line - Shorter for 2 steps */}
          <div className="absolute left-6 top-16 w-px h-[300px] -mt-5 bg-[#E53E3E]"></div>
          
          {/* Order Placed */}
          <div className="relative mb-6">
            <div className="flex items-start">
              {/* Circle indicator */}
              <div className="flex items-center justify-center w-8 h-8 ml-2 bg-[#E53E3E] text-white rounded-full text-sm font-semibold relative z-10 mr-4 mt-4">
                1
              </div>
              
              {/* Content card */}
              <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4">
                  <img 
                    src={storeData.items[0]?.image || "/iphone.svg"}
                    alt={storeData.items[0]?.name || "Product"}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#E53E3E] text-[20px] mb-1">Order Placed</h3>
                    <p className="text-gray-600 text-[12px] mb-1">
                      {storeData.items[0]?.name || "Iphone 16 pro max + iphone i6 pro m..."}
                    </p>
                    <p className="text-[#E53E3E] font-bold text-[12px]">
                      {storeData.items[0]?.price || "N2,500,000"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 mt-12 text-[6px]">5th Aug 2024-07:23 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Out for Delivery */}
          <div className="relative mb-6">
            <div className="flex items-start">
              {/* Circle indicator */}
              <div className="flex items-center justify-center w-8 h-8 ml-2 bg-[#E53E3E] text-white rounded-full text-sm font-semibold relative z-10 mr-4 mt-4">
                2
              </div>
              
              {/* Content card */}
              <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4">
                  <img 
                    src={storeData.items[0]?.image || "/iphone.svg"}
                    alt={storeData.items[0]?.name || "Product"}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#E53E3E] text-[20px] mb-1">Out for Delivery</h3>
                    <p className="text-gray-600 text-[12px] mb-1">
                      {storeData.items[0]?.name || "Iphone 16 pro max + iphone i6 pro m..."}
                    </p>
                    <p className="text-[#E53E3E] font-bold text-[12px]">
                      {storeData.items[0]?.price || "N2,500,000"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 mt-12 text-[6px]">5th Aug 2024-07:25 AM</p>
                  </div>
                </div>
                
                {/* Mark as out for delivery button */}
                <div className="mt-4">
                  <button 
                    onClick={handleMarkAsOutForDelivery}
                    className="w-full py-3 bg-white border border-[#E53E3E] text-[#E53E3E] rounded-2xl text-sm font-medium hover:bg-red-50 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Mark as out for delivery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Code Modal */}
      <RequestCode
        isOpen={isRequestCodeModalOpen}
        onClose={handleCloseRequestCodeModal}
        onProceed={handleRequestCodeProceed}
      />
    </div>
  );
};

export default OrderTracker;
