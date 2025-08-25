export interface Product {
  id: number;
  name: string;
  salePrice: string;
  originalPrice: string;
  image: string;
  store: string;
  rating: number;
  location: string;
  isSponsored?: boolean;
}

export const storeProducts: Product[] = [
  {
    id: 1,
    name: 'Dell Inspiron Laptop',
    salePrice: '₦2,000,000',
    originalPrice: '₦2,500,000',
    image: '/laptop.svg',
    store: 'Sasha Stores',
    rating: 4.5,
    location: 'Lagos, Nigeria',
    isSponsored: true
  },
  {
    id: 2,
    name: 'Dell Inspiron Laptop',
    salePrice: '₦2,000,000',
    originalPrice: '₦2,500,000',
    image: '/laptop2.svg',
    store: 'Sasha Stores',
    rating: 4.5,
    location: 'Lagos, Nigeria',
    isSponsored: true
  },
  {
    id: 3,
    name: 'Dell Inspiron Laptop',
    salePrice: '₦2,000,000',
    originalPrice: '₦2,400,000',
    image: '/laptop2.svg',
    store: 'Sasha Stores',
    rating: 4.5,
    location: 'Lagos, Nigeria',
    isSponsored: true
  },
  {
    id: 4,
    name: 'Dell Inspiron Laptop',
    salePrice: '₦2,000,000',
    originalPrice: '₦2,300,000',
    image: '/laptop.svg',
    store: 'Sasha Stores',
    rating: 4.5,
    location: 'Lagos, Nigeria',
    isSponsored: true
  },
  {
    id: 5,
    name: 'Dell Inspiron Laptop',
    salePrice: '₦2,000,000',
    originalPrice: '₦2,200,000',
    image: '/laptop.svg',
    store: 'Sasha Stores',
    rating: 4.5,
    location: 'Lagos, Nigeria',
    isSponsored: true
  },
  {
    id: 6,
    name: 'Dell Inspiron Laptop',
    salePrice: '₦2,000,000',
    originalPrice: '₦2,600,000',
    image: '/laptop2.svg',
    store: 'Sasha Stores',
    rating: 4.5,
    location: 'Lagos, Nigeria',
    isSponsored: true
  }
];

export const storeInfo = {
  name: 'Sasha Stores',
  isVerified: true,
  email: 'sashastores@gmail.com',
  phone: '07012345678',
  location: 'Lagos, Nigeria',
  categories: ['Electronics', 'Phones'],
  stats: {
    products: 100,
    customers: 500,
    rating: 4.7
  },
  isOpen: true,
  openingHours: '07:00AM - 08:00PM',
  coverImage: '/storeCoverSmall.svg',
  profileImage: '/Sasha.svg'
};
