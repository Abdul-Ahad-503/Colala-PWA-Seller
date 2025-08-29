import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import LocationModal from './locationmodal';

interface AddNewAddressProps {
  isOpen: boolean;
  onSave: (addressData: any) => void;
  onBack: () => void;
    onClose: () => void;
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
  const [locationModalMode, setLocationModalMode] = useState<'state' | 'lga'>('state');
  const [showSavedAddress, setShowSavedAddress] = useState(false);
  const [openingHours, setOpeningHours] = useState<WeeklyHours>({
    monday: { from: '', to: '' },
    tuesday: { from: '', to: '' },
    wednesday: { from: '', to: '' },
    thursday: { from: '', to: '' },
    friday: { from: '', to: '' },
    saturday: { from: '', to: '' },
    sunday: { from: '', to: '' }
  });

    // Modal state for adding new address
    const [showAddNewModal, setShowAddNewModal] = useState(false);

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

    // Load saved data for createstore
    const savedAddressData = Cookies.get('createStoreAddressData');
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
    setLocationModalMode('state');
    setShowLocationModal(true);
  };

  const handleLGAClick = () => {
    if (state) {
      setLocationModalMode('lga');
      setShowLocationModal(true);
    } else {
      alert('Please select a state first');
    }
  };

  const handleCloseLocationModal = () => {
    setShowLocationModal(false);
  };

  const handleSelectState = (selectedState: string) => {
    setState(selectedState);
    setShowLocationModal(false);
  };

  const handleSelectLGA = (selectedLGA: string) => {
    setLocalGovernment(selectedLGA);
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

    // Save to cookies for createstore
    Cookies.set('createStoreAddressData', JSON.stringify(addressData), { expires: 7 });
    
    // Show saved address view
    setShowSavedAddress(true);
  };

  const handleEditAddress = () => {
    setShowSavedAddress(false);
  };

  const handleDeleteAddress = () => {
    // Reset all fields
    setState('');
    setLocalGovernment('');
    setFullAddress('');
    setIsMainStore(false);
    setOpeningHours({
      monday: { from: '', to: '' },
      tuesday: { from: '', to: '' },
      wednesday: { from: '', to: '' },
      thursday: { from: '', to: '' },
      friday: { from: '', to: '' },
      saturday: { from: '', to: '' },
      sunday: { from: '', to: '' }
    });
    setShowSavedAddress(false);
    Cookies.remove('createStoreAddressData');
  };

  const handleAddNew = () => {
    // Call parent save handler to go back to main view
    onSave({
      state,
      localGovernment,
      fullAddress,
      isMainStore,
      openingHours
    });
  };

  if (!isOpen) return null;

  return (
    <div className="w-[680px]">
      {!showSavedAddress ? (
        // Add New Address Form
        <>
          {/* Header with Back Button and Title - matching image 1 */}
          <div className="flex items-center mb-6">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-100  rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-[18px] font-medium text-[#000000]">
              <span className="text-gray-500">Level 3</span>
              <span className="text-black">/</span>
              <span className="text-black font-bold">Add New Address</span>
            </h3>
          </div>

          {/* Content */}
          <div className="w-[680px] space-y-4">
            {/* State */}
            <div className="mb-4">
              <button
                onClick={handleStateClick}
                className="flex items-center justify-between py-4 w-full rounded-lg bg-[#FFFFFF] border border-[#CDCDCD] hover:bg-gray-50 transition-colors px-4"
              >
                <span className="text-[14px] text-[#000000]">
                  {state || 'State'}
                </span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Local Government */}
            <div className="mb-4">
              <button 
                onClick={handleLGAClick}
                className="flex items-center justify-between py-4 w-full rounded-lg bg-[#FFFFFF] border border-[#CDCDCD] hover:bg-gray-50 transition-colors px-4"
              >
                <span className="text-[14px] text-[#000000]">
                  {localGovernment || 'Local Government'}
                </span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Full Address Textarea */}
            <div className="mb-6">
              <textarea
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="Enter full address"
                className="w-full h-32 px-4 py-3 border border-[#CDCDCD] rounded-lg bg-[#FFFFFF] text-gray-700 text-[14px] resize-none focus:outline-none focus:border-[#E53E3E]"
              />
            </div>

            {/* Opening Hours */}
            <div className="mb-6">
              <h4 className="text-[14px] font-medium text-[#000000] mb-4">Opening Hours</h4>
              
              <div className="space-y-3">
                {daysOfWeek.map(({ key, label }) => (
                  <div key={key} className="flex items-center gap-4">
                    <div className="w-24 text-[14px] text-[#000000] font-medium">{label}</div>

                    {/* From Time */}
                    <div className="flex-1">
                      <select
                        value={openingHours[key as keyof WeeklyHours].from}
                        onChange={(e) => handleTimeChange(key as keyof WeeklyHours, 'from', e.target.value)}
                        className="w-full px-3 py-2 border border-[#CDCDCD] rounded-lg bg-white text-gray-700 text-[14px] focus:outline-none focus:border-[#E53E3E]"
                      >
                        <option value="">From</option>
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>

                    {/* To Time */}
                    <div className="flex-1">
                      <select
                        value={openingHours[key as keyof WeeklyHours].to}
                        onChange={(e) => handleTimeChange(key as keyof WeeklyHours, 'to', e.target.value)}
                        className="w-full px-3 py-2 border border-[#CDCDCD] rounded-lg bg-white text-gray-700 text-[14px] focus:outline-none focus:border-[#E53E3E]"
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
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isMainStore}
                    onChange={(e) => setIsMainStore(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded ${isMainStore ? 'bg-[#E53E3E]' : 'bg-white border-2 border-gray-300'} flex items-center justify-center`}>
                    {isMainStore && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-[14px] text-[#000000]">Mark as Main Store</span>
              </label>
            </div>

            {/* Save Button */}
            <div className="mb-6">
              <button
                onClick={handleSave}
                className="w-full bg-[#E53E3E] text-white font-medium py-4 px-6 rounded-lg transition-colors hover:bg-red-600 text-[14px]"
              >
                Save
              </button>
            </div>
          </div>
        </>
      ) : (
        // My Address View
        <>
          {/* Header with Back Button and Title - My Address */}
          <div className="flex items-center mb-6">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-100  rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-[18px] font-medium text-[#000000]">
              <span className="text-gray-500">Level 3</span>
              <span className="text-black">/</span>
              <span className="text-black font-bold">My Address</span>
            </h3>
          </div>

          {/* My Address Content */}
          <div className="w-[680px] ">
            {/* Address Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Red Header */}
              <div className="bg-[#E53E3E] text-white px-6 py-4 flex items-center justify-between">
                <h4 className="text-[16px] font-medium">Address 1</h4>
                <div className="flex items-center gap-4">
                  {/* Delete Icon */}
                  <button
                    onClick={handleDeleteAddress}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <img src="/public/delete.svg" alt="Delete" className="w-5 h-5" />
                  </button>
                  
                  {/* Edit Icon */}
                  <button
                    onClick={handleEditAddress}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <img src="/public/edit.svg" alt="Edit" className="w-5 h-5" />
                  </button>
                  
                  {/* View on Map Button */}
                  <button className="bg-white text-[#E53E3E] px-4 py-2 rounded-full text-[12px] font-medium hover:bg-gray-100 transition-colors">
                    View on Map
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    {/* State */}
                    <div className="mb-4">
                      <div className="text-[10px] text-gray-500 mb-1">State</div>
                      <div className="text-[14px] text-black font-medium">{state}</div>
                    </div>

                    {/* Local Government */}
                    <div className="mb-4">
                      <div className="text-[10px] text-gray-500 mb-1">Local Government</div>
                      <div className="text-[14px] text-black font-medium">{localGovernment}</div>
                    </div>

                    {/* Full Address */}
                    <div className="mb-[0.1px]">
                      <div className="text-[10px] text-gray-500 mb-1">Full Address</div>
                      <div className="text-[14px] text-black">
                        {fullAddress}
                      </div>
                    </div>
                  </div>

                  {/* Main Office Badge */}
                  {isMainStore && (
                    <div className="ml-4">
                      <span className="inline-block bg-[#FF000033] text-[#FF0000] border border-[#FF0000] text-[10px] font-medium px-3 py-1 rounded-lg">
                        Main Office
                      </span>
                    </div>
                  )}
                </div>

                {/* Opening Hours */}
                <div className="bg-[#FFEEEE] border border-[#FF0000] rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h5 className="text-[14px] font-bold text-black">Opening Hours</h5>
                  </div>
                  
                  <div className="space-y-[0.1px]">
                    {daysOfWeek.map(({ key, label }) => {
                      const hours = openingHours[key as keyof WeeklyHours];
                      const isToday = key === 'wednesday'; // Highlight Wednesday as in the image
                      return (
                        <div key={key} className="flex justify-between items-center">
                          <span className={`text-[10px] ${isToday ? 'text-[#E53E3E] font-medium' : 'text-gray-600'}`}>
                            {label}
                          </span>
                          <span className={`text-[10px] ${isToday ? 'text-[#E53E3E] font-medium' : 'text-black'}`}>
                            {hours.from && hours.to ? `${hours.from} - ${hours.to}` : 'Closed'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Add New Button */}
            <div className="text-center mt-4">
              <button
                onClick={() => setShowAddNewModal(true)}
                className="bg-[#E53E3E] w-[680px] text-white font-small  py-4 px-8 rounded-lg transition-colors hover:bg-red-600 text-[14px]"
              >
                Add New
              </button>
            </div>
          </div>
        </>
      )}

      {/* Location Modal */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={handleCloseLocationModal}
        onSelectState={handleSelectState}
        onSelectLGA={handleSelectLGA}
        mode={locationModalMode}
        selectedState={state}
      />

      {/* Add New Address Modal Overlay */}
      {showAddNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-brightness-50 bg-opacity-40">
          <div className="bg-[#F9F9F9] rounded-[24px] shadow-lg w-[430px] max-h-[95vh] overflow-y-auto pt-4 pb-6 px-6 relative flex flex-col hide-scrollbar ">
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setShowAddNewModal(false);
                setShowLocationModal(false);
              }}
            >
              <img src="/public/Vector.svg" alt="Close" />
            </button>
            {/* Title */}
         
            <h2 className=" flex flex-col items-center justify-center text-center  text-[22px] font-bold font-serif pop_up  mb-6 mt-2">Add New Address</h2>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
              {/* State and Local Government Selection */}
              <button
                type="button"
                onClick={() => {
                  setLocationModalMode('state');
                  setShowLocationModal(true);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-[16px] bg-[#FFFFFF] shadow-medium text-[15px] text-black border-none focus:outline-none"
              >
                <span>{state || 'State'}</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (state) {
                    setLocationModalMode('lga');
                    setShowLocationModal(true);
                  } else {
                    alert('Please select a state first');
                  }
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-[16px] bg-[#FFFFFF] shadow-medium  text-[15px] text-black border-none focus:outline-none"
              >
                <span>{localGovernment || 'Local Government'}</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {/* Full Address */}
              <textarea
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="Enter full address"
                rows={3}
                className="w-full h-[175px] px-4 py-3 rounded-[16px] bg-[#FFFFFF]  shadow-medium text-[14px] text-black border-none focus:outline-none resize-none"
              />
              {/* Opening Hours */}
              <div>
                <div className="text-[14px] font-medium -mt-3 mb-2">Opening Hours</div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="col-span-1"></div>
                  <div className="col-span-1 text-[13px] text-gray-500">From</div>
                  <div className="col-span-1 text-[13px] text-gray-500">To</div>
                  {Object.entries(openingHours).map(([day, times]) => (
                    <>
                      <div className="col-span-1 text-[13px] text-black font-medium">{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                      <div className="col-span-1">
                        <select
                          value={times.from}
                          onChange={(e) => setOpeningHours(prev => ({ ...prev, [day as keyof WeeklyHours]: { ...prev[day as keyof WeeklyHours], from: e.target.value } }))}
                          className="w-full px-2 py-2 rounded-[8px] bg-[#F7F7F7] text-[14px] border border-gray-300 focus:outline-none"
                        >
                          <option value="">From</option>
                          {timeOptions.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-1">
                        <select
                          value={times.to}
                          onChange={(e) => setOpeningHours(prev => ({ ...prev, [day as keyof WeeklyHours]: { ...prev[day as keyof WeeklyHours], to: e.target.value } }))}
                          className="w-full px-2 py-2 rounded-[8px] bg-[#F7F7F7] text-[14px] border border-gray-300 focus:outline-none"
                        >
                          <option value="">To</option>
                          {timeOptions.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  ))}
                </div>
              </div>
              {/* Main Store Checkbox */}
              <div className="flex items-center gap-2 mt-2 mb-2">
                <input
                  type="checkbox"
                  checked={isMainStore}
                  onChange={(e) => setIsMainStore(e.target.checked)}
                  className="accent-[#E53E3E] w-4 h-4 rounded focus:ring-0 border border-gray-300"
                />
                <span className="text-[14px] text-black">Mark as Main Store</span>
              </div>
              {/* Save Button */}
              <button
                type="button"
                onClick={() => { setShowSavedAddress(true); setShowAddNewModal(false); }}
                className="w-full bg-[#E53E3E] text-white font-sm py-3 rounded-[14px] text-[14px] mt-2"
              >
                Save
              </button>
            </form>
            {/* Location Modal for Add New Address modal */}
            <LocationModal
              isOpen={showLocationModal}
              onClose={() => setShowLocationModal(false)}
              onSelectState={handleSelectState}
              onSelectLGA={handleSelectLGA}
              mode={locationModalMode}
              selectedState={state}
            />
          </div>
        </div>
        
      )}
      {/* Transparent scrollbar CSS */}
      <style>{`
.custom-scrollbar::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: transparent;
}
`}</style>
    </div>
  );
};

export default AddNewAddress;
