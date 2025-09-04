import React, { useState } from 'react';
import IMAGES from '../../constants';

interface CreatePostProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (selectedImage: string, postText: string) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ isOpen, onClose, onCreatePost }) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [postText, setPostText] = useState<string>('');
  
  if (!isOpen) return null;

  const handleImageSelect = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  const handleCreatePost = () => {
    if (selectedImage || postText.trim()) {
      onCreatePost(selectedImage, postText);
      setSelectedImage('');
      setPostText('');
      onClose();
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage('');
  };

  return (
    <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-3xl w-[430px] ${selectedImage ? 'h-auto max-h-[90vh]' : 'h-[520px]'} overflow-hidden shadow-2xl`}>
        {/* Modal Header */}
        <div className="flex items-center justify-center pop_up relative p-6 pb-4 mb-4">
          <div className="w-6"></div> {/* Spacer for centering */}
          <h2 className="text-[20px] font-semibold text-gray-900">Create Post</h2>
         
        </div>
 <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 ml-18 rounded-full transition-colors"
          >
            <img src="/Vector.svg" alt="Close" className="w-5 h-5 ml-75 -mt-20" />
          </button>
        {/* Modal Content */}
        <div className="px-6 py-6 ">
          {/* User Info & Text Input */}
          <div className={`bg-[#FFFFFF] shadow-2xl ${selectedImage ? 'h-auto' : 'h-[236px]'} -mt-16 rounded-2xl p-4 mb-4`}>
            <div className="flex items-start space-x-3">
              <img 
                src={IMAGES.adam} 
                alt="User avatar"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1"
              />
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="What is on your mind"
                className={`flex-1 bg-transparent border-none resize-none focus:outline-none mt-2 text-gray-700 text-[14px] placeholder-gray-400 ${selectedImage ? 'min-h-[60px]' : 'min-h-[100px]'}`}
              />
            </div>
            
            {/* Selected Image Preview */}
            {selectedImage && (
              <div className="mt-4 relative">
                <div className="w-full h-48 rounded-2xl overflow-hidden bg-gray-100">
                  <img 
                    src={selectedImage} 
                    alt="Selected preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-3 right-3 w-7 h-7 bg-black bg-opacity-60 rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Image Selection */}
          <div className="mb-8">
            <div className="bg-[#FFFFFF] shadow-2xl rounded-2xl p-4">
              <div className="grid grid-cols-5 gap-3">
                {/* Add Photo Button */}
                <button 
                  className="aspect-square bg-[#F5F5F5] rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>

                {/* Phone Images */}
                <button 
                  onClick={() => handleImageSelect(IMAGES.top1)}
                  className="aspect-square rounded-2xl overflow-hidden hover:opacity-80 transition-all duration-200 hover:scale-105"
                >
                  <img 
                    src={IMAGES.top1} 
                    alt="Phone 1"
                    className="w-full h-full object-cover"
                  />
                </button>

                <button 
                  onClick={() => handleImageSelect(IMAGES.top2)}
                  className="aspect-square rounded-2xl overflow-hidden hover:opacity-80 transition-all duration-200 hover:scale-105"
                >
                  <img 
                    src={IMAGES.top2} 
                    alt="Phone 2"
                    className="w-full h-full object-cover"
                  />
                </button>

                <button 
                  onClick={() => handleImageSelect(IMAGES.top3)}
                  className="aspect-square rounded-2xl overflow-hidden hover:opacity-80 transition-all duration-200 hover:scale-105"
                >
                  <img 
                    src={IMAGES.top3} 
                    alt="Phone 3"
                    className="w-full h-full object-cover"
                  />
                </button>

                <button 
                  onClick={() => handleImageSelect(IMAGES.top4)}
                  className="aspect-square rounded-2xl overflow-hidden hover:opacity-80 transition-all duration-200 hover:scale-105"
                >
                  <img 
                    src={IMAGES.top4} 
                    alt="Phone 4"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Create Post Button */}
          <button 
            onClick={handleCreatePost}
            className="w-full h-[50px] bg-primary text-white py-3 text-[12px]  -mt-4 rounded-2xl font-medium hover:bg-red-600 transition-colors"
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;