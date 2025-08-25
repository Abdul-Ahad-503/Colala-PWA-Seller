import React from 'react';
import IMAGES from '../constants';
interface ServiceBadgeProps {
  text: string;
  type: 'delivery' | 'discount';
}

const ServiceBadge: React.FC<ServiceBadgeProps> = ({ text, type }) => {
  const gradientClass = type === 'delivery' 
    ? 'bg-gradient-to-r from-red-500 to-orange-400' 
    : 'bg-gradient-to-r from-orange-400 to-yellow-400';

  return (
    <div className={` bg-[#FFA500] rounded-[2px]    w-[60px] h-3  flex items-center  text-white text-[6px] font-normal`}>
      {/* Cart Icon */}
      <div className="rounded-l-[2px] bg-[url('/cut-bg.svg')] w-4 h-3 bg-no-repeat flex justify-center items-center m-0 p-0">
        <svg className="w-2 h-2 fill-white" viewBox="0 0 24 24">
        <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>
      </div>
      <span className='text-[6px] '>{text}</span>
    </div>
  );
};

export default ServiceBadge;
