import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { storesData, formatRating } from "../stores/storesData";
import IMAGES from "../../constants";
import ProductCard from "../../components/ProductCard";

// Social Feed Post Interface
interface SocialFeedPost {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  caption: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
}

// Generate social feed posts for store
const generateStoreSocialFeed = (
  storeName: string,
  storeAvatar: string
): SocialFeedPost[] => {
  return [
    {
      id: "1",
      author: storeName,
      avatar: storeAvatar,
      timestamp: "30 min ago",
      caption: "Get this phone at a cheap price for a limited period",
      image: IMAGES.feedPhone || "/top1.png",
      likes: 500,
      comments: 26,
      shares: 26,
      isLiked: false,
    },
    {
      id: "2",
      author: storeName,
      avatar: storeAvatar,
      timestamp: "2h ago",
      caption:
        "New arrivals in store! Check out our latest collection of premium products with amazing deals.",
      image: IMAGES.feedPhone || "/top2.png",
      likes: 320,
      comments: 18,
      shares: 12,
      isLiked: false,
    },
    {
      id: "3",
      author: storeName,
      avatar: storeAvatar,
      timestamp: "1 day ago",
      caption:
        "Special weekend offer! Limited time only. Don't miss out on these incredible discounts.",
      image: IMAGES.feedPhone || "/top3.png",
      likes: 780,
      comments: 45,
      shares: 32,
      isLiked: true,
    },
  ];
};

// Generate store reviews data
const generateStoreReviews = (storeName: string, storeAvatar: string) => {
  return [
    {
      id: "1",
      author: "Adam Sandler",
      avatar: IMAGES.adam,
      timestamp: "07-16-25/05:33AM",
      rating: 5,
      text: "The store is great",
      replyCount: 0,
      replies: [],
    },
    {
      id: "2",
      author: "Adam Sandler",
      avatar: IMAGES.adam,
      timestamp: "07-16-25/05:33AM",
      rating: 5,
      text: "Really great product, i bought from your store",
      replyCount: 1,
      replies: [
        {
          id: "reply-1",
          author: storeName,
          avatar: storeAvatar,
          timestamp: "07-16-25/05:33AM",
          text: "Thanks for the review",
        },
      ],
    },
  ];
};

// Generate services based on store data
const generateStoreServices = (
  services: string[],
  storeName: string,
  categories: string[]
) => {
  return services.map((service, index) => {
    // Determine service image and pricing based on service type and category
    let serviceImage = "/top1.png";
    let basePrice = 5000;
    let serviceName = service;

    // Customize based on service name
    if (service.includes("Delivery") || service.includes("delivery")) {
      serviceImage = "/top2.png";
      basePrice = 2000;
    } else if (service.includes("Support") || service.includes("support")) {
      serviceImage = "/top3.png";
      basePrice = 1500;
    } else if (
      service.includes("Design") ||
      service.includes("design") ||
      service.includes("Styling")
    ) {
      serviceImage = "/top4.png";
      basePrice = 15000;
    } else if (
      service.includes("Installation") ||
      service.includes("Assembly")
    ) {
      serviceImage = "/top5.png";
      basePrice = 8000;
    } else if (service.includes("Training") || service.includes("Coaching")) {
      serviceImage = "/top6.png";
      basePrice = 10000;
    }

    // Add category-based pricing adjustments
    if (categories.includes("Beauty") || categories.includes("Fashion")) {
      basePrice = basePrice * 1.2;
    } else if (
      categories.includes("Electronics") ||
      categories.includes("Gaming")
    ) {
      basePrice = basePrice * 1.5;
    } else if (
      categories.includes("Home") ||
      categories.includes("Furniture")
    ) {
      basePrice = basePrice * 1.3;
    }

    const originalPrice = Math.round(basePrice * 1.3);

    return {
      id: index + 1000, // Offset to avoid conflicts with products
      name: serviceName,
      salePrice: `₦${basePrice.toLocaleString()}`,
      originalPrice: `₦${originalPrice.toLocaleString()}`,
      image: serviceImage,
      store: storeName,
    };
  });
};

