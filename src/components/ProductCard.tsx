import React from 'react';
import IMAGES from '../constants';
import ServiceBadge from './ServiceBadge';

interface Product {
  id: number;
  name: string;
  image: string;
  store: string;
  salePrice: string;
  originalPrice: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  return (
    <div className="flex-shrink-0 max-w-[200px] bg-white rounded-[20px] shadow-md overflow-hidden">
      <img src={product.image} alt={product.name} className="w-50 h-29 object-cover" />
      
      {/* Store name and rating */}
      <div className="flex items-center justify-between  py-[2px] p-2 bg-[#F2F2F2] border border-gray-200">
        <div className="flex items-center space-x-2">
          <img src={IMAGES.sasha} alt="store" className="w-4 h-4 rounded-full" />
          <span className="text-red-500 text-[8px] font-medium">{product.store}</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <img src='/public/star.svg' alt="star" className="w-2 h-2" />
          <span className="text-[8px] text-gray-600">4.5</span>
        </div>
      </div>
      
      <div className="p-2">
        {/* Product name */}
        <h3 className="text-gray-900 font-medium text-base mb-1 text-[10px] leading-tight">{product.name}</h3>
        
        {/* Price */}
        <div className="flex items-center space-x-2 ">
          <span className="text-red-500 font-bold text-[12px]">{product.salePrice}</span>
          <span className="text-gray-400 line-through text-[8px]">{product.originalPrice}</span>
        </div>
        
        {/* Bottom Section - Services/Location and Cart */}
        <div className="flex items-end justify-between">
          {/* Left side - Service badges and Location */}
          <div className="flex-1">
            {/* Service badges */}
            <div className="flex  gap-1 mb-1">
              <ServiceBadge text="Free delivery" type="delivery" />
              <ServiceBadge text="20% Off in bulk" type="discount" />
            </div>
            
            {/* Location */}
            <div className="flex items-center space-x-1">
              <img src={IMAGES.mapPin} alt="location" className="w-4 h-4" />
              <span className="text-gray-500 text-[6px]">Lagos, Nigeria</span>
            </div>
          </div>
          
          {/* Right side - Cart Button */}
          <div>
            <button 
              onClick={handleAddToCart}
              className="bg-[#FFFFFF] border border-[#CDCDCD] p-2 rounded-2xl transition-colors hover:bg-gray-50"
            >
              <img src={IMAGES.shopping_Cart} alt="Add to cart" className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
