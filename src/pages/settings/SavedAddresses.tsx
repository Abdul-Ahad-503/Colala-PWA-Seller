import React, { useState } from 'react';

interface Address {
  id: number;
  type: string;
  phone: string;
  state: string;
  lga: string;
  fullAddress: string;
}

const SavedAddresses: React.FC = () => {
  const [savedAddresses] = useState<Address[]>([
    { id: 1, type: 'Default Address', phone: '07012345678', state: 'Lagos', lga: 'Ikeja', fullAddress: 'No 2, achossccddf street, Ikeja' },
    { id: 2, type: 'Default Address', phone: '07012345678', state: 'Lagos', lga: 'Ikeja', fullAddress: 'No 2, achossccddf street, Ikeja' }
  ]);

  const handleEditAddress = (id: number) => console.log('Edit address', id);
  const handleDeleteAddress = (id: number) => console.log('Delete address', id);
  const handleAddNew = () => console.log('Add new address');

  return (
    <div className="flex-1 p-8 bg-white rounded-[20px]"><div className="max-w-2xl"><h1 className="text-2xl font-semibold text-gray-900 mb-6">Saved Addresses</h1><div className="py-8">{savedAddresses.map((address, index) => (<div key={address.id} className="mb-6 p-6 border border-gray-200 rounded-[15px] bg-white"><div className="flex justify-between items-start mb-4"><div className="flex items-center gap-3"><h3 className="text-lg font-medium">Address {index + 1}</h3><span className="bg-[#FF000033] border border-[#E53E3E] text-[#E53E3E] text-xs px-2 py-1 rounded">{address.type}</span></div><div className="flex gap-2"><button onClick={() => handleEditAddress(address.id)} className="bg-[#E53E3E] text-white text-[8px] px-4 py-2 rounded-[20px] hover:bg-red-600 transition-colors">Edit</button><button onClick={() => handleDeleteAddress(address.id)} className="text-[#E53E3E] text-[8px] px-4 py-2 rounded-[20px] hover:bg-red-50 transition-colors">Delete</button></div></div><div className="space-y-3  text-[#00000080]"><div><span className="font-medium text-[10px]">Phone number</span><p className="text-xs font-normal text-[#000000] pt-2">{address.phone}</p></div><div className="grid grid-cols-2 gap-4"><div><span className="font-medium text-[10px]">State</span><p className="text-xs font-normal text-[#000000] pt-2">{address.state}</p></div><div><span className="font-medium text-[10px]">Local Government</span><p className="text-xs font-normal text-[#000000] pt-2">{address.lga}</p></div></div><div><span className="font-medium text-[10px]">Full Address</span><p className="text-xs font-normal text-[#000000] pt-2">{address.fullAddress}</p></div></div></div>))}<button onClick={handleAddNew} className="w-full bg-[#E53E3E] text-white py-4 rounded-lg font-medium hover:bg-red-600 transition-colors mt-6">Add New</button></div></div></div>
  );
};

export default SavedAddresses;
