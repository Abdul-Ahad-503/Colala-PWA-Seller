import React, { useState } from 'react';

const ManageCoupons: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'coupons' | 'points'>('coupons');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPointsSettingsOpen, setIsPointsSettingsOpen] = useState(false);
  const [formData, setFormData] = useState({
    couponCodeName: '',
    percentageOff: '',
    maximumUsage: '',
    noOfUsagePerUser: '',
    expiryDate: ''
  });
  const [pointsSettings, setPointsSettings] = useState({
    pointsPerCompletedOrder: '',
    pointsPerReferral: '',
    completedOrderPointsEnabled: true,
    referralPointsEnabled: true
  });

  // Sample coupon data
  const coupons = [
    {
      id: 1,
      code: 'NEW123',
      dateCreated: '07-16-2024 14:44',
      minimumUsage: 25,
      maxUsage: 50
    },
    {
      id: 2,
      code: 'NEW123',
      dateCreated: '07-16-2024 14:44',
      minimumUsage: 25,
      maxUsage: 50
    },
    {
      id: 3,
      code: 'NEW123',
      dateCreated: '07-16-2024 14:44',
      minimumUsage: 25,
      maxUsage: 50
    }
  ];

  // Sample customer points data
  const customerPoints = [
    { id: 1, name: 'Adewale Faizan', points: 200, avatar: '/public/Sasha.svg' },
    { id: 2, name: 'Adewale Faizan', points: 200, avatar: '/public/vee.svg' },
    { id: 3, name: 'Liam Chen', points: 150, avatar: '/public/liam.svg' },
    { id: 4, name: 'Sophia Martinez', points: 220, avatar: '/public/sophia.svg' },
    { id: 5, name: 'Omar Patel', points: 180, avatar: '/public/omar.svg' },
    { id: 6, name: 'Isabella Johnson', points: 170, avatar: '/public/issabella.svg' },
    { id: 7, name: 'Mia Robinson', points: 210, avatar: '/public/mia.svg' },
    { id: 8, name: 'Noah Thompson', points: 190, avatar: '/public/noah.svg' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePointsSettingsChange = (field: string, value: string | boolean) => {
    setPointsSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Add logic to save the coupon
    console.log('Saving coupon:', formData);
    setIsCreateModalOpen(false);
    // Reset form
    setFormData({
      couponCodeName: '',
      percentageOff: '',
      maximumUsage: '',
      noOfUsagePerUser: '',
      expiryDate: ''
    });
  };

  const handlePointsSettingsSave = () => {
    // Add logic to save points settings
    console.log('Saving points settings:', pointsSettings);
    setIsPointsSettingsOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-[653px] shadow-sm h-[1054px]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#000000] mb-4">Manage Coupons</h1>
        
        {/* Tab Navigation */}
        <div className="flex gap-3 mb-2">
          <button
            onClick={() => setActiveTab('coupons')}
            className={`w-[300px] h-[40px] rounded-lg text-[8px] font-medium transition-colors ${
              activeTab === 'coupons'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            Manage Coupons
          </button>
          <button
            onClick={() => setActiveTab('points')}
            className={`w-[300px] h-[40px] rounded-lg text-[8px] font-medium transition-colors ${
              activeTab === 'points'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            Manage Points
          </button>
        </div>
      </div>

      {/* Coupons List */}
      {activeTab === 'coupons' && (
        <div className="space-y-4 ">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="border border-gray-200 w-[613px] h-[199px] shadow-lg rounded-2xl p-6">
              {/* Coupon Code - Centered at top */}
              <div className="text-center border border-[#00000080] rounded-lg mr-4 mb-2 -mt-4 w-[570px] h-[53px]">
                <h3 className="text-[20px] font-bold mt-2 text-black">{coupon.code}</h3>
              </div>

              {/* Coupon Details - Horizontal layout */}
              <div className="space-y-4 mb-4 mr-2 ">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#00000080] text-[12px]">Date Created</span>
                  <span className="text-black font-medium text-[12px]">07-16-25/05:33AM</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#00000080] text-[12px]">No of times used</span>
                  <span className="text-black font-medium text-[12px]">25</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#00000080] text-[12px]">Maximum Usage</span>
                  <span className="text-black font-medium text-[12px]">50</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <img src="/public/edit1.svg" alt="Edit" className="w-3 h-3" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                 <img src="/public/delete1.svg" alt="Delete" className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {/* Create New Button */}
          <div className="pt-4">
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full py-3 bg-primary text-white mt-8 rounded-xl font-medium hover:bg-red-600 transition-colors"
            >
              Create New
            </button>
          </div>
        </div>
      )}

      {/* Points Management */}
      {activeTab === 'points' && (
        <div className="space-y-4">
          {/* Unlimited Balance Section */}
          <div className="bg-gradient-to-r from-[#F90909] to-[#920C5F] w-[606px] h-[70px] rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] -mt-4 opacity-90 mb-1">Total balance point</p>
                <p className="text-[18px] mt-3 font-bold">5,000</p>
              </div>
              <button 
                onClick={() => setIsPointsSettingsOpen(true)}
                className="bg-white -mt-4 text-primary px-5 py-2 rounded-2xl text-[10px] font-medium hover:bg-opacity-30 transition-all"
              >
                settings
              </button>
            </div>
          </div>

          {/* Customers Points Header */}
          <div className="mt-6 mb-4">
            <h3 className="text-[14px] font-semibold text-black">Customers Points</h3>
          </div>

          {/* Customer Points List */}
          <div className="space-y-2">
            {customerPoints.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-4 bg-white h-[60px] border border-gray-100 rounded-xl hover:shadow-sm shadow-medium transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img 
                      src={customer.avatar} 
                      alt={customer.name}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        const imgElement = e.currentTarget;
                        const fallbackElement = imgElement.nextElementSibling as HTMLElement;
                        imgElement.style.display = 'none';
                        if (fallbackElement) {
                          fallbackElement.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold" style={{display: 'none'}}>
                      {customer.name.charAt(0)}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{customer.name}</span>
                </div>
                <span className="text-primary font-semibold text-sm">{customer.points}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create New Coupon Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#F9F9F9] rounded-2xl p-6 w-[430px]  h-[521px] shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-center pop_up relative p-6 pb-4 -mt-7 mb-1">
              <h2 className="text-[20px] font-semibold text-black">Create new code</h2>
              
            </div>
            <div>
<button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full  hover:bg-gray-100 transition-colors"
              >
               <img src="/public/Vector.svg" alt="Close" className="w-5 h-5 ml-180 -mt-30" />
              </button>
</div>

            {/* Form Fields */}
            <div className="space-y-4 mb-6">
              <div>
                <input
                  type="text"
                  placeholder="Coupon Code Name"
                  value={formData.couponCodeName}
                  onChange={(e) => handleInputChange('couponCodeName', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm bg-[#FFFFFF] -mt-3 placeholder-gray-400 h-[60px] focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Percentage off"
                  value={formData.percentageOff}
                  onChange={(e) => handleInputChange('percentageOff', e.target.value)}
                  className="w-full p-3 pr-10 border border-gray-200 bg-[#FFFFFF] rounded-xl text-sm placeholder-gray-400 h-[60px] focus:outline-none focus:border-primary transition-colors"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">%</span>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Maximum Usage"
                  value={formData.maximumUsage}
                  onChange={(e) => handleInputChange('maximumUsage', e.target.value)}
                  className="w-full p-3 border border-gray-200 bg-[#FFFFFF] rounded-xl text-sm placeholder-gray-400 h-[60px] focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="No of usage / User"
                  value={formData.noOfUsagePerUser}
                  onChange={(e) => handleInputChange('noOfUsagePerUser', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl bg-[#FFFFFF] text-sm placeholder-gray-400 h-[60px] focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Expiry date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  className="w-full p-3 pr-10 border border-gray-200 bg-[#FFFFFF] rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <img src="/public/CaretLeft.svg" alt="Calendar" className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full py-3 bg-primary text-white rounded-xl  font-medium hover:bg-red-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Points Settings Modal */}
      {isPointsSettingsOpen && (
        <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#F9F9F9] rounded-2xl p-6 w-[430px] h-[521px] shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-center pop_up relative p-6 pb-4 -mt-7 mb-1">
              <h2 className="text-[20px] font-semibold text-black">Points settings</h2>
              
            </div>

<button
                onClick={() => setIsPointsSettingsOpen(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
              <img src="/public/Vector.svg" alt="Close" className="w-5 h-5 ml-180 -mt-30" />
              </button>



            {/* Form Fields */}
            <div className="space-y-4 mb-6">
              <div>
                <input
                  type="text"
                  placeholder="Number of points/completed order"
                  value={pointsSettings.pointsPerCompletedOrder}
                  onChange={(e) => handlePointsSettingsChange('pointsPerCompletedOrder', e.target.value)}
                  className="w-full p-3 border border-[#CDCDCD] shadow-medium bg-[#FFFFFF] rounded-lg text-sm -mt-4 placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Number of points/referral"
                  value={pointsSettings.pointsPerReferral}
                  onChange={(e) => handlePointsSettingsChange('pointsPerReferral', e.target.value)}
                  className="w-full p-3 border border-[#CDCDCD] shadow-medium bg-[#FFFFFF] rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Toggle Switches */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-4 h-[60px] bg-[#FFFFFF] border border-[#CDCDCD] rounded-xl shadow-medium">
                  <span className="text-base text-[14px] font-medium text-black">Completed Order Points</span>
                  <button
                    onClick={() => handlePointsSettingsChange('completedOrderPointsEnabled', !pointsSettings.completedOrderPointsEnabled)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                      pointsSettings.completedOrderPointsEnabled ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        pointsSettings.completedOrderPointsEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 h-[60px] bg-[#FFFFFF] border border-[#CDCDCD] rounded-xl shadow-medium">
                  <span className="text-base text-[14px] font-medium text-black">Referral Points</span>
                  <button
                    onClick={() => handlePointsSettingsChange('referralPointsEnabled', !pointsSettings.referralPointsEnabled)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                      pointsSettings.referralPointsEnabled ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        pointsSettings.referralPointsEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handlePointsSettingsSave}
              className="w-full py-3 bg-primary text-[14px] mt-18 h-[60px] text-white rounded-2xl font-medium hover:bg-red-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
