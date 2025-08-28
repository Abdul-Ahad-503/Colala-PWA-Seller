import React, { useState } from 'react';

interface SelectCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (selectedCategories: string[]) => void;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({ isOpen, onClose, onApply }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Electronics', 'Phones']);

  const categories = [
    'Electronics',
    'Phones',
    'Category 2',
    'Category 2',
    'Category 2',
    'Category 2',
    'Category 2',
    'Category 2',
    'Category 2',
    'Category 2'
  ];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(item => item !== category);
      } else if (prev.length < 5) {
        return [...prev, category];
      }
      return prev;
    });
  };

  const handleApply = () => {
    onApply(selectedCategories);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-[400px] h-[720px] shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-center    pop_up  p-3 pb-4">
          <h2 className="text-[22px] font-bold   text-black flex-1 text-center">Select Categories</h2>
          
          
          
          <button
            onClick={onClose}
            className="w-6 h-6  flex items-center justify-center text-gray-500 hover:text-gray-700 ml-4"
          >
          <img src="/public/Vector.svg" alt="Close"  className="w-5 h-5   -mt-1" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Maximum selection note */}
          <p className="text-[12px] text-gray-600 -mt-2 mb-4">You can select a maximum of 5 categories</p>

          {/* Selected categories tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategories.map((category) => (
              <div
                key={category}
                className="bg-[#FFDEDE] text-[#E53E3E] px-3 py-1 rounded-full text-[12px] font-medium"
              >
                {category}
              </div>
            ))}
          </div>

          {/* Categories list - Fixed height without scroll */}
          <div className="space-y-[2px] -mt-3">
            {categories.map((category, index) => (
              <label
                key={index}
                className="flex items-center justify-between p-4 bg-[#F5F5F5] cursor-pointer rounded-lg"
              >
                <span className="text-[12px] text-gray-700">{category}</span>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                  style={{
                    accentColor: selectedCategories.includes(category) ? '#E53E3E' : undefined
                  }}
                />
              </label>
            ))}
          </div>

          {/* Apply Button */}
          <div className="mt-6">
            <button
              onClick={handleApply}
              className="w-full h-[45px] bg-[#E53E3E]  -mt-2 text-white font-sm text-[12px] py-3 px-4 rounded-lg transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCategory;
