import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import IMAGES from '../../constants';

interface SavedProduct {
  id: number;
  name: string;
  image: string;
  store: string;
  salePrice: string;
  originalPrice: string;
}

interface SavedStore {
  id: number;
  name: string;
  image: string;
  avatar: string;
  rating: number;
  categories: string[];
  location: string;
}

interface SavedPost {
  id: number;
  author: string;
  avatar: string;
  timestamp: string;
  location: string;
  caption: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
}

interface SavedService {
  id: number;
  title: string;
  price: string;
  rating: number;
  storeName: string;
  image: string;
  storeAvatar: string;
}

interface LocationOption {
  value: string;
  label: string;
}

interface CategoryOption {
  value: string;
  label: string;
}

const sampleSaved: SavedProduct[] = [
  { id: 1, name: 'Dell Inspiron Laptop', image: '/product1.svg', store: 'Sasha Stores', salePrice: '₦2,000,000', originalPrice: '₦2,500,000' },
  { id: 2, name: 'Dell Inspiron Laptop', image: '/product2.svg', store: 'Sasha Stores', salePrice: '₦2,000,000', originalPrice: '₦2,500,000' },
  { id: 3, name: 'Dell Inspiron Laptop', image: '/product3.svg', store: 'Sasha Stores', salePrice: '₦2,000,000', originalPrice: '₦2,500,000' },
  { id: 4, name: 'Dell Inspiron Laptop', image: '/product4.svg', store: 'Sasha Stores', salePrice: '₦2,000,000', originalPrice: '₦2,500,000' },
  { id: 5, name: 'Dell Inspiron Laptop', image: '/product5.svg', store: 'Sasha Stores', salePrice: '₦2,000,000', originalPrice: '₦2,500,000' },
  { id: 6, name: 'Dell Inspiron Laptop', image: '/product6.svg', store: 'Sasha Stores', salePrice: '₦2,000,000', originalPrice: '₦2,500,000' },
  { id: 7, name: 'Dell Inspiron Laptop', image: '/product7.svg', store: 'Sasha Stores', salePrice: '₦2,000,000', originalPrice: '₦2,500,000' },
  { id: 8, name: 'Dell Inspiron Laptop', image: '/product8.svg', store: 'Sasha Stores', salePrice: '₦2,000,000', originalPrice: '₦2,500,000' },
  { id: 9, name: 'Dell Inspiron Laptop', image: '/product9.svg', store: 'Sasha Stores', salePrice: '₦2,000,000', originalPrice: '₦2,500,000' },
];

const sampleStores: SavedStore[] = [
  { 
    id: 1, 
    name: 'Sasha Stores', 
    image: IMAGES.coverSasha, 
    avatar: IMAGES.sasha, 
    rating: 4.5, 
    categories: ['Electronics', 'Phones'], 
    location: 'Lagos, Nigeria' 
  },
  { 
    id: 2, 
    name: 'Vee Stores', 
    image: IMAGES.coverVee, 
    avatar: IMAGES.vee, 
    rating: 4.8, 
    categories: ['Electronics', 'Phones'], 
    location: 'Abuja, Nigeria' 
  },
  { 
    id: 3, 
    name: 'Vee Stores', 
    image: IMAGES.coverVee, 
    avatar: IMAGES.vee, 
    rating: 4.8, 
    categories: ['Electronics', 'Phones'], 
    location: 'Abuja, Nigeria' 
  },
  { 
    id: 4, 
    name: 'Adam Stores', 
    image: IMAGES.coverAdam, 
    avatar: IMAGES.adam, 
    rating: 4.2, 
    categories: ['Electronics', 'Phones'], 
    location: 'Rivers, Nigeria' 
  },
  { 
    id: 5, 
    name: 'Scent Villa Stores', 
    image: IMAGES.coverScent, 
    avatar: IMAGES.scentVilla, 
    rating: 4.7, 
    categories: ['Electronics', 'Phones'], 
    location: 'Kano, Nigeria' 
  },
  { 
    id: 6, 
    name: 'Scent Villa Stores', 
    image: IMAGES.coverScent, 
    avatar: IMAGES.scentVilla, 
    rating: 4.7, 
    categories: ['Electronics', 'Phones'], 
    location: 'Kano, Nigeria' 
  },
  { 
    id: 7, 
    name: 'Caremal Stores', 
    image: IMAGES.coverCaremal, 
    avatar: IMAGES.caremal, 
    rating: 4.3, 
    categories: ['Electronics', 'Phones'], 
    location: 'Oyo, Nigeria' 
  },
  { 
    id: 8, 
    name: 'Lovina Stores', 
    image: IMAGES.coverLovina, 
    avatar: IMAGES.lovina, 
    rating: 4.6, 
    categories: ['Electronics', 'Phones'], 
    location: 'Kaduna, Nigeria' 
  },
  { 
    id: 9, 
    name: 'Nexus Electronics', 
    image: IMAGES.coverSasha, 
    avatar: IMAGES.sasha, 
    rating: 4.4, 
    categories: ['Electronics', 'Phones'], 
    location: 'Delta, Nigeria' 
  },
];

