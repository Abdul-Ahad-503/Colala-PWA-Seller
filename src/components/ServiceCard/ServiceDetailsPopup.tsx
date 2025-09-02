import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import IMAGES from '../../constants';

interface ServiceDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  serviceName: string;
  serviceData: {
    image: string;
    name: string;
    priceRange: string;
    orderId: string;
    dateCreated: string;
    views: number;
    phoneViews: number;
    chats: number;
    chartData: Array<{
      month: string;
      impressions: number;
      visitors: number;
      orders: number;
    }>;
  };
}

const ServiceDetailsPopup: React.FC<ServiceDetailsPopupProps> = ({
  isOpen,
  onClose,
  serviceId,
  serviceData
}) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  const handleViewService = () => {
    onClose();
    navigate(`/service-details/${serviceId}`);
  };

  // Chart data that matches the image exactly
  const chartData = [
    { name: '1', impressions: 70, visitors: 40, orders: 25 },
    { name: '2', impressions: 25, visitors: 40, orders: 25 },
    { name: '3', impressions: 25, visitors: 40, orders: 25 },
    { name: '4', impressions: 30, visitors: 15, orders: 8 },
    { name: '5', impressions: 70, visitors: 40, orders: 25 },
    { name: '6', impressions: 70, visitors: 40, orders: 25 },
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
    </div>
  );

  return (
    <div className="fixed inset-0  backdrop-brightness-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-[430px] max-h-[90vh] flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="flex justify-center p-6 px-0 border-b border-gray-100">
          <div className="pop_up">
            <h2 className="text-xl font-bold text-black text-center">Service details</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors absolute top-4 right-4"
          >
            <img src={IMAGES.Xcircle} alt="Close" width="24" height="24" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto hide-scrollbar flex-1">
          {/* Service Info Section */}
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={serviceData.image || IMAGES.top1}
              alt={serviceData.name} 
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                {serviceData.name}
              </h3>
              <div className="text-red-500 font-bold text-sm mb-1">
                {serviceData.priceRange}
              </div>
              <div className="text-xs text-gray-500">
                ID: {serviceData.orderId || "01-16-26"}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button className="flex-1 bg-red-500 text-white py-3 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
              Edit Service
            </button>
            <button className="flex-1 bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors" onClick={handleViewService}>
              View Service
            </button>
          </div>

          {/* Chart Section */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 relative">
            {/* Custom Legend */}
            <CustomLegend />

            {/* Chart Container */}
            <div className="pt-12 pb-4">
              <div className="min-w-[300px]">
                <ResponsiveContainer width="100%" height={200}>
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
            </div>
          </div>

          {/* Service Statistics Section */}
          <div className="bg-red-500 rounded-t-xl  px-3 py-2 mb-0">
            <h3 className="text-white font-medium text-sm">Service Statistics</h3>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-b-xl px-4 space-y-3 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-[#00000080]">Order ID</span>
              <span className="text-sm font-medium text-left text-gray-900">{serviceData.orderId || "ORD-12345FFKSK"}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-[#00000080]">Date Created</span>
              <span className="text-sm font-medium text-left text-gray-900">{serviceData.dateCreated || "July 19, 2025 - 07:22AM"}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-[#00000080]">Views</span>
              <span className="text-sm font-medium text-left text-gray-900">{serviceData.views || "2000"}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-[#00000080]">Phone Views</span>
              <span className="text-sm font-medium text-left text-gray-900">{serviceData.phoneViews || "15"}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-[#00000080]">Chats</span>
              <span className="text-sm font-medium text-left text-gray-900">{serviceData.chats || "5"}</span>
            </div>
          </div>

          {/* Mark as Unavailable Button */}
          <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
            Mark as Unavailable
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPopup;
