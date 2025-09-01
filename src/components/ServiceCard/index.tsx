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
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  name,
  priceRange,
  serviceViews,
  productClicks,
  messages,
  isSponsored = false,
  isOutOfStock = false
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      {/* Service Image */}
      <div className="relative">
        <img 
          src={image || IMAGES.top1}
          alt={name} 
          className="w-full h-48 object-cover"
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
            <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
              Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Service Info */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
          {name}
        </h3>
        
        <div className="mb-3">
          <span className="text-red-500 font-bold text-sm">
            {priceRange}
          </span>
        </div>

        {/* Service Stats */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Service Views</span>
            <span className="font-medium">{serviceViews}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Product Clicks</span>
            <span className="font-medium">{productClicks}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Messages</span>
            <span className="font-medium">{messages}</span>
          </div>
        </div>

        {/* Details Button */}
        <button className="w-full bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
          Details
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
