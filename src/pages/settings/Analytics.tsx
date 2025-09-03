import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import IMAGES from '../../constants';

const Analytics: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('Date');

  // Chart data that matches the image exactly
  const chartData = [
    { name: '1\nJul', impressions: 70, visitors: 40, orders: 25 },
    { name: '2', impressions: 25, visitors: 40, orders: 25 },
    { name: '3', impressions: 25, visitors: 40, orders: 25 },
    { name: '4', impressions: 30, visitors: 15, orders: 8 },
    { name: '5', impressions: 65, visitors: 35, orders: 25 },
    { name: '6', impressions: 65, visitors: 35, orders: 25 },
    { name: '7', impressions: 65, visitors: 35, orders: 25 },
    { name: '8', impressions: 65, visitors: 35, orders: 25 },
    { name: '9', impressions: 65, visitors: 35, orders: 25 },
    { name: '10', impressions: 70, visitors: 40, orders: 25 },
  ];

  // Sales & Orders data - matching image exactly
  const salesData = [
    { label: 'Total Sales', value: '200' },
    { label: 'No of Orders', value: '200' },
    { label: 'Fulfillment rate', value: '15%' },
    { label: 'Refunded orders', value: '200' },
    { label: 'Refunded orders', value: '200' },
    { label: 'Repeat purchase rate', value: '10%' }
  ];

  // Customer Insights data - matching image exactly (7 items)
  const customerData = [
    { label: 'New Customers', value: '200' },
    { label: 'Returning Customers', value: '10%' },
    { label: 'Customer Reviews', value: '10%' },
    { label: 'Product Reviews', value: '200' },
    { label: 'Product Reviews', value: '200' },
    { label: 'Store Reviews', value: '10%' },
    { label: 'Av Product Rating', value: '10%' },
    { label: 'Av Store Rating', value: '200' }
  ];

  // Product Performance data - matching image exactly
  const productData = [
    { label: 'Total Impression', value: '200' },
    { label: 'Total Clicks', value: '10%' },
    { label: 'Orders Placed', value: '10%' }
  ];

  // Financial Metrics data - matching image exactly
  const financialData = [
    { label: 'Total Revenue', value: '200' },
    { label: 'Loss from promo', value: '10%' },
    { label: 'Profit Margin', value: '10%' }
  ];

  // Custom legend component matching the image
  const CustomLegend = () => (
    <div className="absolute top-4 left-4 ml-26 mt-8 bg-[#EDEDED] border border-gray-200 rounded-lg p-3 shadow-sm z-10 w-[95px] h-[83px]">
      <div className="space-y-1.5">
        <div className="flex items-center  gap-2">
          <div className="w-4 h-3 bg-[#FFA500] rounded-sm"></div>
          <span className="text-[8px] text-gray-700 font-medium">Impressions</span>
       
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 bg-[#32CD32] rounded-sm"></div>
          <span className="text-[8px] text-gray-700 font-medium">Visitors</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 bg-[#FF4444] rounded-sm"></div>
          <span className="text-[8px] text-gray-700 font-medium">Orders</span>
        </div>
      </div>
      <div className="text-[4px] text-gray-500  pt-1 -mt-[0.5] font-normal">
        July 30, 2025
      </div>
    </div>
  );

  // Custom Sales & Orders section
  const SalesOrdersSection = () => (
    <div className="mb-4">
      <h3 className="text-[14px] font-semibold text-black mb-4">Sales & Orders</h3>
      
      {/* First row - 4 cards */}
      <div className="grid grid-cols-4 gap-3 mb-3">
        {salesData.slice(0, 4).map((item, index) => (
          <div 
            key={index}
            className="bg-white border border-gray-200 rounded-[15px] p-1 py-2 w-[122px] h-[58px] flex relative"
          >
            <div className="w-1 h-5 bg-red-500 rounded-sm absolute left-0.5 inset-y-[19px]"></div>
            <div className="flex-1 flex justify-between pl-4">
              <div>
                <div className="text-[10px] font-semibold">{item.label}</div>
                <div className="text-[10px]">{item.value}</div>
              </div>
              <img src={IMAGES.chartBar} alt="Chart" width="16" height="16" className="" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Second row - 2 cards */}
      <div className="grid grid-cols-4 gap-3 mb-3">
        {salesData.slice(4, 6).map((item, index) => (
          <div 
            key={index + 4}
            className="bg-white border border-gray-200 rounded-[15px] p-1 py-2 w-[122px] h-[58px] flex relative"
          >
            <div className="w-1 h-5 bg-red-500 rounded-sm absolute left-0.5 inset-y-[19px]"></div>
            <div className="flex-1 flex justify-between pl-4">
              <div>
                <div className="text-[10px] font-semibold">{item.label}</div>
                <div className="text-[10px]">{item.value}</div>
              </div>
              <img src={IMAGES.chartBar} alt="Chart" width="16" height="16" className="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Custom Customer Insights section to match the image layout
  const CustomerInsightsSection = () => (
    <div className="mb-4">
      <h3 className="text-[14px] font-semibold text-black mb-4">Customer Insights</h3>
      
      {/* First row - 4 cards */}
      <div className="grid grid-cols-4 gap-3 mb-3">
        {customerData.slice(0, 4).map((item, index) => (
          <div 
            key={index}
            className="bg-white border border-gray-200 rounded-[15px] p-1 py-2 w-[122px] h-[58px] flex relative"
          >
            <div className="w-1 h-5 bg-[#008000] rounded-sm absolute left-0.5 inset-y-[19px]"></div>
            <div className="flex-1 flex justify-between pl-4">
              <div>
                <div className="text-[10px] font-semibold">{item.label}</div>
                <div className="text-[10px]">{item.value}</div>
              </div>
              <img src={IMAGES.chartBar} alt="Chart" width="16" height="16" className="" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Second row - 3 cards */}
      <div className="grid grid-cols-4 gap-3 mb-3">
        {customerData.slice(4, 7).map((item, index) => (
          <div 
            key={index + 4}
            className="bg-white border border-gray-200 rounded-[15px] p-1 py-2 w-[122px] h-[58px] flex relative"
          >
            <div className="w-1 h-5 bg-[#008000] rounded-sm absolute left-0.5 inset-y-[19px]"></div>
            <div className="flex-1 flex justify-between pl-4">
              <div>
                <div className="text-[10px] font-semibold">{item.label}</div>
                <div className="text-[10px]">{item.value}</div>
              </div>
              <img src={IMAGES.chartBar} alt="Chart" width="16" height="16" className="" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Third row - 1 card */}
      <div className="grid grid-cols-1 gap-3">
        {customerData.slice(7, 8).map((item, index) => (
          <div 
            key={index + 7}
            className="bg-white border border-gray-200 rounded-[15px] p-1 py-2 w-[122px] h-[58px] flex relative"
          >
            <div className="w-1 h-5 bg-[#008000] rounded-sm absolute left-0.5 inset-y-[19px]"></div>
            <div className="flex-1 flex justify-between pl-4">
              <div>
                <div className="text-[10px] font-semibold">{item.label}</div>
                <div className="text-[10px]">{item.value}</div>
              </div>
              <img src={IMAGES.chartBar} alt="Chart" width="16" height="16" className="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Custom Product Performance section
  const ProductPerformanceSection = () => (
    <div className="mb-4">
      <h3 className="text-[14px] font-semibold text-black mb-4">Product Performance</h3>
      
      {/* Single row - 3 cards */}
      <div className="grid grid-cols-4 gap-3">
        {productData.map((item, index) => (
          <div 
            key={index}
            className="bg-white border border-gray-200 rounded-[15px] p-1 py-2 w-[122px] h-[58px] flex relative"
          >
            <div className="w-1 h-5 bg-[#800080] rounded-sm absolute left-0.5 inset-y-[19px]"></div>
            <div className="flex-1 flex justify-between pl-4">
              <div>
                <div className="text-[10px] font-semibold">{item.label}</div>
                <div className="text-[10px]">{item.value}</div>
              </div>
              <img src={IMAGES.chartBar} alt="Chart" width="16" height="16" className="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Custom Financial Metrics section
  const FinancialMetricsSection = () => (
    <div className="mb-4">
      <h3 className="text-[14px] font-semibold text-black mb-4">Financial Metrics</h3>
      
      {/* Single row - 3 cards */}
      <div className="grid grid-cols-4 gap-3">
        {financialData.map((item, index) => (
          <div 
            key={index}
            className="bg-white border border-gray-200 rounded-[15px] p-1 py-2 w-[122px] h-[58px] flex relative"
          >
            <div className="w-1 h-5 bg-[#0000FF] rounded-sm absolute left-0.5 inset-y-[19px]"></div>
            <div className="flex-1 flex justify-between pl-4">
              <div>
                <div className="text-[10px] font-semibold">{item.label}</div>
                <div className="text-[10px]">{item.value}</div>
              </div>
              <img src={IMAGES.chartBar} alt="Chart" width="16" height="16" className="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-6 w-[653px] shadow-sm h-[1054px] overflow-y-auto scrollbar-transparent">
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-transparent {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* Internet Explorer 10+ */
          }
          .scrollbar-transparent::-webkit-scrollbar {
            width: 0;
            height: 0;
            background: transparent; /* Chrome/Safari/Webkit */
          }
          .scrollbar-transparent::-webkit-scrollbar-track {
            background: transparent;
          }
          .scrollbar-transparent::-webkit-scrollbar-thumb {
            background: transparent;
          }
        `
      }} />
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-black mb-4">Analytics</h1>
        
        {/* Date Dropdown */}
        <div className="relative w-[320px] h-[56px]">
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="  bg-[#E8E8E8] w-[105px] text-[10px] h-full border-none rounded-2xl px-6 py-4 text-lg font-normal text-[#333333] appearance-none cursor-pointer focus:outline-none  focus:ring-opacity-50"
          >
            <option value="Date" disabled>Date</option>
            <option value="January 2025">January 2025</option>
            <option value="February 2025">February 2025</option>
            <option value="March 2025">March 2025</option>
            <option value="April 2025">April 2025</option>
            <option value="May 2025">May 2025</option>
            <option value="June 2025">June 2025</option>
            <option value="July 2025">July 2025</option>
            <option value="August 2025">August 2025</option>
            <option value="September 2025">September 2025</option>
            <option value="October 2025">October 2025</option>
            <option value="November 2025">November 2025</option>
            <option value="December 2025">December 2025</option>
          </select>
          {/* Custom Dropdown Arrow */}
          <div className="absolute inset-y-0 right-6 mr-50 flex items-center pointer-events-none">
            <svg width="10" height="10" viewBox="0 0 18 12" fill="none" className="text-[#333333]">
              <path d="M3 3L9 9L15 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Main Chart - Matching the image design */}
      <div className="bg-white rounded-2xl p-6 mb-8 w-[611px] h-[324px] -mt-2 relative border border-gray-100 shadow-lg">
        {/* Custom Legend */}
        <CustomLegend />

        {/* Chart Container */}
        <div className="pt-4 pb-4 overflow-x-auto scrollbar-transparent">
          <div className="min-w-[700px] h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 60, right: 40, left: 40, bottom: 40 }}
                barCategoryGap="25%"
                barGap={4}
              >
              
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }}
                  dy={10}
                  interval={0}
                />
                <YAxis 
                  domain={[0, 100]}
                  ticks={[0, 50, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }}
                  dx={-10}
                  width={35}
                />
                <Bar 
                  dataKey="impressions" 
                  fill="#F59E0B" 
                  radius={[8, 8, 8, 8]}
                  barSize={16}
                />
                <Bar 
                  dataKey="visitors" 
                  fill="#10B981" 
                  radius={[8, 8, 8, 8]}
                  barSize={16}
                />
                <Bar 
                  dataKey="orders" 
                  fill="#EF4444" 
                  radius={[8, 8, 8, 8]}
                  barSize={16}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        
        </div>
      </div>

      {/* Full Detailed Analytics Header Section */}
      <div className="mb-8 mt-8">
        <h1 className="text-18px mr-60 font-semibold text-[#E53E3E] text-center mb-6">Full Detailed Analytics</h1>
        
        {/* Date Dropdown for Stats Section */}
        <div className="relative w-[105px] h-[56px] mb-6">
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-[#E8E8E8] w-full h-full text-[10px] border-none rounded-2xl px-4 py-4 text-base font-normal text-[#333333] appearance-none cursor-pointer focus:outline-none"
          >
            <option value="Date" disabled>Date</option>
            <option value="January 2025">January 2025</option>
            <option value="February 2025">February 2025</option>
            <option value="March 2025">March 2025</option>
            <option value="April 2025">April 2025</option>
            <option value="May 2025">May 2025</option>
            <option value="June 2025">June 2025</option>
            <option value="July 2025">July 2025</option>
            <option value="August 2025">August 2025</option>
            <option value="September 2025">September 2025</option>
            <option value="October 2025">October 2025</option>
            <option value="November 2025">November 2025</option>
            <option value="December 2025">December 2025</option>
          </select>
          {/* Custom Dropdown Arrow */}
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <svg width="10" height="10" viewBox="0 0 18 12" fill="none" className="text-[#333333]">
              <path d="M3 3L9 9L15 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Sections */}
      <div className="space-y-6">
        <SalesOrdersSection />
        <CustomerInsightsSection />
        <ProductPerformanceSection />
        <FinancialMetricsSection />
      </div>
    </div>
  );
};

export default Analytics;
