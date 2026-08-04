export type FlowerCategory = 
  | 'All' 
  | 'Roses' 
  | 'Peonies' 
  | 'Tulips' 
  | 'Orchids' 
  | 'Lilies' 
  | 'Hydrangeas' 
  | 'Sunflowers' 
  | 'Mixed Bouquets';

export type AvailabilityStatus = 'In Stock' | 'Pre-Order' | 'Limited Season' | 'Out of Stock';

export interface Flower {
  id: string;
  title: string;
  description: string; // Strictly one concise line
  price: number;
  originalPrice?: number;
  category: FlowerCategory;
  availability: AvailabilityStatus;
  rating: number;
  reviewCount: number;
  ordersCount: number;
  stock: number;
  isHot?: boolean;
  isFeatured?: boolean;
  imageUrl: string;
  flowerColor: string;
  stemCount: number;
  tags: string[];
}

export interface CartItem {
  flower: Flower;
  quantity: number;
  selectedVase: boolean;
  customNote?: string;
}

export interface Review {
  id: string;
  authorName: string;
  avatarUrl: string;
  rating: number;
  date: string;
  comment: string;
  flowerTitle: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  recipientName: string;
  shippingAddress: string;
  deliveryDate: string;
  cardLast4: string;
  status: 'Processing' | 'Preparing Blooms' | 'Out for Delivery' | 'Delivered';
  trackingNumber: string;
}

export interface FilterState {
  category: FlowerCategory;
  maxPrice: number;
  availability: 'All' | AvailabilityStatus;
  sortBy: 'popular' | 'price-low' | 'price-high' | 'rating';
  searchQuery: string;
}