// Generate sample products based on store category
const generateStoreProducts = (
  storeId: string,
  storeName: string,
  categories: string[]
) => {
  const baseProducts = [
    {
      id: 1,
      name: "Dell Inspiron Laptop",
      salePrice: "₦2,000,000",
      originalPrice: "₦2,500,000",
      image: "/top1.png",
    },
    {
      id: 2,
      name: "Samsung Galaxy Phone",
      salePrice: "₦800,000",
      originalPrice: "₦1,000,000",
      image: "/top2.png",
    },
    {
      id: 3,
      name: "HP Printer",
      salePrice: "₦150,000",
      originalPrice: "₦200,000",
      image: "/top3.png",
    },
    {
      id: 4,
      name: "iPhone 14 Pro",
      salePrice: "₦1,200,000",
      originalPrice: "₦1,500,000",
      image: "/top4.png",
    },
    {
      id: 5,
      name: "MacBook Air",
      salePrice: "₦1,800,000",
      originalPrice: "₦2,200,000",
      image: "/top5.png",
    },
    {
      id: 6,
      name: "Sony Headphones",
      salePrice: "₦45,000",
      originalPrice: "₦65,000",
      image: "/top6.png",
    },
  ];

  // Customize products based on store categories
  if (categories.includes("Beauty") || categories.includes("Fragrances")) {
    return [
      {
        ...baseProducts[0],
        name: "Premium Perfume Set",
        salePrice: "₦25,000",
        originalPrice: "₦35,000",
      },
      {
        ...baseProducts[1],
        name: "Skincare Bundle",
        salePrice: "₦18,000",
        originalPrice: "₦25,000",
      },
      {
        ...baseProducts[2],
        name: "Makeup Kit Pro",
        salePrice: "₦35,000",
        originalPrice: "₦50,000",
      },
      {
        ...baseProducts[3],
        name: "Hair Care Set",
        salePrice: "₦20,000",
        originalPrice: "₦28,000",
      },
      {
        ...baseProducts[4],
        name: "Body Lotion Collection",
        salePrice: "₦15,000",
        originalPrice: "₦22,000",
      },
      {
        ...baseProducts[5],
        name: "Facial Cleanser",
        salePrice: "₦12,000",
        originalPrice: "₦20,000",
      },
    ].map((product) => ({ ...product, store: storeName }));
  }

  if (categories.includes("Grocery") || categories.includes("Food")) {
    return [
      {
        ...baseProducts[0],
        name: "Organic Rice 10kg",
        salePrice: "₦8,000",
        originalPrice: "₦10,000",
      },
      {
        ...baseProducts[1],
        name: "Fresh Vegetables",
        salePrice: "₦3,500",
        originalPrice: "₦4,500",
      },
      {
        ...baseProducts[2],
        name: "Dairy Products",
        salePrice: "₦2,500",
        originalPrice: "₦3,200",
      },
      {
        ...baseProducts[3],
        name: "Meat Package",
        salePrice: "₦15,000",
        originalPrice: "₦18,000",
      },
      {
        ...baseProducts[4],
        name: "Fruits Basket",
        salePrice: "₦5,000",
        originalPrice: "₦6,500",
      },
      {
        ...baseProducts[5],
        name: "Spices Set",
        salePrice: "₦4,000",
        originalPrice: "₦5,500",
      },
    ].map((product) => ({ ...product, store: storeName }));
  }

  if (categories.includes("Home") || categories.includes("Furniture")) {
    return [
      {
        ...baseProducts[0],
        name: "Sofa Set",
        salePrice: "₦250,000",
        originalPrice: "₦320,000",
      },
      {
        ...baseProducts[1],
        name: "Dining Table",
        salePrice: "₦80,000",
        originalPrice: "₦120,000",
      },
      {
        ...baseProducts[2],
        name: "Bed Frame",
        salePrice: "₦65,000",
        originalPrice: "₦85,000",
      },
      {
        ...baseProducts[3],
        name: "Wardrobe",
        salePrice: "₦90,000",
        originalPrice: "₦130,000",
      },
      {
        ...baseProducts[4],
        name: "Office Chair",
        salePrice: "₦35,000",
        originalPrice: "₦45,000",
      },
      {
        ...baseProducts[5],
        name: "Coffee Table",
        salePrice: "₦25,000",
        originalPrice: "₦35,000",
      },
    ].map((product) => ({ ...product, store: storeName }));
  }

  if (categories.includes("Sports") || categories.includes("Fitness")) {
    return [
      {
        ...baseProducts[0],
        name: "Treadmill",
        salePrice: "₦180,000",
        originalPrice: "₦250,000",
      },
      {
        ...baseProducts[1],
        name: "Dumbbells Set",
        salePrice: "₦25,000",
        originalPrice: "₦35,000",
      },
      {
        ...baseProducts[2],
        name: "Yoga Mat Premium",
        salePrice: "₦8,000",
        originalPrice: "₦12,000",
      },
      {
        ...baseProducts[3],
        name: "Exercise Bike",
        salePrice: "₦120,000",
        originalPrice: "₦160,000",
      },
      {
        ...baseProducts[4],
        name: "Protein Supplements",
        salePrice: "₦15,000",
        originalPrice: "₦20,000",
      },
      {
        ...baseProducts[5],
        name: "Fitness Tracker",
        salePrice: "₦35,000",
        originalPrice: "₦45,000",
      },
    ].map((product) => ({ ...product, store: storeName }));
  }

  if (categories.includes("Gaming")) {
    return [
      {
        ...baseProducts[0],
        name: "Gaming Console",
        salePrice: "₦450,000",
        originalPrice: "₦550,000",
      },
      {
        ...baseProducts[1],
        name: "Gaming Headset",
        salePrice: "₦35,000",
        originalPrice: "₦45,000",
      },
      {
        ...baseProducts[2],
        name: "Mechanical Keyboard",
        salePrice: "₦25,000",
        originalPrice: "₦35,000",
      },
      {
        ...baseProducts[3],
        name: "Gaming Mouse",
        salePrice: "₦15,000",
        originalPrice: "₦22,000",
      },
      {
        ...baseProducts[4],
        name: "Game Controllers",
        salePrice: "₦28,000",
        originalPrice: "₦38,000",
      },
      {
        ...baseProducts[5],
        name: "Gaming Chair",
        salePrice: "₦85,000",
        originalPrice: "₦120,000",
      },
    ].map((product) => ({ ...product, store: storeName }));
  }

  // Default Electronics/Computing products
  return baseProducts.map((product) => ({ ...product, store: storeName }));
};

