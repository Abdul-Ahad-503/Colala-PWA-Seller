import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import LocationModal from './locationmodal';

interface AddNewAddressProps {
  isOpen: boolean;
  onSave: (addressData: any) => void;
  onBack: () => void;
}

interface OpeningHours {
  from: string;
  to: string;
}

interface WeeklyHours {
  monday: OpeningHours;
  tuesday: OpeningHours;
  wednesday: OpeningHours;
  thursday: OpeningHours;
  friday: OpeningHours;
  saturday: OpeningHours;
  sunday: OpeningHours;
}

const AddNewAddress: React.FC<AddNewAddressProps> = ({
  isOpen,
  onSave,
  onBack
}) => {
  const [state, setState] = useState('');
  const [localGovernment, setLocalGovernment] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [isMainStore, setIsMainStore] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [openingHours, setOpeningHours] = useState<WeeklyHours>({
    monday: { from: '', to: '' },
    tuesday: { from: '', to: '' },
    wednesday: { from: '', to: '' },
    thursday: { from: '', to: '' },
    friday: { from: '', to: '' },
    saturday: { from: '', to: '' },
    sunday: { from: '', to: '' }
  });

  const timeOptions = [
    '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM',
    '3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM',
    '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM',
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'
  ];

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  useEffect(() => {
    if (!isOpen) return;

    // Load saved data
    const savedAddressData = Cookies.get('registrationAddressData');
    if (savedAddressData) {
      try {
        const data = JSON.parse(savedAddressData);
        setState(data.state || '');
        setLocalGovernment(data.localGovernment || '');
        setFullAddress(data.fullAddress || '');
        setIsMainStore(data.isMainStore || false);
        setOpeningHours(data.openingHours || openingHours);
      } catch (error) {
        console.error('Error parsing address data:', error);
      }
    }
  }, [isOpen]);

  const handleTimeChange = (day: keyof WeeklyHours, timeType: 'from' | 'to', value: string) => {
    setOpeningHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeType]: value
      }
    }));
  };

  const handleStateClick = () => {
    setShowLocationModal(true);
  };

  const handleCloseLocationModal = () => {
    setShowLocationModal(false);
  };

  const handleSelectState = (selectedState: string) => {
    setState(selectedState);
    setShowLocationModal(false);
  };

  const handleSave = () => {
    if (!state || !localGovernment || !fullAddress) {
      alert('Please complete all required fields.');
      return;
    }

    const addressData = {
      state,
      localGovernment,
      fullAddress,
      isMainStore,
      openingHours
    };

    // Save to cookies
    Cookies.set('registrationAddressData', JSON.stringify(addressData), { expires: 7 });
    
    // Call parent save handler
    onSave(addressData);
  };

  if (!isOpen) return null;

  return (
    <div className="w-1/2 flex flex-col bg-[#F9F9F9] max-h-[666px]">
      {/* Fixed Header */}
      <div className="p-6 pb-4 flex-shrink-0">
        <div className="text-center mb-6">
          <h2 className="text-[24px] font-medium text-[#E53E3E] mb-2">Register</h2>
          <p className="text-[14px] text-gray-500">Create a free account today</p>
        </div>

        {/* Back Arrow and Title */}
        <div className="flex items-center mb-3">
          <button
            onClick={onBack}
            className="mr-4 p-1 hover:bg-gray-100 bg-white border border-[#CDCDCD] rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-[18px] font-medium text-[#000000]">Add New Address</h3>
        </div>
      </div>

      {/* Scrollable Content */}
      <div 
        className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar" 
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#CBD5E0 #F7FAFC'
        }}
      >
        {/* State */}
        <div className="mb-3">
          <button
            onClick={handleStateClick}
            className="flex items-center justify-between py-4 w-[389px] rounded-2xl bg-[#FFFFFF] shadow-medium border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <p className="text-[14px] ml-4 text-[#000000]">
              {state || 'State'}
            </p>
            <img src="/public/CaretLeft.svg" alt="State" className="w-5 h-5 mr-3 text-gray-400" />
          </button>
        </div>

        {/* Local Government */}
        <div className="mb-4">
          <div className="flex items-center justify-between py-4 w-[389px]  bg-[#FFFFFF] rounded-2xl shadow-medium border border-gray-200">
            <p className="text-[14px] ml-4 text-[#000000]">Local Government</p>
            <img src="/public/CaretLeft.svg" alt="Local Government" className="w-5 h-5 mr-3 text-gray-400" />
          </div>
        </div>

        {/* Full Address Textarea */}
        <div className="mb-2">
          <textarea
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            placeholder="Enter full address"
            className="w-[385px] h-44 px-4 py-3 border border-[#CDCDCD] rounded-2xl bg-[#FFFFFF] text-gray-700 text-[14px] shadow-medium resize-none focus:outline-none "
          />
        </div>

        {/* Opening Hours */}
        <div className="mb-4">
          <h4 className="text-[14px] font-medium text-[#000000] mb-4">Opening Hours</h4>
          
          <div className="space-y-2">
            {daysOfWeek.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-4">
                <div className="w-20 text-[14px] text-[#000000]">{label}</div>

                {/* From Time */}
                <div className="flex-1 ">
                  <select
                    value={openingHours[key as keyof WeeklyHours].from}
                    onChange={(e) => handleTimeChange(key as keyof WeeklyHours, 'from', e.target.value)}
                    className="w-[126px] px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-[14px] focus:outline-none "
                  >
                    <option value="">From</option>
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                {/* <span className="text-[12px] text-gray-500">To</span> */}

                {/* To Time */}
                <div className="flex-1 mr-4">
                  <select
                    value={openingHours[key as keyof WeeklyHours].to}
                    onChange={(e) => handleTimeChange(key as keyof WeeklyHours, 'to', e.target.value)}
                    className="w-[126px] px-3 py-2  border border-gray-300 rounded-lg bg-white text-gray-700 text-[14px] focus:outline-none "
                  >
                    <option value="">To</option>
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mark as Main Store */}
        <div className="mb-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={isMainStore}
                onChange={(e) => setIsMainStore(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 ${isMainStore ? 'bg-red-500 border-red-500' : 'border-gray-300'} flex items-center justify-center`}>
                {isMainStore && (
                  <svg className="w-3 h-3 text-[14px] text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-[14px] text-gray-900">Mark as Main Store</span>
          </label>
        </div>

        {/* Save Button */}
        <div className="mb-6">
          <button
            onClick={handleSave}
            className="w-full bg-[#E53E3E] text-white font-medium py-4 px-6 rounded-xl transition-colors text-[14px]"
          >
            Save
          </button>
        </div>
      </div>

      {/* Location Modal */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={handleCloseLocationModal}
        onSelectState={handleSelectState}
      />
    </div>
  );
};

export default AddNewAddress;
