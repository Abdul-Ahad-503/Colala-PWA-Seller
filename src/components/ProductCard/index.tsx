import React, { useState, useRef } from 'react';
import ServiceBadge from '../ServiceBadge';
import IMAGES from '../../constants';
import EditMenuPopup from './EditMenuPopup';

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  originalPrice?: string;
  isSponsored?: boolean;
  isOutOfStock?: boolean;
  isSold?: boolean;
  productViews: number;
  productClicks: number;
  messages: number;
  onEdit?: () => void;
  onMore?: () => void;
  onProductStat?: () => void;
  onMarkAsSold?: () => void;
  onBoostProduct?: () => void;
  onMarkAsUnavailable?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  originalPrice,
  isSponsored = false,
  isOutOfStock = false,
  isSold = false,
  productViews,
  productClicks,
  messages,
  onEdit,
  onMore,
  onProductStat = () => {},
  onMarkAsSold = () => {},
  onBoostProduct = () => {},
  onMarkAsUnavailable = () => {}
}) => {
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const editButtonRef = useRef<HTMLButtonElement>(null);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editButtonRef.current) {
      const rect = editButtonRef.current.getBoundingClientRect();
      setMenuPosition({
        x: rect.right,
        y: rect.top
      });
    }
    setIsEditMenuOpen(true);
  };
  return (
    <div className="bg-white rounded-[20px] max-w-47 overflow-hidden border border-gray-200 shadow-sm relative">
      {/* Product Image */}
      <div className="relative bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-47 h-35 object-cover"
        />
        
        {/* Sponsored Badge */}
        {isSponsored && (
          <div className="absolute top-3 left-3 bg-[#000000CC]  text-white px-1 py-0.5 rounded-[100px] text-[8px] flex items-center gap-1">
            <img src={IMAGES.fire} alt="" className='w-[10px] h-[10px]' />
            Sponsored
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-2 pt-1">
        {/* Product Name */}
        <h3 className="text-[10px] font-medium text-black mb-3 line-clamp-1">{name}</h3>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-primary">{price}</span>
          {originalPrice && (
            <span className="text-[8px] text-gray-400 line-through">{originalPrice}</span>
          )}
        </div>
        
        {/* Badges */}
        <div className="flex gap-2 mb-2 pb-2 border-b border-b-[#C0C0C0]">
          <ServiceBadge text="Free delivery" type="delivery" />
          <ServiceBadge text="20% Off in bulk" type="discount" />
        </div>

        {/* Stats */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-[8px] text-[#00000080]">
            <span>Product Views</span>
            <span className=" text-black">{productViews}</span>
          </div>
          <div className="flex justify-between items-center text-[8px] text-[#00000080]">
            <span>Product Clicks</span>
            <span className=" text-black">{productClicks}</span>
          </div>
          <div className="flex justify-between items-center text-[8px] text-[#00000080]">
            <span>Messages</span>
            <span className=" text-black">{messages}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button 
            onClick={onEdit}
            className="bg-[#FF000033] text-primary border border-primary px-[5px] py-[3px] rounded-[5px] text-[8px]  hover:bg-red-200 transition-colors"
          >
            Electronics
          </button>
          
          <div className="flex items-center gap-2">
            <button 
              ref={editButtonRef}
              onClick={handleEditClick}
              className="w-8 h-8 flex items-center justify-center text-gray-600 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg transition-colors"
            >
              <img 
                src={IMAGES.PencilSimpleLine} 
                alt="Edit" 
                width="24" 
                height="24" 
              />
            </button>
            <button 
              onClick={onMore}
              className="w-8 h-8 flex items-center justify-center text-gray-600 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg transition-colors"
            >
              <img 
                src={IMAGES.DotsThreeOutlineVertical} 
                alt="More options" 
                width="24" 
                height="24" 
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* Out of Stock/Sold Overlay - Covers entire card */}
      {(isOutOfStock || isSold) && (
        <div className="absolute inset-0 bg-[#000000CC] bg-opacity-60 flex items-center justify-center rounded-[20px]">
          <span className="text-white font-semibold text-lg">Out of Stock</span>
        </div>
      )}
      
      {/* Edit Menu Popup */}
      <EditMenuPopup
        isOpen={isEditMenuOpen}
        onClose={() => setIsEditMenuOpen(false)}
        position={menuPosition}
        onProductStat={onProductStat}
        onMarkAsSold={onMarkAsSold}
        onBoostProduct={onBoostProduct}
        onMarkAsUnavailable={onMarkAsUnavailable}
      />
    </div>
  );
};

export default ProductCard;
