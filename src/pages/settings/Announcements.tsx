import React, { useState } from 'react';

const Announcements: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'coupons' | 'points'>('coupons');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateBannerModalOpen, setIsCreateBannerModalOpen] = useState(false);
  const [isPointsSettingsOpen, setIsPointsSettingsOpen] = useState(false);
  const [formData, setFormData] = useState({
    announcement: '',
    couponCodeName: '',
    percentageOff: '',
    maximumUsage: '',
    noOfUsagePerUser: '',
    expiryDate: ''
  });
  const [bannerFormData, setBannerFormData] = useState({
    bannerImage: null as File | null,
    bannerLink: ''
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

  // Sample banner data
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: 'Sales Ongoing',
      dateCreated: '07-16-25/05:33AM',
      impressions: 25,
      link: 'https://www.colala.com/casshstores',
      image: '/public/Banner.svg'
    }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBannerInputChange = (field: string, value: string | File) => {
    setBannerFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleBannerInputChange('bannerImage', file);
    }
  };

  const handleSaveBanner = () => {
    if (bannerFormData.bannerImage && bannerFormData.bannerLink) {
      const newBanner = {
        id: banners.length + 1,
        title: 'Custom Banner',
        dateCreated: new Date().toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).replace(',', '/'),
        impressions: 0,
        link: bannerFormData.bannerLink,
        image: URL.createObjectURL(bannerFormData.bannerImage)
      };
      
      setBanners(prev => [...prev, newBanner]);
      setIsCreateBannerModalOpen(false);
      setBannerFormData({
        bannerImage: null,
        bannerLink: ''
      });
    }
  };

  const handleSave = () => {
    // Add logic to save the coupon
    console.log('Saving coupon:', formData);
    setIsCreateModalOpen(false);
    // Reset form
    setFormData({
      announcement: '',
      couponCodeName: '',
      percentageOff: '',
      maximumUsage: '',
      noOfUsagePerUser: '',
      expiryDate: ''
    });
  };

 

  return (
    <div className="bg-white rounded-2xl p-6 w-[653px] shadow-sm min-h-[800px] max-h-none overflow-visible">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#000000] mb-4">Manage Announcements</h1>
        
        {/* Tab Navigation */}
        <div className="flex gap-3 mb-2">
          <button
            onClick={() => setActiveTab('coupons')}
            className={`w-[300px] h-[40px] rounded-lg text-[8px] font-medium transition-colors ${
              activeTab === 'coupons'
                ? 'bg-[#E53E3E] text-white'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            Push Announcement
          </button>
          <button
            onClick={() => setActiveTab('points')}
            className={`w-[300px] h-[40px] rounded-lg text-[8px] font-medium transition-colors ${
              activeTab === 'points'
                ? 'bg-[#E53E3E] text-white'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            Banners
          </button>
        </div>
      </div>

      {/* Coupons List */}
      {activeTab === 'coupons' && (
        <div className="space-y-4 ">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="border border-gray-200 w-[613px] h-[179px] shadow-lg rounded-2xl p-6">
              {/* Coupon Code - Centered at top */}
              <div className="text-center border border-[#00000080] rounded-lg mr-4 mb-2 -mt-4 w-[570px] h-[53px]">
                <h3 className="text-[14px]  mt-2 text-black">Get 10% discount when you see the code NEW123 </h3>
              </div>

              {/* Coupon Details - Horizontal layout */}
              <div className="space-y-4 mb-4 mr-2 ">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#00000080] text-[12px]">Date Created</span>
                  <span className="text-black font-medium text-[12px]">07-16-25/05:33AM</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#00000080] text-[12px]">Impressions</span>
                  <span className="text-black font-medium text-[12px]">25</span>
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
              className="w-full py-3 bg-[#E53E3E] text-white text-[12px] rounded-xl font-sm hover:bg-red-600 transition-colors"
            >
              Create New
            </button>
          </div>
        </div>
      )}

      {/* Banners Section */}
      {activeTab === 'points' && (
        <div className="space-y-4 pb-6">
          {/* Banner Cards */}
          {banners.map((banner) => (
            <div key={banner.id} className="border border-gray-200 w-[613px] h-[298px] shadow-lg rounded-2xl p-6 bg-white">
              {/* Banner Image Section */}
              <div className="w-full h-[187px] -mt-7 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center">
                <img src={banner.image} alt="Banner" className=" w-full h-full " />
                

              </div>

              {/* Banner Details */}
              <div className="space-y-2">
                <div className="flex justify-between -mt-6 items-center mb-2">
                  <span className="text-[#00000080]  text-[12px]">Date Created</span>
                  <span className="text-black -font-medium text-[12px]">{banner.dateCreated}</span>
                </div>
                <div className="flex justify-between -mt-2 items-center mb-2">
                  <span className="text-[#00000080]  text-[12px]">Impressions</span>
                  <span className="text-black font-medium text-[12px]">{banner.impressions}</span>
                </div>
                <div className="flex justify-between -mt-2 items-center">
                  <span className="text-[#00000080]  text-[12px]">Link</span>
                  <span className="text-[#E53E3E]  text-[12px] break-all">{banner.link}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
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
              onClick={() => setIsCreateBannerModalOpen(true)}
              className="w-full py-3 h-[60px] mt-60 bg-[#E53E3E] text-white text-[12px] rounded-xl font-sm hover:bg-red-600 transition-colors"
            >
              Create New
            </button>
          </div>
        </div>
      )}

      {/* Create New announcement Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#F9F9F9] rounded-2xl p-6 w-[430px]  h-[383px] shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-center pop_up relative p-6 pb-4 -mt-7 mb-1">
              <h2 className="text-[20px] font-semibold text-black">New announcement</h2>
              
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
              <div className="relative">
                <textarea
                  placeholder="Type Announcement"
                  value={formData.announcement}
                  onChange={(e) => {
                    if (e.target.value.length <= 200) {
                      handleInputChange('announcement', e.target.value);
                    }
                  }}
                  className="w-full h-[193px] p-4 border border-gray-200 rounded-xl text-sm bg-[#FFFFFF] -mt-3 placeholder-gray-400 focus:outline-none focus:border-[#E53E3E] transition-colors resize-none"
                  maxLength={200}
                />
                <div className="absolute bottom-3 right-4 text-xs text-gray-400">
                  {formData.announcement.length}/200 Characters
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full py-3 bg-[#E53E3E] text-white rounded-xl  font-medium hover:bg-red-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Create Banner Modal -  */}
      {isCreateBannerModalOpen && (
        <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#F9F9F9] rounded-3xl p-8 w-[430px] min-h-[452px] max-h-[90vh] overflow-y-auto relative">
            {/* Header */}
             <div className="flex items-center justify-center pop_up relative p-6 pb-4 -mt-7 mb-1">
              <h2 className="text-[20px] font-semibold text-black">NewBanner</h2>
              <button 
                onClick={() => setIsCreateBannerModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full  flex items-center justify-center text-gray-500 hover:text-gray-700"
              >
                <img src="/public/Vector.svg" alt="Close" className="w-5 h-5 ml-12 -mt-4 " />
              </button>
            </div>

            <div className="space-y-6 flex-1">
              {/* Image Upload Area - Exact match to design */}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="rounded-xl p-12 text-center bg-[#FFFFFF] shadow-lg hover:bg-gray-100 transition-colors">
                  {bannerFormData.bannerImage ? (
                    <div className="space-y-3">
                      <img 
                        src={URL.createObjectURL(bannerFormData.bannerImage)} 
                        alt="Banner preview"
                        className="max-h-32 w-auto mx-auto rounded-lg object-cover"
                      />
                      <p className="text-sm text-gray-600 font-medium">{bannerFormData.bannerImage.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-12 h-12 mx-auto  rounded-lg flex items-center justify-center">
                       <img src="/public/Upload.svg" alt="Upload" className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-gray-500 -mt-4 text-sm font-medium">Upload new Banner</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Banner Link Input */}
              <div>
                <input
                  type="url"
                  value={bannerFormData.bannerLink}
                  onChange={(e) => handleBannerInputChange('bannerLink', e.target.value)}
                  placeholder="Banner Link"
                  className="w-full px-4 py-3 shadow-lg rounded-xl bg-[white] focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <button
                  onClick={handleSaveBanner}
                  disabled={!bannerFormData.bannerImage || !bannerFormData.bannerLink}
                  className="w-full py-3 bg-[#E53E3E] text-[14px] text-white rounded-xl font-medium hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default Announcements;
