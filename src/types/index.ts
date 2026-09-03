export type CategoryType = 'all' | 'deals' | 'burgers' | 'pizza' | 'chicken' | 'fries' | 'sides' | 'drinks' | 'combos';

export interface CustomizationOptions {
  pattyCount: number; // 1, 2, 3
  cheeseType: 'american' | 'smoked_cheddar' | 'ghost_pepper';
  sauceLevel: 'mild' | 'blaze' | 'inferno';
  bunType: 'toasted_brioche' | 'charcoal_black' | 'lettuce_wrap';
  addOns: string[];
  specialInstructions?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryType;
  tagline: string;
  description: string;
  price: number;
  heatLevel: 0 | 1 | 2 | 3; // 0: None, 1: Warm, 2: Spicy, 3: Fiery Inferno
  image: string;
  isSignature?: boolean;
  calories?: number;
  badge?: string;
  inStock: boolean;
  customizable?: boolean;
  ingredients?: string[];
  metrics?: {
    crunch: number;
    heat: number;
    juiciness: number;
    smokiness: number;
  };
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  customization?: CustomizationOptions;
  quantity: number;
  itemTotal: number;
}

export type OrderStatus = 'received' | 'grilling' | 'out_for_delivery' | 'delivered';

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  deliveryType: 'delivery' | 'pickup';
  pickupLocation?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  estimatedMinutes: number;
  paymentMethod: 'card' | 'apple_pay' | 'cash';
}

export interface StoreLocation {
  id: string;
  name: string;
  area: string;
  address: string;
  hours: string;
  phone: string;
  status: string;
  tag: string;
  latLng: string;
}

export interface Review {
  id: string;
  author: string;
  handle: string;
  rating: number;
  quote: string;
  favoriteItem: string;
  verified: boolean;
}
