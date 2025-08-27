import React from 'react';
import IMAGES from '../../constants';

interface EditMenuPopupProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  onProductStat: () => void;
  onMarkAsSold: () => void;
  onBoostProduct: () => void;
  onMarkAsUnavailable: () => void;
}

const EditMenuPopup: React.FC<EditMenuPopupProps> = ({
  isOpen,
  onClose,
  position,
  onProductStat,
  onMarkAsSold,
  onBoostProduct,
  onMarkAsUnavailable
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
            onClick={() => {
              onProductStat();
              onClose();
            }}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
          >
            <img src={IMAGES.chartBar} alt="Product Stat" width="20" height="20" className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Product Stat</span>
          </button>
          
          <button
            onClick={() => {
              onMarkAsSold();
              onClose();
            }}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
          >
            <img src={IMAGES.sealCheck} alt="Mark as Sold" width="20" height="20" className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Mark as Sold</span>
          </button>
          
          <button
            onClick={() => {
              onBoostProduct();
              onClose();
            }}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
          >
            <img src={IMAGES.megaphone} alt="Boost Product" width="20" height="20" className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Boost Product</span>
          </button>
          
          <button
            onClick={() => {
              onMarkAsUnavailable();
              onClose();
            }}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
          >
            <img src={IMAGES.Xcircle} alt="Mark as unavailable" width="20" height="20" className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Mark as unavailable</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default EditMenuPopup;
