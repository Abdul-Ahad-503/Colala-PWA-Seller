import React from 'react';
import IMAGES from '../../constants';

interface EditMenuPopupProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  isSold?: boolean;
  isOutOfStock?: boolean;
  onProductStat: () => void;
  onMarkAsSold: () => void;
  onBoostProduct: () => void;
  onMarkAsUnavailable: () => void;
  onMarkAsAvailable: () => void;
}

const EditMenuPopup: React.FC<EditMenuPopupProps> = ({
  isOpen,
  onClose,
  position,
  isSold = false,
  isOutOfStock = false,
  onProductStat,
  onMarkAsSold,
  onBoostProduct,
  onMarkAsUnavailable,
  onMarkAsAvailable
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div 
        className="fixed z-50 bg-white rounded-2xl shadow-lg border border-gray-200 py-2 min-w-[200px]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-100%, 0)'
        }}
      >
        <div className="flex flex-col">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onProductStat();
              onClose();
            }}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
          >
            <img src={IMAGES.chartBar} alt="Product Stat" width="24" height="24" className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Product Stat</span>
          </button>
          
          {/* Conditional Sold/Available Button */}
          {isSold ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsAvailable();
                onClose();
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <img src={IMAGES.UserCheck} alt="Mark as Available" width="24" height="24" className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Mark as Available</span>
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsSold();
                onClose();
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <img src={IMAGES.UserCheck} alt="Mark as Sold" width="20" height="20" className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Mark as Sold</span>
            </button>
          )}
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBoostProduct();
              onClose();
            }}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
          >
            <img src={IMAGES.ChartLineUp} alt="Boost Product" width="24" height="24" className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Boost Product</span>
          </button>
          
          {/* Conditional Unavailable/Available Button */}
          {isOutOfStock ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsAvailable();
                onClose();
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <img src={IMAGES.Cross} alt="Mark as Available" width="24" height="24" className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Mark as Available</span>
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsUnavailable();
                onClose();
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <img src={IMAGES.Cross} alt="Mark as unavailable" width="20" height="20" className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Mark as unavailable</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default EditMenuPopup;
