import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import IMAGES from '../../constants';

const PromotedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');

  const promotedProducts = [
    {
      id: 1,
      name: 'Summer Floral Dress',
      image: IMAGES.top1,
      status: 'active',
      budget: '₦25,000',
      spent: '₦18,500',
      clicks: 1240,
      views: 8650,
      orders: 23,
      startDate: '2025-08-15',
      endDate: '2025-09-15'
    },
    {
      id: 2,
      name: 'Cotton Casual Shirt',
      image: IMAGES.top2,
      status: 'active',
      budget: '₦15,000',
      spent: '₦12,300',
      clicks: 890,
      views: 5420,
      orders: 15,
      startDate: '2025-08-20',
      endDate: '2025-09-20'
    },
    {
      id: 3,
      name: 'Designer Handbag',
      image: IMAGES.top3,
      status: 'paused',
      budget: '₦30,000',
      spent: '₦22,100',
      clicks: 1560,
      views: 9200,
      orders: 31,
      startDate: '2025-08-01',
      endDate: '2025-09-01'
    }
  ];

  const performanceData = [
    { day: 'Mon', clicks: 45, views: 320, orders: 3 },
    { day: 'Tue', clicks: 52, views: 380, orders: 5 },
    { day: 'Wed', clicks: 38, views: 290, orders: 2 },
    { day: 'Thu', clicks: 68, views: 450, orders: 7 },
    { day: 'Fri', clicks: 75, views: 520, orders: 8 },
    { day: 'Sat', clicks: 92, views: 680, orders: 12 },
    { day: 'Sun', clicks: 85, views: 610, orders: 10 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flex-1 p-8 bg-white rounded-[20px]">
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Promoted Products</h1>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Create New Campaign
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="text-sm font-medium opacity-90">Total Campaigns</h3>
            <p className="text-2xl font-bold">3</p>
            <span className="text-xs opacity-75">2 active, 1 paused</span>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <h3 className="text-sm font-medium opacity-90">Total Spent</h3>
            <p className="text-2xl font-bold">₦52,900</p>
            <span className="text-xs opacity-75">of ₦70,000 budget</span>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-sm font-medium opacity-90">Total Clicks</h3>
            <p className="text-2xl font-bold">3,690</p>
            <span className="text-xs opacity-75">+12% this week</span>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <h3 className="text-sm font-medium opacity-90">Total Orders</h3>
            <p className="text-2xl font-bold">69</p>
            <span className="text-xs opacity-75">1.87% conversion rate</span>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Weekly Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Bar dataKey="clicks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="orders" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Clicks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Orders</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'active'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Active Campaigns
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Campaigns
          </button>
        </div>

        {/* Campaigns List */}
        <div className="space-y-4">
          {promotedProducts
            .filter(product => activeTab === 'all' || product.status === 'active')
            .map((product) => (
            <div key={product.id} className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Budget</div>
                      <div className="font-medium">{product.budget}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Spent</div>
                      <div className="font-medium">{product.spent}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Views</div>
                      <div className="font-medium">{product.views.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Clicks</div>
                      <div className="font-medium">{product.clicks.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Orders</div>
                      <div className="font-medium">{product.orders}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">End Date</div>
                      <div className="font-medium">{product.endDate}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                    View Details
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                    {product.status === 'active' ? 'Pause' : 'Resume'}
                  </button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Budget Used</span>
                  <span>{((parseInt(product.spent.replace(/[^\d]/g, '')) / parseInt(product.budget.replace(/[^\d]/g, ''))) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(parseInt(product.spent.replace(/[^\d]/g, '')) / parseInt(product.budget.replace(/[^\d]/g, ''))) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {promotedProducts.filter(product => activeTab === 'all' || product.status === 'active').length === 0 && (
          <div className="text-center py-12">
            <img src={IMAGES.ChartLineUp} alt="No campaigns" className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600 mb-4">Create your first promotional campaign to boost your product visibility.</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Create Campaign
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotedProducts;
