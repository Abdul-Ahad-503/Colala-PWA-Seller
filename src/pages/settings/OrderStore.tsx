import React from 'react';

interface OrderItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface OrderStore {
  id: string;
  name: string;
  items: OrderItem[];
}

interface OrderStoreProps {
  activeStatus: string;
  setActiveStatus: (status: string) => void;
  currentOrderStores: OrderStore[];
  onTrackOrder: (store: OrderStore) => void;
}

const OrderStore: React.FC<OrderStoreProps> = ({ 
  activeStatus, 
  setActiveStatus, 
  currentOrderStores,
  onTrackOrder
}) => {
  return (
    <div className="lg:col-span-2">
      {/* Status Tabs moved below */}
      <div className="flex space-x-2 mb-0.5 -mt-9">
        <button 
          className={`px-3 py-3 rounded-lg font-medium text-[10px] ${
            activeStatus === 'Order Placed' 
              ? 'bg-[#E53E3E] text-white' 
              : 'bg-[#EDEDED] text-gray-600 hover:bg-gray-300'
          }`}
          onClick={() => setActiveStatus('Order Placed')}
        >
          Order Placed
        </button>
        <button 
          className={`px-3 py-3 rounded-lg font-medium text-[10px] ${
            activeStatus === 'Out for Delivery' 
              ? 'bg-[#E53E3E] text-white' 
              : 'bg-[#EDEDED] text-gray-600 hover:bg-gray-300'
          }`}
          onClick={() => setActiveStatus('Out for Delivery')}
        >
          Out for delivery
        </button>
        <button 
          className={`px-3 py-3 rounded-lg font-medium text-[10px] ${
            activeStatus === 'Delivered' 
              ? 'bg-[#E53E3E] text-white' 
              : 'bg-[#EDEDED] text-gray-600 hover:bg-gray-300'
          }`}
          onClick={() => setActiveStatus('Delivered')}
        >
          Delivered
        </button>
        <button 
          className={`px-3 py-3 rounded-lg font-medium text-[10px] ${
            activeStatus === 'Completed' 
              ? 'bg-[#E53E3E] text-white' 
              : 'bg-[#EDEDED] text-gray-600 hover:bg-gray-300'
          }`}
          onClick={() => setActiveStatus('Completed')}
        >
          Completed
        </button>
      </div>

      {/* Order Stores moved further below - REDUCED HEIGHT */}
      <div className="space-y-6 mt-10">
        {currentOrderStores.map((store) => (
          <div key={store.id} className="overflow-hidden">
            {/* Store Header - Reduced padding */}
            <div className="bg-[#E53E3E] text-white px-4 py-2 pb-4 flex items-center justify-between rounded-2xl">
              <span className="font-medium text-sm">{store.name}</span>
            </div>
            
            {/* Store Items Container - REDUCED HEIGHT */}
            <div className="ml-0.5 relative bg-white rounded-2xl  -mt-2">
              <div className="p-1 space-y-1">
                {store.items.map((item) => (
                  <div key={item.id} className="flex items-center mb-1 bg-[#F9F9F9] p-4 rounded-2xl space-x-2">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover border border-gray-200"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-black text-[12px] mb-1">{item.name}</h4>
                      <p className="text-[#E53E3E] font-bold text-[12px] mb-2">{item.price}</p>
                      <p className="text-[#E53E3E] text-xs font-medium">Qty: {item.quantity}</p>
                    </div>
                    <button 
                      onClick={() => onTrackOrder(store)}
                      className="bg-[#E53E3E] text-white px-4 py-2 rounded-2xl mt-10 font-sm text-xs hover:bg-red-600 transition-colors"
                    >
                      Track Order
                    </button>
                  </div>
                ))}

                {/* Open Chat Button */}
                <div className="mt-4">
                  <button className="w-full py-3 px-2 bg-white border border-[#CACACA] rounded-2xl text-gray-700 font-medium text-[12px] hover:bg-gray-100 transition-colors">
                    Open Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStore;
