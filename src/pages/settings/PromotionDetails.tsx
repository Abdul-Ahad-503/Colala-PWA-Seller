import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import IMAGES from '../../constants';

interface PromotionDetailsProps {}

const PromotionDetails: React.FC<PromotionDetailsProps> = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Mock data based on the product ID - in real app this would come from API
  const promotionData = {
    id: productId,
    name: 'Dell Inspiron Laptop',
    price: 'N2,000,000',
    originalPrice: 'N5,000,000',
    image: IMAGES.top1,
    isSponsored: true,
    serviceBadges: [
      { text: 'Free delivery', type: 'delivery' as const },
      { text: '25% Off in bulk', type: 'discount' as const }
    ],
    stats: {
      reach: 2000,
      impressions: 2000,
      costPerClick: 'N10',
      amountSpent: 'N5,000',
      dateCreated: '07/22/25 - 08:22 AM',
      endDate: '07/22/25 - 08:22 AM',
      daysRemaining: '7 Days',
      status: 'Active'
    }
  };

  const ServiceBadge: React.FC<{ text: string; type: 'delivery' | 'discount' }> = ({ text }) => {
    return (
      <div className="bg-[#FFA500] rounded-[2px] w-[60px] h-3 flex items-center text-white text-[6px] font-normal">
        <div className="rounded-l-[2px] bg-[url('/cut-bg.svg')] w-4 h-3 bg-no-repeat flex justify-center items-center m-0 p-0">
          <svg className="w-2 h-2 fill-white" viewBox="0 0 24 24">
            <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </div>
        <span className="text-[6px]">{text}</span>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-white rounded-[20px] min-h-screen p-6">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center text-base text-gray-600 mb-4">
          <button 
            onClick={() => navigate('/settings/promoted-products')}
            className="hover:text-gray-900 cursor-pointer transition-colors"
          >
            Promoted Product
          </button>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-semibold">Promotion details</span>
        </div>
      </div>

      {/* Product Card */}
      <div className="bg-white rounded-[20px] overflow-hidden border border-gray-200 shadow-sm mb-6">
        {/* Product Image */}
        <div className="relative bg-gray-100">
          <img
            src={promotionData.image}
            alt={promotionData.name}
            className="w-full h-72 object-cover"
          />
          
          {/* Sponsored Badge */}
          {promotionData.isSponsored && (
            <div className="absolute top-3 left-3 bg-[#000000CC] text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
              <img src={IMAGES.fire} alt="" className="w-3 h-3" />
              Sponsored
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="pt-2 px-[10px]">
          {/* Product Name */}
          <h2 className="text-[20px] font-medium text-black mb-1">{promotionData.name}</h2>
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-[10px]">
            <span className="text-[18px] font-bold text-primary">{promotionData.price}</span>
            {promotionData.originalPrice && (
              <span className="text-[8px] text-[#00000080] line-through">{promotionData.originalPrice}</span>
            )}
          </div>

          {/* Service Badges */}
          <div className="flex gap-2 mb-4">
            {promotionData.serviceBadges.map((badge, index) => (
              <ServiceBadge key={index} text={badge.text} type={badge.type} />
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Table */}
      <div className=" rounded-[20px] overflow-hidden">
        {/* Table Rows */}
        <div className="flex flex-col gap-[3px]">
          <div className="flex justify-between items-center px-5 py-4 bg-[#EDEDED] border-[0.5px] border-[#CACACA] rounded-[5px] ">
            <span className="text-[8px] text-[#0000080]">Reach</span>
            <span className="text-xs font-medium text-black">{promotionData.stats.reach.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center px-5 py-4 bg-[#EDEDED] border-[0.5px] border-[#CACACA] rounded-[5px] ">
            <span className="text-[8px] text-[#0000080]">Impressions</span>
            <span className="text-xs font-medium text-black">{promotionData.stats.impressions.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center px-5 py-4 bg-[#EDEDED] border-[0.5px] border-[#CACACA] rounded-[5px] ">
            <span className="text-[8px] text-[#0000080]">Cost/Click</span>
            <span className="text-xs font-medium text-black">{promotionData.stats.costPerClick}</span>
          </div>
          
          <div className="flex justify-between items-center px-5 py-4 bg-[#EDEDED] border-[0.5px] border-[#CACACA] rounded-[5px] ">
            <span className="text-[8px] text-[#0000080]">Amount Spent</span>
            <span className="text-xs font-medium text-black">{promotionData.stats.amountSpent}</span>
          </div>
          
          <div className="flex justify-between items-center px-5 py-4 bg-[#EDEDED] border-[0.5px] border-[#CACACA] rounded-[5px] ">
            <span className="text-[8px] text-[#0000080]">Date Created</span>
            <span className="text-xs font-medium text-black">{promotionData.stats.dateCreated}</span>
          </div>
          
          <div className="flex justify-between items-center px-5 py-4 bg-[#EDEDED] border-[0.5px] border-[#CACACA] rounded-[5px] ">
            <span className="text-[8px] text-[#0000080]">End Date</span>
            <span className="text-xs font-medium text-black">{promotionData.stats.endDate}</span>
          </div>
          
          <div className="flex justify-between items-center px-5 py-4 bg-[#EDEDED] border-[0.5px] border-[#CACACA] rounded-[5px] ">
            <span className="text-[8px] text-[#0000080]">Days Remaining</span>
            <span className="text-xs font-medium text-black">{promotionData.stats.daysRemaining}</span>
          </div>
          
          <div className="flex justify-between items-center px-4 py-3 bg-[#EDEDED] border-[0.5px] border-[#CACACA] rounded-[5px] ">
            <span className="text-[8px] text-[#0000080]">Status</span>
            <span className="text-xs font-medium text-green-600">{promotionData.stats.status}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button className="flex items-center justify-center p-3 cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <img src={IMAGES.PencilSimpleLine} alt="" className='w-3 h-3' />
        </button>
        
        <button className="flex items-center justify-center p-3 cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <img src={IMAGES.Prohibit} alt="" className='w-3 h-3' />
        </button>
        
        <button className="flex items-center justify-center p-3 cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <img src={IMAGES.Trash} alt="" className='w-3 h-3' />
        </button>
        
        <button className=" bg-primary text-white py-[10px] cursor-pointer px-[50px] rounded-[10px] text-[10px] font-medium hover:bg-red-600 transition-colors">
          Extend Promotion
        </button>
      </div>
    </div>
  );
};

export default PromotionDetails;
