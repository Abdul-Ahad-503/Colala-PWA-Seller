import React, { useState } from 'react';
import IMAGES from '../../constants';
import OrderStore from './OrderStore';
import OrderTracker from './OrderTracker';
import FullOrderDetail from './FullOrderDetail';

interface Order {
  id: string;
  stores: string;
  amount: string;
  status: 'Order Placed' | 'Out for Delivery' | 'Delivered' | 'Completed';
}

interface OrderItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface OrderStoreType {
  id: string;
  name: string;
  items: OrderItem[];
}

const Orders: React.FC = () => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0);
  const [activeStatus, setActiveStatus] = useState('Order Placed');
  const [showTracker, setShowTracker] = useState(false);
  const [showFullOrderDetail, setShowFullOrderDetail] = useState(false);
  const [selectedStore, setSelectedStore] = useState<OrderStoreType | null>(null);
  const [fullOrderData, setFullOrderData] = useState<any>(null);

  // Handle track order button click
  const handleTrackOrder = (store: OrderStoreType) => {
    setSelectedStore(store);
    setShowTracker(true);
    setShowFullOrderDetail(false);
  };

  // Handle back from tracker
  const handleBackFromTracker = () => {
    setShowTracker(false);
    setSelectedStore(null);
  };

  // Handle show full order detail
  const handleShowFullOrderDetail = (orderData: any) => {
    setFullOrderData(orderData);
    setShowTracker(false);
    setShowFullOrderDetail(true);
  };

  // Handle back from full order detail
  const handleBackFromFullOrderDetail = () => {
    setShowFullOrderDetail(false);
    setShowTracker(true);
  };

  // Handle back to main order list
  const handleBackToOrders = () => {
    setShowOrderDetails(false);
    setShowTracker(false);
    setShowFullOrderDetail(false);
    setSelectedStore(null);
    setFullOrderData(null);
  };

  // Handle order item click
  const handleOrderClick = (orderId: string, index: number) => {
    setSelectedOrderIndex(index);
    setShowOrderDetails(true);
  };

  // Sample order data from OrderDetails.tsx
  const orders: Order[] = [
    { id: 'Ord-1wcjmefmvk', stores: '2 stores', amount: 'N9,999,990', status: 'Order Placed' },
    { id: 'Ord-1wcjmefmvk', stores: '2 stores', amount: 'N9,999,990', status: 'Out for Delivery' },
    { id: 'Ord-1wcjmefmvk', stores: '2 stores', amount: 'N9,999,990', status: 'Delivered' },
    { id: 'Ord-1wcjmefmvk', stores: '2 stores', amount: 'N9,999,990', status: 'Completed' },
    { id: 'Ord-1wcjmefmvk', stores: '2 stores', amount: 'N9,999,990', status: 'Completed' }
  ];

  // Multiple order stores data from OrderDetails.tsx
  const allOrderStores: OrderStoreType[][] = [
    // Order 1 stores
    [
      {
        id: '1',
        name: 'Sasha Stores',
        items: [
          {
            id: 1,
            name: 'Iphone 16 pro max - Black',
            price: 'N2,500,000',
            quantity: 1,
            image: '/top1.png'
          },
          {
            id: 2,
            name: 'Iphone 16 pro max - Black',
            price: 'N2,500,000',
            quantity: 1,
            image: '/top1.png'
          }
        ]
      },
      {
        id: '2',
        name: 'Vee Stores',
        items: [
          {
            id: 3,
            name: 'Iphone 16 pro max - Black',
            price: 'N2,500,000',
            quantity: 1,
            image: '/top1.png'
          },
          {
            id: 4,
            name: 'Iphone 16 pro max - Black',
            price: 'N2,500,000',
            quantity: 1,
            image: '/top1.png'
          }
        ]
      }
    ],
    // Order 2 stores (different items)
    [
      {
        id: '3',
        name: 'Sasha Stores',
        items: [
          {
            id: 5,
            name: 'Iphone 16 pro max - Blue',
            price: 'N2,500,000',
            quantity: 1,
            image: '/top2.png'
          }
        ]
      },
      {
        id: '4',
        name: 'Tech World',
        items: [
          {
            id: 6,
            name: 'Samsung Galaxy S24',
            price: 'N1,800,000',
            quantity: 2,
            image: '/top3.png'
          }
        ]
      }
    ],
    // Order 3 stores
    [
      {
        id: '5',
        name: 'Mobile Hub',
        items: [
          {
            id: 7,
            name: 'Iphone 15 Pro',
            price: 'N2,200,000',
            quantity: 1,
            image: '/top4.png'
          }
        ]
      }
    ],
    // Order 4 stores
    [
      {
        id: '6',
        name: 'Electronics Plus',
        items: [
          {
            id: 8,
            name: 'MacBook Pro',
            price: 'N3,500,000',
            quantity: 1,
            image: '/top5.png'
          }
        ]
      }
    ],
    // Order 5 stores
    [
      {
        id: '7',
        name: 'Smart Devices',
        items: [
          {
            id: 9,
            name: 'iPad Pro',
            price: 'N1,900,000',
            quantity: 1,
            image: '/top6.png'
          }
        ]
      }
    ]
  ];

  // Get current order stores based on selected order
  const currentOrderStores = allOrderStores[selectedOrderIndex] || allOrderStores[0];

  // If showing order details, render the order detail view like OrderDetails.tsx
  if (showOrderDetails) {
    return (
      <div className="flex-1 bg-white rounded-[20px] overflow-hidden">
        <div className="">
          {/* Header with breadcrumb and back button */}
          <div className="p-6 ">
            <div className="flex items-center mb-2">
              <button 
                onClick={handleBackToOrders}
                className="mr-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center text-gray-600 text-sm">
                <span>Order Summary</span>
                <span className="mx-2">/</span>
                {showFullOrderDetail ? (
                  <>
                    <span>Order Details</span>
                    <span className="mx-2">/</span>
                    <span>Track Order</span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900">Full Order Details</span>
                  </>
                ) : showTracker ? (
                  <>
                    <span>Order Details</span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900">Track Order</span>
                  </>
                ) : (
                  <span className="text-gray-900">View Order Details</span>
                )}
              </div>
            </div>
          </div>

          {/* Order Details Content */}
          <div className="p-6">
            {showFullOrderDetail && fullOrderData ? (
              <FullOrderDetail
                onBack={handleBackFromFullOrderDetail}
                orderData={fullOrderData}
              />
            ) : showTracker && selectedStore ? (
              <OrderTracker 
                onBack={handleBackFromTracker}
                storeName={selectedStore.name}
                storeData={selectedStore}
                onShowFullOrderDetail={handleShowFullOrderDetail}
              />
            ) : (
              <OrderStore 
                activeStatus={activeStatus}
                setActiveStatus={setActiveStatus}
                currentOrderStores={currentOrderStores}
                onTrackOrder={handleTrackOrder}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default view - Order Summary
  return (
    <div className="flex-1 p-8 bg-white mt-8 rounded-[20px] h-[1054px]">
      <div className="max-w-2xl">
        {/* Order Summary Section */}
        <div className="bg-white">
          <h2 className="text-[20px] font-semibold text-[#000000] mb-6">Order Summary</h2>
          
          <div className="space-y-3">
            {orders.map((item, index) => (
              <div 
                key={index} 
                onClick={() => handleOrderClick(item.id, index)}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl h-[70px] hover:bg-gray-50 transition-colors cursor-pointer hover:border-[#E53E3E]"
              >
                {/* Left side - Cart icon and order details */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#B9191933] rounded-full flex items-center justify-center">
                    <img src={IMAGES.ordercart} alt="Order" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[14px] text-gray-900">{item.id}</h3>
                    <p className="text-[10px] text-gray-500">{item.stores}</p>
                  </div>
                </div>
                
                {/* Right side - Price */}
                <div className="text-right">
                  <p className="font-semibold text-red-600 text-[14px]">{item.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
