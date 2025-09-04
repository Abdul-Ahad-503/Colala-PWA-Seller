import React from 'react';
import IMAGES from '../../constants';

interface ServiceCardProps {
  id: string;
  image: string;
  name: string;
  priceRange: string;
  serviceViews: number;
  productClicks: number;
  messages: number;
  isSponsored?: boolean;
  isOutOfStock?: boolean;
  onEdit?: () => void;
  onMore?: () => void;
  onDetails?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  name,
  priceRange,
  serviceViews,
  productClicks,
  messages,
  isSponsored = false,
  isOutOfStock = false,
  onDetails
}) => {
  return (
    <div className="bg-white max-w-[190px] rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      {/* Service Image */}
      <div className="relative">
        <img 
          src={image || IMAGES.top1}
          alt={name} 
          className="w-full h-35 object-cover"
        />
        {isSponsored && (
          <div className="absolute top-2 left-2">
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
              Sponsored
            </span>
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-primary text-white px-3 py-1 rounded text-sm font-medium">
              Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Service Info */}
      <div className="p-[10px] pt-1">
        <h3 className="text-[10px] font-medium text-gray-900  line-clamp-2">
          {name}
        </h3>
        
        <div className="mb-2">
          <span className="text-primary font-bold text-xs ">
            {priceRange}
          </span>
        </div>

        {/* Service Stats */}
        <div className="space-y-[7px] mb-4 border-t border-[#C0C0C0] pt-2">
          <div className="flex justify-between text-[8px] text-[#00000080]">
            <span>Service Views</span>
            <span className="font-medium text-[#000000]">{serviceViews}</span>
          </div>
          <div className="flex justify-between text-[8px] text-[#00000080]">
            <span>Product Clicks</span>
            <span className="font-medium text-[#000000]">{productClicks}</span>
          </div>
          <div className="flex justify-between text-[8px] text-[#00000080]">
            <span>Messages</span>
            <span className="font-medium text-[#000000]">{messages}</span>
          </div>
        </div>

        {/* Details Button */}
        <button 
          onClick={onDetails}
          className="w-full bg-primary text-white py-2 rounded-lg text-[8px]  hover:bg-red-600 transition-colors"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
