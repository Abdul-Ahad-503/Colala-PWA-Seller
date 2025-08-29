import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IMAGES from '../../constants';

const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [selectedTab, setSelectedTab] = useState<'description' | 'reviews'>('description');
  const [selectedColor, setSelectedColor] = useState<string>('black');
  const [selectedSize, setSelectedSize] = useState<string>('S');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedThumbnail, setSelectedThumbnail] = useState<number>(0);

  // Sample product data
  const product = {
    id: productId || '1',
    name: 'Iphone 12 Pro Max',
    price: 'N2,500,000',
    originalPrice: 'N3,000,000',
    rating: 4.5,
    mainImage: IMAGES.top1,
    thumbnails: [
      IMAGES.top1,
      IMAGES.top2,
      IMAGES.top3,
      IMAGES.top4,
      IMAGES.top1
    ],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Blue', value: '#0066FF' },
      { name: 'Red', value: '#FF0000' },
      { name: 'Yellow', value: '#FFFF00' },
      { name: 'Cyan', value: '#00FFFF' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    bulkPrices: [
      { quantity: '12 Pieces', amount: 'N500,000', youSave: 'N20,000', percentage: '10%' },
      { quantity: '24 Pieces', amount: 'N500,000', youSave: 'N20,000', percentage: '10%' },
      { quantity: '36 Pieces', amount: 'N500,000', youSave: 'N20,000', percentage: '10%' },
      { quantity: '48 Pieces', amount: 'N500,000', youSave: 'N20,000', percentage: '10%' }
    ]
  };

  const handleBack = () => {
    navigate('/my-products');
  };

  const handleQuantityChange = (action: 'increment' | 'decrement') => {
    if (action === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="">
        <div className="container-custom ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-2xl text-gray-600">
              <button onClick={handleBack} className="text-gray-600 hover:text-gray-800">
                My product
              </button>
              <span>/</span>
              <span className="font-semibold  text-black">Product Details</span>
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
            {product.thumbnails.map((thumb, index) => (
              <div key={index} className="flex-shrink-0">
                <img 
                  src={thumb} 
                  alt={`${product.name} ${index + 1}`}
                  onClick={() => setSelectedThumbnail(index)}
                  className={`w-[65px] h-[65px] object-cover rounded-lg cursor-pointer border-2 ${
                    selectedThumbnail === index ? 'border-red-500' : 'border-gray-200'
                  } hover:border-red-400 transition-colors`}
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 max-w-md space-y-4">
            <div className="bg-white rounded-xl">
              <img 
                src={product.thumbnails[selectedThumbnail]} 
                alt={product.name}
                className="w-[430px] h-92 object-cover rounded-lg"
              />
            </div>

            {/* Description/Reviews Section */}
            <div>
              <div className="flex gap-4 mb-4 -ml-23 mt-7">
                <button
                  onClick={() => setSelectedTab('description')}
                  className={`px-7 py-3 rounded-[10px] text-xs  ${
                    selectedTab === 'description' 
                      ? 'bg-red-500 text-white' 
                      : ' border border-[#CDCDCD] text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setSelectedTab('reviews')}
                  className={`px-7 py-3 rounded-[10px] text-xs  ${
                    selectedTab === 'reviews' 
                      ? 'bg-red-500 text-white' 
                      : ' border border-[#CDCDCD] text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Reviews
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 -ml-23">
                {selectedTab === 'description' ? (
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Product Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                      The iPhone 12 Pro Max features a 6.7-inch Super Retina XDR display, A14 Bionic chip, 
                      Pro camera system with LiDAR Scanner, and 5G capability. Available in multiple colors 
                      and storage options to suit your needs.
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Customer Reviews</h3>
                    <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="flex-1 space-y-6">
            {/* Product Title and Price */}
            <div>
              <h1 className="text-2xl font-bold text-black mb-3">{product.name}</h1>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-red-500">{product.price}</span>
                  <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-red-500">★</span>
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
              </div>

              {/* Information Tags/Badges */}
              <div className="space-y-1 mb-6">
                <div className="flex items-center bg-[#FFA500] text-white rounded-[2px]">
                  <span className="bg-[url('/1.png')] w-[21px] flex items-center pl-0.5 rounded-l-[2px] h-[16px] mr-2"><img src={IMAGES.shoppingCartSimpleWhite} className='w-[10px] h-[10px] ' alt="" /></span>
                  <span className="text-[8px]">Information tag 1</span>
                </div>
                <div className="flex items-center bg-[#0000FF] text-white rounded-[2px]">
                  <span className="bg-[url('/3.png')] w-[21px] flex items-center pl-0.5 rounded-l-[2px] h-[16px] mr-2"><img src={IMAGES.shoppingCartSimpleWhite} className='w-[10px] h-[10px] ' alt="" /></span>
                  <span className="text-[8px]">Information tag 2</span>
                </div>
                <div className="flex items-center bg-[#800080] text-white rounded-[2px]">
                  <span className="bg-[url('/2.png')] w-[21px] flex items-center pl-0.5 rounded-l-[2px] h-[16px] mr-2"><img src={IMAGES.shoppingCartSimpleWhite} className='w-[10px] h-[10px] ' alt="" /></span>
                  <span className="text-[8px]">Information tag 3</span>
                </div>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-base font-medium text-black mb-3">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name.toLowerCase())}
                    className={`w-12 h-12 rounded-full border-3 ${
                      selectedColor === color.name.toLowerCase() ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-base font-medium text-black mb-3 border-t ">Size</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-[18px] py-[13px] rounded-[15px] border text-sm font-medium ${
                      selectedSize === size
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Bulk Prices */}
            <div>
              <div className="bg-red-500 text-white px-4 py-3 ">
                <h3 className="font-medium">Bulk Prices</h3>
              </div>
              <div className="bg-white overflow-hidden">
                <div className="grid grid-cols-4 bg-gray-50 text-xs font-medium text-gray-700 px-[10px] py-[15px] ">
                  <span>Quantity</span>
                  <span>Amount</span>
                  <span>You Save</span>
                  <span className='justify-self-end'>%</span>
                </div>
                {product.bulkPrices.map((price, index) => (
                  <div key={index} className={`grid grid-cols-4 px-[10px] py-[15px] text-sm  last:border-b ${
                    index % 2 === 0 ? 'bg-red-100' : 'bg-white'
                  }`}>
                    <span className="text-gray-800 font-medium">{price.quantity}</span>
                    <span className="text-gray-800 font-medium">{price.amount}</span>
                    <span className="text-gray-800 font-medium">{price.youSave}</span>
                    <span className="text-red-500 justify-self-end font-medium">{price.percentage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Left and Controls */}
            <div className="flex items-center justify-between border-b pb-5">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Quantity left</div>
                <div className="text-2xl font-bold text-red-500">{product.price}</div>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleQuantityChange('decrement')}
                  className="w-14 h-14 bg-red-500 text-white rounded-lg flex items-center justify-center font-bold text-xl hover:bg-red-600"
                >
                  −
                </button>
                <span className="text-2xl font-bold text-red-500 px-4">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange('increment')}
                  className="w-14 h-14 bg-red-500 text-white rounded-lg flex items-center justify-center font-bold text-xl hover:bg-red-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <img src={IMAGES.Trash} alt="" />
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <img src={IMAGES.chartBar} alt="" />
                </button>
                <button className="flex-1 bg-primary text-xs text-white py-3 px-6 rounded-[15px] hover:bg-red-600">
                  Edit Product
                </button>
              </div>
              
              <button className="w-full bg-black text-xs text-white py-4 rounded-[15px] hover:bg-gray-800">
                Boost Post
              </button>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ProductDetails;
