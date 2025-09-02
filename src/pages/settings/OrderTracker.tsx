import React, { useState } from 'react';
import RevealCode from './RevealCode';
import CodeDisplay from './CodeDisplay';

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

const OrderTracker: React.FC<OrderTrackerProps> = ({  storeData, onShowFullOrderDetail }) => {
  const [isRevealCodeModalOpen, setIsRevealCodeModalOpen] = useState(false);
  const [isCodeDisplayModalOpen, setIsCodeDisplayModalOpen] = useState(false);
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

  return (
    <div className="lg:col-span-2 ">
      {/* Header with back button */}
      {/* <div className="flex items-center mb-6 mt-12  px-2 pt-4">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
        >
          <img src="/public/back.svg" alt="Back" className="w-10 h-10 mr-1" />
        </button>
        <h2 className="text-base font-semibold text-black">
          Order Tracker - {storeName}
        </h2>
      </div> */}

      {/* Full Details and Open Chat buttons */}
      <div className="flex space-x-3 mb-6 px-4">
        <button className="flex-1 py-3 px-2 bg-gray-50 border border-[#CACACA] rounded-2xl text-gray-700 font-medium text-sm hover:bg-gray-100 transition-colors">
          Full Details
        </button>
        <button className="flex-1 py-3 px-2 bg-[#E53E3E] text-white rounded-2xl font-medium text-sm hover:bg-red-600 transition-colors">
          Open Chat
        </button>
      </div>

      {/* Order Timeline */}
      <div className="px-4 pb-4">
        <div className="relative">
          {/* Timeline Line - Extended for all 5 steps */}
          <div className="absolute left-6 top-16 w-px h-[800px] -mt-5 bg-red-300"></div>
          
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
                    src={storeData.items[0]?.image || "/public/DeviceMobileCamera.png"}
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
                    src={storeData.items[0]?.image || "/public/DeviceMobileCamera.png"}
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
              </div>
            </div>
          </div>

          {/* Delivered */}
          <div className="relative mb-6">
            <div className="flex items-start">
              {/* Circle indicator */}
              <div className="flex items-center justify-center w-8 h-8 ml-2 bg-[#E53E3E] text-white rounded-full text-sm font-semibold relative z-10 mr-4 mt-4">
                3
              </div>
              
              {/* Content card */}
              <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4">
                  <img 
                    src={storeData.items[0]?.image || "/public/DeviceMobileCamera.png"}
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
                
                {/* Alert message for delivered status */}
                <div className="mt-4 flex items-center bg-[#FF000033] border border-[#FF0000] rounded-lg p-3">
                  <div className="flex items-center justify-center w-6 h-6  rounded-full mr-3">
                    <span ><img src="/public/Vector.svg" alt="Alert Icon" /></span>
                  </div>
                  <p className="text-[#FF0000] text-[10px]">
                    Do no provide the code until you recieved the product
                  </p>
                </div>

                {/* Action buttons */}
                <div className="mt-4 space-y-2">
                  <button 
                    onClick={handleRevealCodeClick}
                    className="w-full py-2 bg-[#E53E3E] text-white rounded-2xl text-[12px] font-medium hover:bg-red-600 transition-colors"
                  >
                    Reveal Code
                  </button>
                  <div className="flex space-x-2">
                    <button className="flex-1 py-3 bg-white text-gray-700 rounded-2xl border border-[#CACACA] text-[12px] font-medium hover:bg-gray-200 transition-colors">
                      Return
                    </button>
                    <button className="flex-1 py-3 bg-white text-gray-700 rounded-2xl border border-[#CACACA] text-[12px] font-medium hover:bg-gray-200 transition-colors">
                      Dispute
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Funds Released */}
          <div className="relative mb-6">
            <div className="flex items-start">
              {/* Circle indicator */}
              <div className="flex items-center justify-center w-8 h-8 ml-2 bg-[#E53E3E] text-white rounded-full text-sm font-semibold relative z-10 mr-4 mt-4">
                4
              </div>
              
              {/* Content card */}
              <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4">
                  <img 
                    src={storeData.items[0]?.image || "/public/DeviceMobileCamera.png"}
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

                {/* View Wallet button */}
                <div className="mt-4">
                  <button className="w-full py-2 bg-[#E53E3E] text-white rounded-2xl text-[12px] font-medium hover:bg-red-600 transition-colors">
                    View Wallet
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Completed */}
          <div className="relative">
            <div className="flex items-start">
              {/* Circle indicator */}
              <div className="flex items-center justify-center w-8 h-8 ml-2 bg-[#E53E3E] text-white rounded-full text-sm font-semibold relative z-10 mr-4 mt-4">
                5
              </div>
              
              {/* Content card */}
              <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4">
                  <img 
                    src={storeData.items[0]?.image || "/public/DeviceMobileCamera.png"}
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

      {/* Reveal Code Modal */}
      <RevealCode
        isOpen={isRevealCodeModalOpen}
        onClose={handleCloseRevealCodeModal}
        onRevealCode={handleRevealCode}
      />

      {/* Code Display Modal */}
      <CodeDisplay
        isOpen={isCodeDisplayModalOpen}
        onClose={handleCloseCodeDisplayModal}
        onCopyCode={handleCopyCode}
        code={deliveryCode}
      />
    </div>
  );
};

export default OrderTracker;
