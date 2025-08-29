import React from 'react';
import IMAGES from '../../constants';

interface BoostAdPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

const BoostAdPopup: React.FC<BoostAdPopupProps> = ({
  isOpen,
  onClose,
  onProceed
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-[430px] h-auto flex flex-col overflow-hidden relative  ">
        {/* Orange Header with Megaphone */}
       <div className="flex items-center justify-center pop_up  p-6 bg-transparent relative">
          <h2 className="text-2xl font-bold font-decorative">Boost Ad</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 absolute  right-3 top-3"
          >
            <img src={IMAGES.Xcircle} alt="Close" className="w-6 h-6" />
          </button>
        </div>

        <div className="image">
            <img src={IMAGES.MegaPhoneColored} alt="Boost Advertisement" className="w-[437px] h-[261px]  -mt-20 object-center" />
        </div>

        {/* Single Parent Container for Pink Section + Benefits + Button */}
        <div className="flex flex-col bg-gradient-to-b from-[#FFD1D1] to-[#FFFFFF] rounded-t-[30px] -mt-8">
          {/* Pink Section */}
          <div className="bg-transparent px-6 py-4">
            <h3 className="text-base font-medium text-primary">
              Get Amazing Benefits from Boosting your product
            </h3>
          </div>
          

          {/* Content - Benefits Section */}
          <div className="px-5  space-y-2">
            <div className="bg-white border border-gray-100 rounded-xl p-4 py-2 shadow-sm">
              <h4 className=" text-black text-sm mb-2">Increased Visibility</h4>
              <p className="text-[10px] text-[#00000080]">
                Boosting your product helps it reach a larger audience beyond your existing followers, increasing the chances of being seen by potential customers.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-4 py-2 shadow-sm">
              <h4 className=" text-black text-sm mb-2">Targeted Reach</h4>
              <p className="text-[10px] text-[#00000080]">
                You can choose specific demographics, locations, ensuring your ad is seen by the people most likely to engage with it.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-4 py-2 shadow-sm">
              <h4 className=" text-black text-sm mb-2">More Engagement</h4>
              <p className="text-[10px] text-[#00000080]">
                Boosted products tend to get more likes, comments, shares, and clicks, helping you build credibility and foster a more active community.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-4 py-2 shadow-sm">
              <h4 className=" text-black text-sm mb-2">Wider Reach</h4>
              <p className="text-[10px] text-[#00000080]">
                Boosted products will not only be featured on gym buddy but also advertise gym buddy to get more visibility and reach.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-4 py-2 shadow-sm">
              <h4 className=" text-black text-sm mb-2">Budget Control</h4>
              <p className="text-[10px] text-[#00000080]">
                You can set your own budget and duration, making it easy to manage costs while still achieving measurable marketing results.
              </p>
            </div>

            {/* Proceed Button */}
            <button
              onClick={onProceed}
              className="w-full bg-primary text-white py-5 rounded-[15px]  text-sm hover:bg-red-600 transition-colors my-3"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
)};

export default BoostAdPopup;
