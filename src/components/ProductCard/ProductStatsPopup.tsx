import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import IMAGES from '../../constants';

interface ProductStatsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  productData: {
    views: number;
    inCart: number;
    completedOrders: number;
    impressions: number;
    profileClicks: number;
    chats: number;
    noClicks: number;
    chartData: Array<{
      month: string;
      impressions: number;
      visitors: number;
      orders: number;
    }>;
  };
}

const ProductStatsPopup: React.FC<ProductStatsPopupProps> = ({
  isOpen,
  onClose,
  productId,
  productName,
  productData
}) => {
  if (!isOpen) return null;

  // Chart data that matches the image exactly - more data points for scrolling
  const chartData = [
    { name: 'Jul', impressions: 70, visitors: 40, orders: 25 },
    { name: '2', impressions: 25, visitors: 40, orders: 25 },
    { name: '3', impressions: 25, visitors: 40, orders: 25 },
    { name: '4', impressions: 30, visitors: 15, orders: 8 },
    { name: '5', impressions: 70, visitors: 40, orders: 25 },
    { name: '6', impressions: 70, visitors: 40, orders: 25 },
    { name: '7', impressions: 65, visitors: 35, orders: 20 },
    { name: '8', impressions: 55, visitors: 45, orders: 30 },
    { name: '9', impressions: 40, visitors: 25, orders: 15 },
    { name: '10', impressions: 75, visitors: 50, orders: 35 },
  ];

  // Stats dataset for mapping
  const statsData = [
    { key: 'views', label: 'Views', value: productData.views },
    { key: 'inCart', label: 'In Cart', value: productData.inCart },
    { key: 'completedOrders', label: 'Completed Order', value: productData.completedOrders },
    { key: 'impressions', label: 'Impressions', value: productData.impressions },
    { key: 'profileClicks', label: 'Profile Clicks', value: productData.profileClicks },
    { key: 'chats', label: 'Chats', value: productData.chats },
    { key: 'noClicks', label: 'No Clicks', value: productData.noClicks },
  ];

  // Custom legend component
  const CustomLegend = () => (
    <div className="absolute top-4 left-4 bg-white border border-gray-200 rounded-lg p-3 shadow-sm z-10">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#FFA500] rounded-sm"></div>
          <span className="text-xs text-gray-700">Impressions</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#32CD32] rounded-sm"></div>
          <span className="text-xs text-gray-700">Visitors</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#FF4444] rounded-sm"></div>
          <span className="text-xs text-gray-700">Orders</span>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-2 pt-1 border-t border-gray-200">
        Jul 30, 2025
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-[430px] h-auto flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="flex pop_up justify-center p-6 px-0 border-b border-gray-100">
          <div className=''>
            <h2 className="text-2xl font-bold text-black">Product Statistics</h2>
            <p className="text-sm text-center text-gray-600 mt-1">{productName}</p>
          </div>
          <button 
            onClick={onClose}
             className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors absolute top-4 right-4"
          >
            <img src={IMAGES.Xcircle} alt="Close" width="24" height="24" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Chart Section */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 relative">
            {/* Custom Legend */}
            <CustomLegend />

            {/* Scrollable Chart Container */}
            <div className="pt-12 pb-4 overflow-x-auto">
              <div className="min-w-[600px]">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 20, left: 30, bottom: 5 }}
                    barCategoryGap="15%"
                  >
                    <CartesianGrid 
                      strokeDasharray="none" 
                      stroke="#d1d5db" 
                      strokeOpacity={0.3}
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#6b7280' }}
                      dy={8}
                      interval={0}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      ticks={[1, 50, 100]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#6b7280' }}
                      dx={-5}
                      width={25}
                    />
                    <Bar 
                      dataKey="impressions" 
                      fill="#FFA500" 
                      radius={[3, 3, 0, 0]}
                      barSize={14}
                    />
                    <Bar 
                      dataKey="visitors" 
                      fill="#32CD32" 
                      radius={[3, 3, 0, 0]}
                      barSize={14}
                    />
                    <Bar 
                      dataKey="orders" 
                      fill="#FF4444" 
                      radius={[3, 3, 0, 0]}
                      barSize={14}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Horizontal Scroll Indicator */}
              <div className="flex justify-center mt-2">
                <div className="w-12 h-1 bg-gray-300 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            {statsData.map((stat, index) => (
              <div 
                key={stat.key} 
                className={`bg-white border border-gray-200 rounded-[15px] p-1 py-2 w-[122px] h-[58px] flex relative ${
                  index === 6 ? 'col-start-2' : '' // Center the last item (No Clicks)
                }`}
              >
                <div className="w-1 h-5 bg-red-500 rounded-sm absolute left-0.5 inset-y-[19px]"></div>
                <div className="flex-1 flex  justify-between pl-4 ">
                  <div>
                    <div className="text-[10px] font-semibold">{stat.label}</div>
                    <div className="text-[10px] ">{stat.value}</div>
                  </div>
                  <img src={IMAGES.chartBar} alt="Chart" width="16" height="16" className="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductStatsPopup;