const samplePosts: SavedPost[] = [
  {
    id: 1,
    author: 'Sasha Stores',
    avatar: IMAGES.sasha,
    timestamp: '30 min ago',
    location: 'Lagos, Nigeria',
    caption: 'Get this phone at a cheap price for a limited period',
    image: IMAGES.feedPhone,
    likes: 500,
    comments: 26,
    shares: 26,
    isLiked: false,
  },
];

const sampleServices: SavedService[] = [
  {
    id: 1,
    title: "Fashion designing Service",
    price: "₦5,000 - ₦100,000",
    rating: 4.5,
    storeName: "Sasha Stores",
    image: IMAGES.storeImg,
    storeAvatar: IMAGES.ellipseStore,
  },
  {
    id: 2,
    title: "Fashion designing Service",
    price: "₦5,000 - ₦100,000",
    rating: 4.5,
    storeName: "Sasha Stores",
    image: IMAGES.storeImg,
    storeAvatar: IMAGES.ellipseStore,
  },
  {
    id: 3,
    title: "Fashion designing Service",
    price: "₦5,000 - ₦100,000",
    rating: 4.5,
    storeName: "Sasha Stores",
    image: IMAGES.storeImg,
    storeAvatar: IMAGES.ellipseStore,
  },
  {
    id: 4,
    title: "Fashion designing Service",
    price: "₦5,000 - ₦100,000",
    rating: 4.5,
    storeName: "Sasha Stores",
    image: IMAGES.storeImg,
    storeAvatar: IMAGES.ellipseStore,
  },
  {
    id: 5,
    title: "Fashion designing Service",
    price: "₦5,000 - ₦100,000",
    rating: 4.5,
    storeName: "Sasha Stores",
    image: IMAGES.storeImg,
    storeAvatar: IMAGES.ellipseStore,
  },
  {
    id: 6,
    title: "Fashion designing Service",
    price: "₦5,000 - ₦100,000",
    rating: 4.5,
    storeName: "Sasha Stores",
    image: IMAGES.storeImg,
    storeAvatar: IMAGES.ellipseStore,
  },
  {
    id: 7,
    title: "Fashion designing Service",
    price: "₦5,000 - ₦100,000",
    rating: 4.5,
    storeName: "Sasha Stores",
    image: IMAGES.storeImg,
    storeAvatar: IMAGES.ellipseStore,
  },
  {
    id: 8,
    title: "Fashion designing Service",
    price: "₦5,000 - ₦100,000",
    rating: 4.5,
    storeName: "Sasha Stores",
    image: IMAGES.storeImg,
    storeAvatar: IMAGES.ellipseStore,
  },
  {
    id: 9,
    title: "Fashion designing Service",
    price: "₦5,000 - ₦100,000",
    rating: 4.5,
    storeName: "Sasha Stores",
    image: IMAGES.storeImg,
    storeAvatar: IMAGES.ellipseStore,
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
  { value: "toys", label: "Toys & Games" },
];

// Location Dropdown Component - can be removed in cleanup

// Category Dropdown Component - can be removed in cleanup

// Post Card Component
const PostCard = ({ post }: { post: SavedPost }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div className="rounded-2xl overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.avatar}
            alt={post.author}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">
              {post.author}
            </h3>
            <p className="text-sm text-gray-500">
              {post.location} • {post.timestamp}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Post Caption */}
      <div className="px-4 pb-3">
        <p className="text-gray-800">{post.caption}</p>
      </div>

      {/* Post Image */}
      <div className="relative">
        <img
          src={post.image}
          alt="Post"
          className="w-146 h-98 rounded-t-[30px] rounded-b-[10px] object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="flex items-center space-x-2"
            >
              <svg
                className={`w-6 h-6 ${
                  isLiked
                    ? "text-red-500 fill-current"
                    : "text-gray-600"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-sm font-medium">
                {likesCount}
              </span>
            </button>

            <button className="flex items-center space-x-2">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-sm font-medium">
                {post.comments}
              </span>
            </button>

            <button className="flex items-center space-x-2">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
              <span className="text-sm font-medium">
                {post.shares}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Store Card Component
const StoreCard = ({ store }: { store: SavedStore }) => {
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

        {/* Go to Shop Button */}
        <button className="block w-full bg-[#E53E3E] text-white text-[8px] py-2.5 rounded-xl font-[400] hover:bg-red-600 transition-colors text-center">
          Go to Shop
        </button>
      </div>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ service }: { service: SavedService }) => {
  const handleDetailsClick = () => {
    // Navigate to service details if needed
    console.log('Navigate to service details:', service.id);
  };

  return (
    <div className="bg-white rounded-[20px] border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      {/* Service Image */}
      <div className="relative">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-[118px] object-cover"
        />
        <div className="flex items-center py-[4px] px-2 bg-[#F2F2F2] gap-2 ">
          <img
            src={service.storeAvatar}
            alt={service.storeName}
            className="w-[14px] h-[14px] rounded-full"
          />
          <span className="text-[8px] text-[#E53E3E]">{service.storeName}</span>
          <div className="flex items-center gap-1 ml-auto">
            <img src={IMAGES.starFilled} alt="star" className="w-[9px] h-[9px]" />
            <span className="text-[8px] text-gray-600">{service.rating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-0 pb-2">
        {/* Service Title */}
        <h3 className=" text-base text-black mb-1 text-[10px]">
          {service.title}
        </h3>

        {/* Price */}
        <p className="text-red-500 font-semibold text-[12px] mb-1">
          {service.price}
        </p>

        {/* Details Button */}
        <button 
          onClick={handleDetailsClick}
          className="w-full bg-[#E53E3E] text-white rounded-lg py-2.5 text-[8px] hover:bg-red-600 transition-colors"
        >
          Details
        </button>
      </div>
    </div>
  );
};

const tabs = ['Products', 'Services', 'Stores', 'Posts'] as const;
 type Tab = typeof tabs[number];

const SavedItems: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Products');
  const [query, setQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredProducts = sampleSaved.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  const filteredStores = sampleStores.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));
  const filteredServices = sampleServices.filter(s => s.title.toLowerCase().includes(query.toLowerCase()) || s.storeName.toLowerCase().includes(query.toLowerCase()));
  const filteredPosts = samplePosts.filter(p => 
    p.author.toLowerCase().includes(query.toLowerCase()) || 
    p.caption.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex-1 p-9 bg-white rounded-[20px]">
      <div className="max-w-[1080px] mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Saved Items</h1>
        {/* Tabs */}
        <div className="flex justify-between mb-6 text-sm font-medium">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-8 py-3 rounded-[7px] font-normal text-[10px] ${activeTab === t ? 'bg-[#E53E3E] text-white' : 'text-gray-600'}`}
            >
              {t}
            </button>
          ))}
        </div>
        {/* Search - Hidden for Posts tab */}
        {activeTab !== 'Posts' && (
          <div className="mb-6">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={`Search ${activeTab === 'Products' ? 'Product' : activeTab === 'Stores' ? 'Store' : activeTab === 'Services' ? 'Service' : 'Item'}`}
              className="w-full px-4 py-4 border border-gray-200 rounded-[20px] "
            />
          </div>
        )}
        {/* Filters row - Hidden for Posts tab */}
        {activeTab !== 'Posts' && (
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
          </div>
        )}
        {/* Grid */}
        {activeTab === 'Products' && (
          <div className="grid grid-cols-3 gap-4">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
        {activeTab === 'Services' && (
          <div className="grid grid-cols-3 gap-4">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
        {activeTab === 'Stores' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredStores.map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        )}
        {activeTab === 'Posts' && (
          <div className="space-y-6">
            {filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
        {activeTab !== 'Products' && activeTab !== 'Services' && activeTab !== 'Stores' && activeTab !== 'Posts' && (
          <div className="text-gray-500 text-sm py-20 text-center">No saved items yet.</div>
        )}
      </div>
    </div>
  );
};

export default SavedItems;
