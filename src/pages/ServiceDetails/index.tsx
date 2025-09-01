import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IMAGES from '../../constants';

const ServiceDetails: React.FC = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [selectedThumbnail, setSelectedThumbnail] = useState<number>(0);

  // Sample service data
  const service = {
    id: serviceId || 's1',
    name: 'Sasha Fashion Designing',
    priceRange: 'N5,000 - N100,000',
    rating: 4.5,
    mainImage: IMAGES.top1,
    thumbnails: [
      IMAGES.top1,
      IMAGES.top2,
      IMAGES.top3
    ],
    description: 'We sew all kinds of dresses, we are your one stop shop for any form of dresses',
    priceBreakdown: [
      { category: 'General', price: 'N5,000 - N10,000' },
      { category: 'Male Wear', price: 'N5,000 - N10,000' },
      { category: 'Female wear', price: 'N5,000 - N10,000' },
      { category: 'Kids Wear', price: 'N5,000 - N10,000' },
      { category: 'Wedding Wears', price: 'N5,000 - N10,000' },
      { category: 'Tents', price: 'N5,000 - N10,000' }
    ]
  };

  const handleBack = () => {
    navigate('/my-products');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xl text-gray-600">
              <button onClick={handleBack} className="text-gray-600 hover:text-gray-800">
                My Service
              </button>
              <span>/</span>
              <span className="font-semibold text-black">Service Details</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-200 bg-white shadow-sm rounded-full">
                <img src={IMAGES.DotsThreeOutlineVertical} alt="More" width="24" height="24" />
              </button>
              <button className="p-2 hover:bg-gray-200 bg-white shadow-sm rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-6">
        <div className="flex gap-6">
          {/* Left Side - Thumbnail Images */}
          <div className="flex flex-col gap-3">
            {service.thumbnails.map((thumb, index) => (
              <div key={index} className="flex-shrink-0">
                <button
                  onClick={() => setSelectedThumbnail(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedThumbnail === index ? 'border-red-500' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={thumb} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Center - Main Image with Video Icon */}
          <div className="flex-1 max-w-[430px]">
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden">
              <img 
                src={service.thumbnails[selectedThumbnail]} 
                alt={service.name}
                className="w-[430px] h-[368px] object-cover"
              />
              {/* Video Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-black bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
              {/* Store Info Overlay */}
              <div className="absolute bottom-0 left-0 w-[430px] flex items-center justify-between gap-2 bg-[#000000B2] rounded-b-lg px-5 py-2">
                <div className="left flex items-center gap-2">
                    <img 
                  src={IMAGES.sasha} 
                  alt="Store" 
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-white text-sm font-medium">Sasha Stores</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <span className="text-white text-sm">{service.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Service Info */}
          <div className="flex-1 max-w-[540px]">
            <div className="space-y-3">
              {/* Service Name and Rating */}
              <div className="flex justify-between items-center border-b border-b-[#00000080]">
                <div className="left">
                    <h1 className="text-[20px] text-gray-900 mb-1">
                  {service.name}
                </h1>
                <div className="text-[18px] font-bold text-primary mb-2">
                  {service.priceRange}
                </div>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <span className="text-lg font-medium">{service.rating}</span>
                </div>
                
              </div>

              {/* Description */}
              <div className="border-b border-b-[#00000080] pb-4">
                <h3 className="text-xs  text-[#00000080] mb-2">Description</h3>
                <p className="text-black text-sm font-medium leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Price Breakdown */}
              <div>
                <h3 className="text-xs  text-[#00000080] mb-2">Price Breakdown</h3>
                <div className="space-y-[3px]">
                  {service.priceBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center text-xs justify-between py-3 px-4 bg-[#EDEDED] rounded border border-[#CACACA] first:rounded-t-[15px] last:rounded-b-[15px]">
                      <span className="text-gray-800 ">{item.category}</span>
                      <span className="text-primary font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors">
                  <img src={IMAGES.Trash} alt="Cart" width="30" height="30" />
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors">
                  <img src={IMAGES.chartBar} alt="Stats" width="30" height="30" />
                </button>
                <button className="flex-1 bg-primary text-white py-3 rounded-2xl text-xs hover:bg-red-600 transition-colors">
                  Edit Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
