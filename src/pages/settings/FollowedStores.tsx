import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IMAGES from '../../constants';

interface FollowedStore {
  id: string;  // Changed from number to string to match storesData
  name: string;
  image: string;
  avatar: string;
  rating: number;
  categories: string[];
  location: string;
}

interface LocationOption {
  value: string;
  label: string;
}

interface CategoryOption {
  value: string;
  label: string;
}

const followedStores: FollowedStore[] = [
  { 
    id: "1", 
    name: 'Sasha Stores', 
    image: IMAGES.coverSasha, 
    avatar: IMAGES.sasha, 
    rating: 4.5, 
    categories: ['Electronics', 'Phones'], 
    location: 'Lagos, Nigeria' 
  },
  { 
    id: "2", 
    name: 'Vee Stores', 
    image: IMAGES.coverVee, 
    avatar: IMAGES.vee, 
    rating: 4.8, 
    categories: ['Electronics', 'Phones'], 
    location: 'Abuja, Nigeria' 
  },
  { 
    id: "3", 
    name: 'Vee Stores', 
    image: IMAGES.coverVee, 
    avatar: IMAGES.vee, 
    rating: 4.8, 
    categories: ['Electronics', 'Phones'], 
    location: 'Abuja, Nigeria' 
  },
  { 
    id: "4", 
    name: 'Adam Stores', 
    image: IMAGES.coverAdam, 
    avatar: IMAGES.adam, 
    rating: 4.2, 
    categories: ['Electronics', 'Phones'], 
    location: 'Rivers, Nigeria' 
  },
  { 
    id: "5", 
    name: 'Scent Villa Stores', 
    image: IMAGES.coverScent, 
    avatar: IMAGES.scentVilla, 
    rating: 4.7, 
    categories: ['Electronics', 'Phones'], 
    location: 'Kano, Nigeria' 
  },
  { 
    id: "6", 
    name: 'Scent Villa Stores', 
    image: IMAGES.coverScent, 
    avatar: IMAGES.scentVilla, 
    rating: 4.7, 
    categories: ['Electronics', 'Phones'], 
    location: 'Kano, Nigeria' 
  },
  { 
    id: "7", 
    name: 'Caremal Stores', 
    image: IMAGES.coverCaremal, 
    avatar: IMAGES.caremal, 
    rating: 4.3, 
    categories: ['Electronics', 'Phones'], 
    location: 'Oyo, Nigeria' 
  },
  { 
    id: "8", 
    name: 'Lovina Stores', 
    image: IMAGES.coverLovina, 
    avatar: IMAGES.lovina, 
    rating: 4.6, 
    categories: ['Electronics', 'Phones'], 
    location: 'Kaduna, Nigeria' 
  },
  { 
    id: "1", 
    name: 'Nexus Electronics', 
    image: IMAGES.coverSasha, 
    avatar: IMAGES.sasha, 
    rating: 4.4, 
    categories: ['Electronics', 'Phones'], 
    location: 'Delta, Nigeria' 
  },
];

// Dummy location data
const locationOptions: LocationOption[] = [
  { value: "", label: "Location" },
  { value: "lagos", label: "Lagos State" },
  { value: "abuja", label: "Abuja (FCT)" },
  { value: "rivers", label: "Rivers State" },
  { value: "kano", label: "Kano State" },
  { value: "oyo", label: "Oyo State" },
  { value: "kaduna", label: "Kaduna State" },
  { value: "delta", label: "Delta State" },
  { value: "edo", label: "Edo State" },
  { value: "anambra", label: "Anambra State" },
  { value: "imo", label: "Imo State" },
];

// Dummy category data
const categoryOptions: CategoryOption[] = [
  { value: "", label: "Category" },
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion & Clothing" },
  { value: "home", label: "Home & Garden" },
  { value: "computing", label: "Computing" },
  { value: "phones", label: "Phones & Tablets" },
  { value: "automotive", label: "Automotive" },
  { value: "beauty", label: "Health & Beauty" },
  { value: "sports", label: "Sports & Fitness" },
  { value: "books", label: "Books & Media" },
];

// Store Card Component
const StoreCard = ({ store }: { store: FollowedStore }) => {
  const navigate = useNavigate();
  
  const handleVisitShop = () => {
    navigate(`/stores/followed-stores/${store.id}`);
  };

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow max-w-47">
      {/* Store Image */}
      <div className="relative">
        <img
          src={store.image}
          alt={store.name}
          className="w-47 h-22 object-cover"
        />
        {/* Store Avatar */}
        <div className="absolute -bottom-6 left-4">
          <img
            src={store.avatar}
            alt={`${store.name} avatar`}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Store Info */}
      <div className="pt-7 pb-4 px-3">
        {/* Store Name and Rating */}
        <div className="flex items-center justify-between mb-[6px]">
          <h3 className="font-medium text-gray-900 text-sm">{store.name}</h3>
          <div className="flex items-center">
            <img src={IMAGES.starFilled} alt="Star" className="w-[9px] h-[9px] mr-1" />
            <span className="text-[8px] font-[400] text-gray-600">{store.rating}</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-2.5">
          {store.categories.map((category, index) => (
            <span
              key={index}
              className={`px-1.5 py-0.5 w-auto h-auto text-[8px] rounded-[5px] ${
                category === "Electronics"
                  ? "bg-[#0000FF33] border border-[#0000FF] text-[#0000FF]"
                  : "bg-[#FF000033] text-[#E53E3E] border border-[#E53E3E]"
              }`}
            >
              {category}
            </span>
          ))}
        </div>

        {/* Visit Shop Button */}
        <button 
          onClick={handleVisitShop}
          className="block w-full bg-[#E53E3E] text-white text-[8px] py-2.5 rounded-xl font-[400] hover:bg-red-600 transition-colors text-center"
        >
          Visit Shop
        </button>
      </div>
    </div>
  );
};

const FollowedStores: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredStores = followedStores.filter(store => 
    store.name.toLowerCase().includes(query.toLowerCase()) ||
    store.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex-1 p-9 bg-white rounded-[20px]">
      <div className="max-w-[1080px] mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Followed Stores</h1>
        
        {/* Search */}
        <div className="mb-6">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search Product"
            className="w-full px-4 py-4 border border-gray-200 rounded-[20px] "
          />
        </div>
        
        {/* Filters row */}
        <div className="flex gap-4 mb-6">
          {/* Location Filter */}
          <div className="relative ">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="appearance-none w-[190px] bg-gray-200 border-0 rounded-xl px-4 py-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-0 focus:bg-gray-300 transition-colors  cursor-pointer"
            >
              {locationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="relative ">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none w-[190px] bg-gray-200 border-0 rounded-xl px-4 py-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-0 focus:bg-gray-300 transition-colors  cursor-pointer"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Category Filter (Second one as shown in image) */}
          <div className="relative ">
            <select
              className="appearance-none w-[190px] bg-gray-200 border-0 rounded-xl px-4 py-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-0 focus:bg-gray-300 transition-colors  cursor-pointer"
            >
              <option>Category</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredStores.map(store => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowedStores;
