import React, { useState } from 'react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectState: (state: string) => void;
  onSelectLGA?: (lga: string) => void;
  mode?: 'state' | 'lga';
  selectedState?: string;
}

const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  onSelectState,
  onSelectLGA,
  mode = 'state',
  selectedState
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // LGA data for states
  const localGovernments: { [key: string]: string[] } = {
    'Lagos State': [
      'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
      'Badagry', 'Epe', 'Eti Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
      'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
      'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'
    ],
    'FCT, Abuja': [
      'Abaji', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Municipal Area Council'
    ],
    'Kano State': [
      'Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure',
      'Dala', 'Dambatta', 'Dawakin Kudu', 'Dawakin Tofa', 'Doguwa',
      'Fagge', 'Gabasawa', 'Garko', 'Garun Mallam', 'Gaya', 'Gezawa',
      'Gwale', 'Gwarzo', 'Kabo', 'Kano Municipal', 'Karaye', 'Kibiya',
      'Kiru', 'Kumbotso', 'Kunchi', 'Kura', 'Madobi', 'Makoda',
      'Minjibir', 'Nasarawa', 'Rano', 'Rimin Gado', 'Rogo', 'Shanono',
      'Sumaila', 'Takai', 'Tarauni', 'Tofa', 'Tsanyawa', 'Tudun Wada',
      'Ungogo', 'Warawa', 'Wudil'
    ],
    'Rivers State': [
      'Abua/Odual', 'Ahoada East', 'Ahoada West', 'Akuku-Toru', 'Andoni',
      'Asari-Toru', 'Bonny', 'Degema', 'Eleme', 'Emuoha', 'Etche',
      'Gokana', 'Ikwerre', 'Khana', 'Obio/Akpor', 'Ogba/Egbema/Ndoni',
      'Ogu/Bolo', 'Okrika', 'Omuma', 'Opobo/Nkoro', 'Oyigbo', 'Port Harcourt', 'Tai'
    ],
    'Oyo State': [
      'Afijio', 'Akinyele', 'Atiba', 'Atisbo', 'Egbeda', 'Ibadan North',
      'Ibadan North-East', 'Ibadan North-West', 'Ibadan South-East', 'Ibadan South-West',
      'Ibarapa Central', 'Ibarapa East', 'Ibarapa North', 'Ido', 'Irepo',
      'Iseyin', 'Itesiwaju', 'Iwajowa', 'Kajola', 'Lagelu', 'Ogbomoso North',
      'Ogbomoso South', 'Ogo Oluwa', 'Olorunsogo', 'Oluyole', 'Ona Ara',
      'Orelope', 'Ori Ire', 'Oyo East', 'Oyo West', 'Saki East', 'Saki West', 'Surulere'
    ],
    'Kaduna State': [
      'Birnin Gwari', 'Chikun', 'Giwa', 'Igabi', 'Ikara', 'Jaba',
      'Jema\'a', 'Kachia', 'Kaduna North', 'Kaduna South', 'Kagarko', 'Kajuru',
      'Kaura', 'Kauru', 'Kubau', 'Kudan', 'Lere', 'Makarfi',
      'Sabon Gari', 'Sanga', 'Soba', 'Zangon Kataf', 'Zaria'
    ],
    'Anambra State': [
      'Aguata', 'Anambra East', 'Anambra West', 'Anaocha', 'Awka North',
      'Awka South', 'Ayamelum', 'Dunukofia', 'Ekwusigo', 'Idemili North',
      'Idemili South', 'Ihiala', 'Njikoka', 'Nnewi North', 'Nnewi South',
      'Ogbaru', 'Onitsha North', 'Onitsha South', 'Orumba North', 'Orumba South', 'Oyi'
    ]
    // Add more states and their LGAs as needed
  };

  const nigerianStates = [
    { name: 'Abia State', count: '5000 products' },
    { name: 'Adamawa State', count: '5000 products' },
    { name: 'Akwa Ibom State', count: '5000 products' },
    { name: 'Anambra State', count: '5000 products' },
    { name: 'Bauchi State', count: '5000 products' },
    { name: 'Bayelsa State', count: '5000 products' },
    { name: 'Benue State', count: '5000 products' },
    { name: 'Borno State', count: '5000 products' },
    { name: 'Cross River State', count: '5000 products' },
    { name: 'Delta State', count: '5000 products' },
    { name: 'Ebonyi State', count: '5000 products' },
    { name: 'Edo State', count: '5000 products' },
    { name: 'Ekiti State', count: '5000 products' },
    { name: 'Enugu State', count: '5000 products' },
    { name: 'FCT, Abuja', count: '5000 products' },
    { name: 'Gombe State', count: '5000 products' },
    { name: 'Imo State', count: '5000 products' },
    { name: 'Jigawa State', count: '5000 products ' },
    { name: 'Kaduna State', count: '5000 products' },
    { name: 'Kano State', count: '5000 products' },
    { name: 'Katsina State', count: '5000 products' },
    { name: 'Kebbi State', count: '5000 products' },
    { name: 'Kogi State', count: '5000 products' },
    { name: 'Kwara State', count: '5000 products' },
    { name: 'Lagos State', count: '5000 products' },
    { name: 'Nasarawa State', count: '5000 products' },
    { name: 'Niger State', count: '5000 products' },
    { name: 'Ogun State', count: '5000 products' },
    { name: 'Ondo State', count: '5000 products' },
    { name: 'Osun State', count: '5000 products' },
    { name: 'Oyo State', count: '5000 products' },
    { name: 'Plateau State', count: '5000 products' },
    { name: 'Rivers State', count: '5000 products' },
    { name: 'Sokoto State', count: '5000 products' },
    { name: 'Taraba State', count: '5000 products' },
    { name: 'Yobe State', count: '5000 products' },
    { name: 'Zamfara State', count: '5000 products' }
  ];

  const popularStates = [
    { name: 'All Locations', count: '5000 products' },
    { name: 'Lagos State', count: '5000 products' },
    { name: 'Oyo State', count: '5000 products' },
    { name: 'FCT, Abuja', count: '5000 products' },
    { name: 'Rivers State', count: '5000 products' }
  ];

  // Get current data based on mode
  const getCurrentData = () => {
    if (mode === 'lga' && selectedState) {
      const lgas = localGovernments[selectedState] || [];
      return lgas.map(lga => ({ name: lga, count: '100 locations' }));
    }
    return nigerianStates;
  };

  const currentData = getCurrentData();

  const filteredData = currentData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemSelect = (itemName: string) => {
    if (mode === 'lga' && onSelectLGA) {
      onSelectLGA(itemName);
    } else {
      onSelectState(itemName);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <style>
        {`
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
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: transparent;
          }
        `}
      </style>
      <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-[430px] h-[650px] flex flex-col">
        {/* Header */}
        <div className="flex items-center  justify-center pop_up relative p-6 pb-4 mb-4">
          <h2 className="text-[20px] ml-36 -mt-2 font-bold text-[#000000]">Location</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
           <img src="/public/Vector.svg" alt="Close" className="w-5 h-5 -mt-4 ml-75" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 -mt-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl text-[12px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Content */}
        <div 
          className="flex-1 overflow-y-auto custom-scrollbar"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'transparent transparent'
          }}
        >
          {!searchTerm && mode === 'state' && (
            <>
              {/* Popular Section */}
              <div className="px-4 pb-4 -mt-1 mr-3">
                <h3 className="text-[14px] font-medium text-[#000000] mb-3">Popular</h3>
                <div className="space-y-1">
                  {popularStates.map((state, index) => (
                    <button
                      key={index}
                      onClick={() => handleItemSelect(state.name)}
                      className="w-[390px] h-[50px] flex items-center justify-between py-3 px-2 bg-[#EDEDED] rounded-lg transition-colors text-left"
                    >
                      <div>
                        <div className="text-[12px] text-[#000000] font-medium">{state.name}</div>
                        <div className="text-[8px] text-gray-500">{state.count}</div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {!searchTerm && (
            <>
              {/* All States/LGAs Section */}
              <div className="px-4 -mt-5 pt-4">
                <h3 className="text-[14px] font-medium text-[#000000] mb-3">
                  {mode === 'lga' ? 'Local Government Areas' : 'All States'}
                </h3>
                <div className="space-y-1">
                  {currentData.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleItemSelect(item.name)}
                      className="w-[390px] h-[50px] flex items-center justify-between py-3 px-2 bg-[#EDEDED] rounded-lg transition-colors text-left"
                    >
                      <div>
                        <div className="text-[12px] text-[#000000] font-medium">{item.name}</div>
                        <div className="text-[8px] text-gray-500">{item.count}</div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Search Results */}
          {searchTerm && (
            <div className="px-4">
              <h3 className="text-[14px] font-medium text-[#000000] mb-3">Search Results</h3>
              <div className="space-y-1">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleItemSelect(item.name)}
                      className="w-full flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                    >
                      <div>
                        <div className="text-[14px] text-[#000000] font-medium">{item.name}</div>
                        <div className="text-[12px] text-gray-500">{item.count}</div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <div className="text-[14px] text-gray-500">No {mode === 'lga' ? 'LGAs' : 'states'} found matching "{searchTerm}"</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
      </div>
    </>
  );
};

export default LocationModal;