// Helper function to get category colors
const getCategoryColor = (category: string) => {
  const colorMap: Record<string, string> = {
    Electronics: "bg-[#0000FF33] text-[#0000FF] border-[#0000FF]",
    Phones: "bg-[#FF000033] text-[#FF0000] border-[#FF0000]",
    Computing: "bg-[#00FFFF33] text-[#00FFFF] border-[#00FFFF]",
    Fashion: "bg-[#FF69B433] text-[#FF69B4] border-[#FF69B4]",
    Clothing: "bg-[#FF69B433] text-[#FF69B4] border-[#FF69B4]",
    Accessories: "bg-[#DDA0DD33] text-[#DDA0DD] border-[#DDA0DD]",
    Beauty: "bg-[#FFB6C133] text-[#FFB6C1] border-[#FFB6C1]",
    Fragrances: "bg-[#E6E6FA33] text-[#E6E6FA] border-[#E6E6FA]",
    Grocery: "bg-[#32CD3233] text-[#32CD32] border-[#32CD32]",
    Food: "bg-[#FFA50033] text-[#FFA500] border-[#FFA500]",
    Home: "bg-[#DEB88733] text-[#DEB887] border-[#DEB887]",
    Furniture: "bg-[#8B451333] text-[#8B4513] border-[#8B4513]",
    Sports: "bg-[#00800033] text-[#008000] border-[#008000]",
    Fitness: "bg-[#FF634733] text-[#FF6347] border-[#FF6347]",
    Gaming: "bg-[#80008033] text-[#800080] border-[#800080]",
  };
  return colorMap[category] || "bg-gray-200 text-gray-700 border-gray-400";
};

const FollowedStoreDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    location: "",
  });
  const [socialPosts, setSocialPosts] = useState<SocialFeedPost[]>([]);
  const [showStoreAddresses, setShowStoreAddresses] = useState(false);

  // Find the store by ID
  const store = storesData.find((s) => s.id === id);

  // Generate products based on store data
  const storeProducts = store
    ? generateStoreProducts(store.id, store.name, store.categories)
    : [];

  // Generate services based on store data
  const storeServices = store
    ? generateStoreServices(store.services, store.name, store.categories)
    : [];

  // Generate social feed posts
  const storeSocialPosts = store
    ? generateStoreSocialFeed(store.name, store.avatar)
    : [];

  // Generate store reviews
  const storeReviews = store
    ? generateStoreReviews(store.name, store.avatar)
    : [];

  // Initialize social posts
  React.useEffect(() => {
    if (store) {
      setSocialPosts(storeSocialPosts);
    }
  }, [store]);

  // Handle social post like
  const handleSocialLike = (postId: string) => {
    setSocialPosts(
      socialPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  // Handle back navigation - go back to followed stores
  const handleBack = () => {
    navigate("/settings/followed-stores");
  };

  // Handle add to cart
  const handleAddToCart = (productId: number) => {
    console.log(`Added product ${productId} to cart from ${store?.name}`);
    // Add your cart logic here
  };

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      category: "",
      brand: "",
      location: "",
    });
  };

  // Apply filters (you can add filtering logic here)
  const handleApplyFilters = () => {
    console.log("Applying filters:", filters);
    setShowFilter(false);
  };

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Store Not Found
          </h2>
          <p className="text-gray-600">
            The store you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1080px] mx-auto pt-6">
        {/* Breadcrumb */}
        <div className="px-4 py-4">
          <div className="flex items-center text-[25px] text-gray-500 mb-2">
            <span>Followed Stores</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{store.name}</span>
          </div>
        </div>

        <div className="flex gap-6 px-4">
          {/* Left Side - Store Info */}
          <div className="max-w-108 ">
            {/* Store Header Card */}
            <div className=" rounded-[20px] overflow-hidden mb-6">
              {/* Store Cover Image */}
              <div className="relative ">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-[430px] h-[145px] rounded-[20px] object-cover"
                />
                {/* Back Button */}
                <button
                  onClick={handleBack}
                  className="absolute top-4 left-4  w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                {/* Share Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-700"
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
                </button>
              </div>

              {/* Store Info */}
              <div className="  pt-2">
                {/* Store Avatar and Follow Button Row */}
                <div className="flex items-start justify-between mb-4">
                  {/* Left side: Avatar and Status */}
                  <div className="flex items-start space-x-2">
                    {/* Store Avatar */}
                    <div className="relative -mt-10">
                      <img
                        src={store.avatar}
                        alt={store.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white"
                      />
                    </div>
                    {/* Status */}
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          store.isOpen ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <span
                        className={`text-[10px] ${
                          store.isOpen ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {store.isOpen
                          ? `Open Now - ${store.openTime} - ${store.closeTime}`
                          : "Closed"}
                      </span>
                    </div>
                  </div>

                  {/* Unfollow Button (Right side) - Changed from Follow */}
                  <button className="bg-gray-500 text-white px-8 py-2 rounded-[10px] text-[10px] font-medium hover:bg-gray-600 transition-colors">
                    Unfollow
                  </button>
                </div>

                {/* Store Name and Verification */}
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-[16px] font-medium text-gray-900">
                    {store.name}
                  </h1>
                  <div className=" rounded-full flex items-center justify-center">
                    {store.isVerified && (
                      <img
                        src={IMAGES.verification}
                        alt="Verified"
                        className="w-6 h-6"
                      />
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-[12px] font-medium">
                      {store.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-[12px] font-medium">
                      {store.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-[12px] font-medium">
                      {store.location}{" "}
                    </span>
                    <button
                      onClick={() => setShowStoreAddresses(true)}
                      className="text-[#E53E3E] text-xs font-medium underline"
                    >
                      View Store Addresses
                    </button>
                  </div>
                  <div className="mb-4 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">Category </span>
                    {store.categories.map((category, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 text-[10px] rounded-[5px] ml-2 border-[0.5px] ${getCategoryColor(
                          category
                        )}`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats Container */}
                <div className="bg-white rounded-[20px] shadow-xl flex justify-between items-center px-6 py-4 relative  z-10">
                  {/* Qty Sold */}
                  <div className="flex items-center gap-2">
                    <img src={IMAGES.Shop} alt="Shop" className="w-6 h-6" />
                    <div>
                      <p className="text-[6px] text-gray-500">Qty Sold</p>
                      <p className="text-sm font-normal text-gray-900">
                        {store.qtySold}
                      </p>
                    </div>
                  </div>

                  {/* Followers */}
                  <div className="flex items-center gap-2">
                    <img
                      src={IMAGES.profile}
                      alt="Profile"
                      className="w-6 h-6"
                    />
                    <div>
                      <p className="text-[6px] text-gray-500">Followers</p>
                      <p className="text-sm font-normal text-gray-900">
                        {store.followers}
                      </p>
                    </div>
                  </div>

                  {/* Ratings */}
                  <div className="flex items-center gap-2">
                    <img
                      src={IMAGES.starBlack}
                      alt="Star"
                      className="w-6 h-6"
                    />
                    <div>
                      <p className="text-[6px] text-gray-500">Ratings</p>
                      <p className="text-sm font-normal text-gray-900">
                        {formatRating(store.rating)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Announcement Bar */}
                <div className="bg-[#E53E3E] text-white rounded-b-[20px]  py-2 -mt-4 z-0 shadow-md">
                  <div className="flex items-center pt-2 px-4 gap-2">
                    <img
                      src={IMAGES.megaphone}
                      alt="Megaphone"
                      className="w-5 h-5"
                    />
                    <p className="text-[10px] font-normal">
                      {store.announcement}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Social Links */}
            <div className="flex gap-1 border border-[#CDCDCD] p-1 rounded-[10px] mb-4 bg-white">
              <button className=" rounded-lg flex items-center justify-center">
                <img
                  src={IMAGES.whatsappIcon}
                  className="w-[43px] h-[43px]"
                  alt=""
                />
              </button>
              <button className=" rounded-lg flex items-center justify-center">
                <img
                  src={IMAGES.instagram}
                  className="w-[43px] h-[43px]"
                  alt=""
                />
              </button>
              <button className=" rounded-lg flex items-center justify-center">
                <img src={IMAGES.x} className="w-[43px] h-[43px]" alt="" />
              </button>
              <button className=" rounded-lg flex items-center justify-center">
                <img
                  src={IMAGES.facebook}
                  className="w-[43px] h-[43px]"
                  alt=""
                />
              </button>
            </div>
            {/* Promotional Banner */}
            <div className="bg-[#921313] rounded-2xl px-5 py-3 text-white mb-6 relative overflow-hidden">
              <div className="flex  justify-between relative z-10">
                <div className="flex-1">
                  <h3 className="text-white text-[20px] font-semibold ">
                    Shop with ease on
                  </h3>
                  <h2
                    className="text-white text-[30px] font-bold italic mb-3"
                    style={{ fontFamily: "cursive" }}
                  >
                    {store.name}
                  </h2>
                  <p className="text-white text-[10px] opacity-90 mb-4 max-w-xs">
                    {store.description}
                  </p>
                  <button className="bg-white text-red-500 px-6 py-2 rounded-xl font-medium text-sm hover:bg-gray-100 transition-colors">
                    Shop Now
                  </button>
                </div>
                <div className="flex-shrink-0 ">
                  <img
                    src={IMAGES.grocery1}
                    alt="Shopping bag with groceries"
                    className="w-42 h-42 object-contain"
                  />
                </div>
              </div>
              {/* Background decoration circles */}
              <div className="absolute bottom-0 left-0 w-[267px] h-[199px] bg-[#F22C2C] rounded-full translate-y-22 -translate-x-14"></div>
              <div className="absolute top-0 left-0 w-[267px] h-[199px] bg-[#F22C2C] rounded-full -translate-y-41 -translate-x-28"></div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <a
                href={`tel:${store.phone}`}
                className="w-full bg-[#E53E3E] text-white py-3 rounded-[15px] text-xs hover:bg-red-600 transition-colors block text-center"
              >
                Call
              </a>
              <a
                href={`mailto:${store.email}`}
                className="w-full bg-black text-white py-3 rounded-[15px] text-xs hover:bg-gray-800 transition-colors block text-center"
              >
                Chat
              </a>
              <button className="w-full bg-[#008000] text-white py-3 rounded-[15px] text-xs hover:bg-green-600 transition-colors">
                Leave a store review
              </button>
            </div>
          </div>

          {/* Right Side - Products/Services/Posts */}
          <div className="flex-1">
            {/* Tabs and Search */}
            <div className=" rounded-2xl p-6 px-2 ">
              {/* Tabs */}
              <div className="flex gap-6 mb-6">
                <button
                  onClick={() => setActiveTab("products")}
                  className={`px-10 py-4 rounded-lg font-[400] text-[10px] transition-colors ${
                    activeTab === "products"
                      ? "bg-red-500 text-white"
                      : "text-gray-600 bg-white hover:text-gray-900"
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => setActiveTab("services")}
                  className={`px-10 py-4 rounded-lg font-[400] text-[10px] transition-colors ${
                    activeTab === "services"
                      ? "bg-red-500 text-white"
                      : "text-gray-600 bg-white hover:text-gray-900"
                  }`}
                >
                  Services
                </button>
                <button
                  onClick={() => setActiveTab("socialFeed")}
                  className={`px-10 py-4 rounded-lg font-[400] text-[10px] transition-colors ${
                    activeTab === "socialFeed"
                      ? "bg-red-500 text-white"
                      : "text-gray-600 bg-white hover:text-gray-900"
                  }`}
                >
                  Social Feed
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-10 py-4 rounded-lg font-[400] text-[10px] transition-colors ${
                    activeTab === "reviews"
                      ? "bg-red-500 text-white"
                      : "text-gray-600 bg-white hover:text-gray-900"
                  }`}
                >
                  Reviews
                </button>
              </div>

              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder={`Search store ${
                      activeTab === "services" ? "services" : "products"
                    }`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full  border border-[#AFAFAF]  rounded-xl p-5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
                <button
                  onClick={() => setShowFilter(true)}
                  className=" border border-[#AFAFAF] hover:bg-gray-200 transition-colors rounded-xl px-[30px] py-[18px] flex items-center justify-center"
                >
                  <img src={IMAGES.funnel} alt="Filter" className="w-6 h-6" />
                </button>

                {/* Filter Dropdown - positioned beneath the filter button */}
                {showFilter && (
                  <>
                    {/* Backdrop to close modal when clicking outside */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowFilter(false)}
                    />
                    {/* Filter dropdown */}
                    <div
                      className="absolute top-full -right-5 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50"
                      style={{ width: "430px", height: "260px" }}
                    >
                      <div className="p-6 h-full flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Filter Products
                        </h3>
                        
                        <div className="flex-1 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Category
                            </label>
                            <select
                              value={filters.category}
                              onChange={(e) =>
                                handleFilterChange("category", e.target.value)
                              }
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                              <option value="">All Categories</option>
                              <option value="Electronics">Electronics</option>
                              <option value="Fashion">Fashion</option>
                              <option value="Beauty">Beauty</option>
                              <option value="Home">Home</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Brand
                            </label>
                            <select
                              value={filters.brand}
                              onChange={(e) =>
                                handleFilterChange("brand", e.target.value)
                              }
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                              <option value="">All Brands</option>
                              <option value="Samsung">Samsung</option>
                              <option value="Apple">Apple</option>
                              <option value="HP">HP</option>
                              <option value="Dell">Dell</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Location
                            </label>
                            <select
                              value={filters.location}
                              onChange={(e) =>
                                handleFilterChange("location", e.target.value)
                              }
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                              <option value="">All Locations</option>
                              <option value="Lagos">Lagos</option>
                              <option value="Abuja">Abuja</option>
                              <option value="Kano">Kano</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={handleClearFilters}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                          >
                            Clear
                          </button>
                          <button
                            onClick={handleApplyFilters}
                            className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === "products" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {storeProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={() => handleAddToCart(product.id)}
                      />
                    ))}
                  </div>
                )}

                {activeTab === "services" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {storeServices.map((service) => (
                      <ProductCard
                        key={service.id}
                        product={service}
                        onAddToCart={() => handleAddToCart(service.id)}
                      />
                    ))}
                  </div>
                )}

                {activeTab === "socialFeed" && (
                  <div className="space-y-6">
                    {socialPosts.map((post) => (
                      <div key={post.id} className=" rounded-2xl overflow-hidden">
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
                                Lagos, Nigeria • {post.timestamp}
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
                                onClick={() => handleSocialLike(post.id)}
                                className="flex items-center space-x-2"
                              >
                                <svg
                                  className={`w-6 h-6 ${
                                    post.isLiked
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
                                  {post.likes}
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
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className=" rounded-2xl ">
                    {/* Review Tabs */}
                    <div className="flex gap-8 mb-8 border-b border-gray-200">
                      <button className="pb-3 text-red-500 font-medium text-base border-b-2 border-red-500">
                        Store Reviews
                      </button>
                      <button className="pb-3 text-gray-500 font-medium text-base hover:text-gray-700">
                        Product Reviews
                      </button>
                    </div>

                    {/* Rating Summary */}
                    <div className="text-center mb-8 bg-white rounded-[20px] p-4 pt-10 shadow-lg">
                      {/* Large Stars */}
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-12 h-12 ${
                              star <= 4 ? "text-red-500" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Rating Text */}
                      <div className="flex items-center justify-between">
                        <span className="text-red-500 text-lg font-medium">
                          4 Stars
                        </span>
                        <span className="text-red-500 text-lg font-medium">
                          3 Reviews
                        </span>
                      </div>
                    </div>

                    {/* Review Cards */}
                    <div className="space-y-6">
                      {storeReviews.map((review) => (
                        <div key={review.id} className="bg-[#F5F5F5] rounded-xl">
                          {/* Upper div - Avatar, Name, Stars */}
                          <div className="flex items-center space-x-3 p-4 pb-2">
                            <img
                              src={review.avatar}
                              alt={review.author}
                              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-semibold text-gray-900 text-base">
                                  {review.author}
                                </h4>
                                <span className="text-sm text-gray-500">
                                  {review.timestamp}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= review.rating
                                        ? "text-red-500"
                                        : "text-gray-300"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Lower div - Review text and reply */}
                          <div className="px-4 pb-4">
                            <p className="text-gray-800 text-base mb-4">
                              {review.text}
                            </p>
                            <div className="flex items-center space-x-2">
                              <img
                                src={IMAGES.reply}
                                alt="Reply"
                                className="w-5 h-5"
                              />
                              <span className="text-sm text-gray-600">
                                {review.replyCount}
                              </span>
                              <input
                                type="text"
                                placeholder=""
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-400 ml-4"
                              />
                              {review.id === "1" && (
                                <img
                                  src={IMAGES.paperPlaneRight}
                                  alt="Send"
                                  className="w-5 h-5"
                                />
                              )}
                            </div>

                            {/* Store Replies */}
                            {review.replies && review.replies.length > 0 && (
                              <div className="mt-4 space-y-3">
                                {review.replies.map((reply) => (
                                  <div
                                    key={reply.id}
                                    className="flex items-start space-x-3 ml-6"
                                  >
                                    <img
                                      src={reply.avatar}
                                      alt={reply.author}
                                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <h5 className="font-medium text-gray-900 text-sm">
                                          {reply.author}
                                        </h5>
                                        <span className="text-xs text-gray-500">
                                          {reply.timestamp}
                                        </span>
                                      </div>
                                      <p className="text-gray-700 text-sm">
                                        {reply.text}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Addresses Modal */}
      {showStoreAddresses && (
        <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 relative pop_up">
              <h2 className="text-xl font-semibold text-gray-900 mx-auto">
                Store Addresses
              </h2>
              <button
                onClick={() => setShowStoreAddresses(false)}
                className="absolute right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-6">
              {[
                {
                  id: 1,
                  label: "Address 1",
                  isMain: true,
                  wednesdayTime: "08:00 AM - 07:00PM",
                  wednesdayTextColor: "text-gray-900",
                },
                {
                  id: 2,
                  label: "Address 2",
                  isMain: false,
                  wednesdayTime: "08:00 AM - 01:00PM",
                  wednesdayTextColor: "text-red-500",
                },
              ].map((address, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden shadow-sm border border-gray-200"
                >
                  {/* Upper Div - Address Title & Button */}
                  <div className="bg-[#E53E3E] px-4 py-3 pb-6 flex items-center -mb-2 justify-between rounded-t-2xl">
                    <span className="text-white font-normal text-sm">
                      {address.label}
                    </span>
                    <button className="bg-white text-red-500 text-[10px] font-medium px-4 py-1 rounded-full hover:bg-gray-50 transition-colors">
                      View on Map
                    </button>
                  </div>

                  {/* Lower Div - All Other Data */}
                  <div className="bg-white p-4 space-y-4 rounded-2xl -mt-3 relative">
                    {/* Main Office Tag */}
                    {address.isMain && (
                      <div className="flex justify-start absolute right-3">
                        <span className="inline-block text-xs font-medium bg-[#FF000033] text-[#FF0000] border border-[#FF0000] px-3 py-1 rounded-[5px]">
                          Main Office
                        </span>
                      </div>
                    )}

                    {/* Address Info */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-normal text-[#00000080]">
                          State
                        </label>
                        <p className="text-gray-900 text-sm">Lagos</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-normal text-[#00000080]">
                          Local Government
                        </label>
                        <p className="text-gray-900 text-sm">Ikeja</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-normal text-[#00000080]">
                          Full Address
                        </label>
                        <p className="text-gray-900 text-sm">
                          No 2, abcdefght street , opposite abc building, acd
                          bus stop, ikeja
                        </p>
                      </div>
                    </div>

                    {/* Opening Hours */}
                    <div className="bg-[#FFEEEE] rounded-lg px-4 py-3">
                      <div className="flex items-center gap-2 mb-3">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <h3 className="font-medium text-sm text-gray-900">
                          Opening Hours
                        </h3>
                      </div>

                      <div className="space-y-1 text-[10px]">
                        {[
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                        ].map((day) => (
                          <div key={day} className="flex items-center justify-between mr-33">
                            <span
                              className={
                                day === "Wednesday" && !address.isMain
                                  ? address.wednesdayTextColor
                                  : "text-gray-600"
                              }
                            >
                              {day}
                            </span>
                            <span
                              className={
                                day === "Wednesday" && !address.isMain
                                  ? address.wednesdayTextColor
                                  : "text-gray-900"
                              }
                            >
                              {day === "Wednesday" && !address.isMain
                                ? address.wednesdayTime
                                : "08:00 AM - 07:00PM"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowedStoreDetail;
