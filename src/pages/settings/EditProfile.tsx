import React, { useState } from 'react';
import IMAGES from '../../constants';

const EditProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: 'MalekeHenrzy',
    fullName: 'Qamardeen Abdulmalik',
    email: 'abcde@gmail.com',
    phone: '07012345678'
  });

  // Removed password reset states (handled in original settings modal) since not needed in isolated profile view

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Saving profile data:', formData);
  };

  return (
    <div className="flex-1 p-8 bg-white rounded-[20px]">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Edit Profile</h1>
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-25 h-25 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <img src={IMAGES.cameraBig || '/camera.png'} alt="Camera" className="w-13 h-13 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Maleekfrenzy" className="w-full px-4 py-4 border border-gray-200 rounded-[15px] focus:ring-2 focus:ring-red-400 focus:border-transparent bg-white" />
            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Qamardeen Abdulmalik" className="w-full px-4 py-4 border border-gray-200 rounded-[15px] focus:ring-2 focus:ring-red-400 focus:border-transparent bg-white" />
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="abcdef@gmail.com" className="w-full px-4 py-4 border border-gray-200 rounded-[15px] focus:ring-2 focus:ring-red-400 focus:border-transparent bg-white" />
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="07012345678" className="w-full px-4 py-4 border border-gray-200 rounded-[15px] focus:ring-2 focus:ring-red-400 focus:border-transparent bg-white" />
            <div className="p-4 rounded-[15px] border border-gray-200">
              <button className="flex items-center justify-between w-full text-left">
                <span className="font-medium text-gray-700">Change Password</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          <div className="mt-8">
            <button onClick={handleSave} className="w-full bg-[#E53E3E] text-white py-4 rounded-lg font-medium hover:bg-red-600 transition-colors">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
