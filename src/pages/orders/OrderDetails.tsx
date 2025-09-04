import React, { useState } from 'react';
import OrderTracker from './OrderTracker';

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

const OrderDetails: React.FC = () => {
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0);
  const [showTracker, setShowTracker] = useState(false);
  const [selectedStore, setSelectedStore] = useState<OrderStoreType | null>(null);

  // Handle track order button click
  const handleTrackOrder = (customer: any) => {
    // Convert customer data to store format for OrderTracker
    const storeData: OrderStoreType = {
      id: customer.id.toString(),
      name: customer.name,
      items: customer.cartItems
    };
    setSelectedStore(storeData);
    setShowTracker(true);
  };

  // Handle back from tracker
  const handleBackFromTracker = () => {
    setShowTracker(false);
    setSelectedStore(null);
  };

  // Handle show full order detail (placeholder for now)
  const handleShowFullOrderDetail = (orderData: any) => {
    console.log('Show full order detail:', orderData);
    // This can be implemented later if needed
  };

  // Customer orders data with unique IDs and items
  const customers = [
    { 
      id: 1, 
      name: 'Adewale Fazaah', 
      items: '2 items', 
      amount: 'N9,999,990',
      cartItems: [
        {
          id: 1,
          name: 'Iphone 16 pro max - Black',
          price: 'N2,500,000',
          quantity: 1,
          image: '/iphone.svg'
        },
        {
          id: 2,
          name: 'Iphone 16 pro max - Black',
          price: 'N2,500,000',
          quantity: 1,
          image: '/iphone.svg'
        }
      ]
    },
    { 
      id: 2, 
      name: 'Adam Shawn', 
      items: '2 items', 
      amount: 'N9,999,990',
      cartItems: [
        {
          id: 3,
          name: 'Samsung Galaxy S24 - Blue',
          price: 'N1,800,000',
          quantity: 1,
          image: '/iphone.svg'
        },
        {
          id: 4,
          name: 'iPad Pro - Silver',
          price: 'N1,900,000',
          quantity: 1,
          image: '/iphone.svg'
        }
      ]
    },
    { 
      id: 3, 
      name: 'Chris Ade', 
      items: '2 items', 
      amount: 'N9,999,990',
      cartItems: [
        {
          id: 5,
          name: 'MacBook Pro - Space Gray',
          price: 'N3,500,000',
          quantity: 1,
          image: '/iphone.svg'
        },
        {
          id: 6,
          name: 'AirPods Pro',
          price: 'N450,000',
          quantity: 1,
          image: '/iphone.svg'
        }
      ]
    },
    { 
      id: 4, 
      name: 'Sasha Sloan', 
      items: '2 items', 
      amount: 'N9,999,990',
      cartItems: [
        {
          id: 7,
          name: 'iPhone 15 Pro - Gold',
          price: 'N2,200,000',
          quantity: 1,
          image: '/iphone.svg'
        },
        {
          id: 8,
          name: 'Apple Watch Series 9',
          price: 'N800,000',
          quantity: 1,
          image: '/iphone.svg'
        }
      ]
    },
    { 
      id: 5, 
      name: 'Ben Dios', 
      items: '2 items', 
      amount: 'N9,999,990',
      cartItems: [
        {
          id: 9,
          name: 'Google Pixel 8 Pro',
          price: 'N1,500,000',
          quantity: 1,
          image: '/iphone.svg'
        },
        {
          id: 10,
          name: 'Sony WH-1000XM5',
          price: 'N650,000',
          quantity: 1,
          image: '/iphone.svg'
        }
      ]
    },
    { 
      id: 6, 
      name: 'Ben Dios', 
      items: '2 items', 
      amount: 'N9,999,990',
      cartItems: [
        {
          id: 11,
          name: 'Nintendo Switch OLED',
          price: 'N750,000',
          quantity: 1,
          image: '/iphone.svg'
        },
        {
          id: 12,
          name: 'PS5 Controller',
          price: 'N120,000',
          quantity: 1,
          image: '/iphone.svg'
        }
      ]
    },
    { 
      id: 7, 
      name: 'Ben Dios', 
      items: '2 items', 
      amount: 'N9,999,990',
      cartItems: [
        {
          id: 13,
          name: 'Dell XPS 13',
          price: 'N2,800,000',
          quantity: 1,
          image: '/iphone.svg'
        },
        {
          id: 14,
          name: 'Logitech MX Master 3',
          price: 'N180,000',
          quantity: 1,
          image: '/iphone.svg'
        }
      ]
    },
    { 
      id: 8, 
      name: 'Ben Dios', 
      items: '2 items', 
      amount: 'N9,999,990',
      cartItems: [
        {
          id: 15,
          name: 'Canon EOS R5',
          price: 'N4,500,000',
          quantity: 1,
          image: '/iphone.svg'
        },
        {
          id: 16,
          name: 'DJI Air 3',
          price: 'N1,200,000',
          quantity: 1,
          image: '/iphone.svg'
        }
      ]
    },
    { 
      id: 9, 
      name: 'Ben Dios', 
      items: '2 items', 
      amount: 'N9,999,990',
      cartItems: [
        {
          id: 17,
          name: 'Tesla Model Y Accessories',
          price: 'N850,000',
          quantity: 1,
          image: '/iphone.svg'
        },
        {
          id: 18,
          name: 'Starlink Kit',
          price: 'N950,000',
          quantity: 1,
          image: '/iphone.svg'
        }
      ]
    }
  ];

  // Get selected customer and their cart items
  const selectedCustomer = customers[selectedOrderIndex];
  const cartItems = selectedCustomer.cartItems;

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Customer List */}
          <div className="lg:col-span-1">
            {/* Status Tabs */}
            <div className="flex space-x-1 mb-4">
              <button className="px-22 py-4 bg-primary text-white rounded-lg font-medium text-[8px]">
                New
              </button>
              <button className="px-19 py-4 bg-[#EDEDED] text-gray-600 rounded-lg font-medium text-[8px]">
                Completed
              </button>
            </div>

            {/* Customer Orders List */}
            <div className="space-y-3">
              {customers.map((customer, index) => (
                <div 
                  key={index} 
                  className={`rounded-2xl p-4 border w-[390px] cursor-pointer transition-all ${
                    selectedOrderIndex === index 
                      ? 'border-primary bg-white' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedOrderIndex(index)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#FEE2E2] p-3 rounded-full">
                      <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-black text-sm">{customer.name}</p>
                      <p className="text-gray-500 text-xs">{customer.items}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary text-sm">{customer.amount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Order Details or Order Tracker */}
          {showTracker && selectedStore ? (
            <OrderTracker 
              onBack={handleBackFromTracker}
              storeName={selectedStore.name}
              storeData={selectedStore}
              onShowFullOrderDetail={handleShowFullOrderDetail}
            />
          ) : (
            <div className="lg:col-span-2 ml-14">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-black">{selectedCustomer.name}'s Orders</h1>
              </div>

              {/* Status Tabs */}
              <div className="flex space-x-2 mb-6">
                <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm">
                  Order placed
                </button>
                <button className="px-4 py-2 bg-[#EDEDED] text-gray-600 rounded-lg font-medium text-sm">
                  Out for delivery
                </button>
                <button className="px-4 py-2 bg-[#EDEDED] text-gray-600 rounded-lg font-medium text-sm">
                  Delivered
                </button>
                <button className="px-4 py-2 bg-[#EDEDED] text-gray-600 rounded-lg font-medium text-sm">
                  Completed
                </button>
              </div>

              {/* Items in cart */}
              <div className="bg-primary rounded-t-2xl">
                <h2 className="text-white font-medium text-sm px-6 py-4">Items in cart</h2>
              </div>
              
              <div className="bg-white rounded-b-2xl border border-gray-200">
                <div className="p-6 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-black text-sm mb-1">{item.name}</h4>
                        <p className="text-primary font-bold text-sm mb-1">{item.price}</p>
                        <p className="text-primary text-xs">Qty: {item.quantity}</p>
                      </div>
                      <button 
                        onClick={() => handleTrackOrder(selectedCustomer)}
                        className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-red-600 transition-colors"
                      >
                        Track Order
                      </button>
                    </div>
                  ))}

                  {/* Open Chat Button */}
                  <div className="pt-4">
                    <button className="w-full py-3 bg-white border border-[#CACACA] rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors">
                      Open Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
