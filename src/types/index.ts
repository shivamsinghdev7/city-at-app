// User Management Types
export interface User {
  id: string;
  phone?: string;
  email?: string;
  name: string;
  role: 'customer' | 'service_provider' | 'store_owner';
  profilePhoto?: string;
  addresses: Address[];
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
  // OAuth provider information
  provider?: 'phone' | 'google' | 'facebook';
  providerId?: string;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  title: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  isDefault: boolean;
}

export interface UserPreferences {
  language: string;
  notifications: NotificationPreferences;
  preferredCities: string[];
}

export interface NotificationPreferences {
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  orderUpdates: boolean;
  promotionalOffers: boolean;
  serviceReminders: boolean;
}

// Authentication Types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  phone?: string;
  email?: string;
  password?: string;
  otp?: string;
  // OAuth fields
  provider?: 'google' | 'facebook';
  accessToken?: string;
  idToken?: string;
}

export interface RegisterRequest {
  name: string;
  phone?: string;
  email?: string;
  role: User['role'];
  password?: string;
  // OAuth fields
  provider?: 'google' | 'facebook';
  accessToken?: string;
  idToken?: string;
}

// OAuth specific types
export interface OAuthUserInfo {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  provider: 'google' | 'facebook';
}

export interface OAuthTokens {
  accessToken: string;
  idToken?: string;
  refreshToken?: string;
}

// Service Provider Types
export interface ServiceProvider {
  id: string;
  userId: string;
  categories: ServiceCategory[];
  availability: Availability;
  ratings: Rating;
  portfolio: Portfolio[];
  serviceArea: ServiceArea;
  isVerified: boolean;
  isOnline: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  priceUnit: 'hour' | 'fixed' | 'sqft';
}

export interface Availability {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  start: string; // HH:MM format
  end: string; // HH:MM format
  isAvailable: boolean;
}

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  images: string[];
  serviceCategory: string;
  completedAt: Date;
}

export interface ServiceArea {
  cities: string[];
  radius: number; // in kilometers
}

// Store Types
export interface Store {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  address: Address;
  categories: string[];
  isVerified: boolean;
  isOpen: boolean;
  deliveryRadius: number;
  minimumOrder: number;
  deliveryFee: number;
  rating: Rating;
  businessHours: BusinessHours;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: string[];
  inventory: number;
  unit: string;
  barcode?: string;
  isAvailable: boolean;
  tags: string[];
}

export interface BusinessHours {
  monday: { open: string; close: string; isOpen: boolean };
  tuesday: { open: string; close: string; isOpen: boolean };
  wednesday: { open: string; close: string; isOpen: boolean };
  thursday: { open: string; close: string; isOpen: boolean };
  friday: { open: string; close: string; isOpen: boolean };
  saturday: { open: string; close: string; isOpen: boolean };
  sunday: { open: string; close: string; isOpen: boolean };
}

// Order Types
export interface Order {
  id: string;
  customerId: string;
  storeId?: string;
  serviceProviderId?: string;
  type: 'product' | 'service';
  items: OrderItem[];
  status: OrderStatus;
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  deliveryFee: number;
  discountAmount: number;
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId?: string;
  serviceId?: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 'cash' | 'card' | 'upi' | 'wallet';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

// Service Booking Types
export interface ServiceBooking {
  id: string;
  customerId: string;
  providerId: string;
  serviceCategory: string;
  description: string;
  scheduledDate: Date;
  estimatedDuration: number; // in minutes
  status: BookingStatus;
  address: Address;
  images: string[];
  quotation?: Quotation;
  actualStartTime?: Date;
  actualEndTime?: Date;
  rating?: Rating;
  paymentDetails: PaymentDetails;
}

export type BookingStatus = 
  | 'requested'
  | 'quoted'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Quotation {
  amount: number;
  description: string;
  validUntil: Date;
  isAccepted?: boolean;
}

// Rating and Review Types
export interface Rating {
  average: number;
  count: number;
  breakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface Review {
  id: string;
  userId: string;
  targetId: string; // can be store, service provider, or order
  targetType: 'store' | 'service_provider' | 'order';
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  deepLink?: string;
  imageUrl?: string;
  createdAt: Date;
}

export type NotificationType = 
  | 'order_update'
  | 'service_update'
  | 'promotional'
  | 'system'
  | 'payment'
  | 'reminder';

// Location Types
export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: Date;
}

export interface City {
  id: string;
  name: string;
  state: string;
  country: string;
  coordinates: Location;
  isServiceable: boolean;
}

// Payment Types
export interface PaymentDetails {
  method: PaymentMethod;
  transactionId?: string;
  amount: number;
  status: PaymentStatus;
  timestamp: Date;
}

// Chat Types
export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  orderId?: string;
  bookingId?: string;
  message: string;
  messageType: 'text' | 'image' | 'location';
  timestamp: Date;
  isRead: boolean;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  orderId?: string;
  bookingId?: string;
  createdAt: Date;
}

// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
  ServiceDetails: { serviceId: string };
  StoreDetails: { storeId: string };
  ProductDetails: { productId: string };
  OrderDetails: { orderId: string };
  BookingDetails: { bookingId: string };
  Chat: { roomId: string };
  Profile: undefined;
  EditProfile: undefined;
  AddAddress: undefined;
  Notifications: undefined;
  Search: { query?: string };
};

export type MainTabParamList = {
  Home: undefined;
  Services: { category?: string };
  Stores: undefined;
  Orders: undefined;
  Profile: undefined;
};

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Search Types
export interface SearchFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  location?: Location;
  radius?: number;
  rating?: number;
  availability?: boolean;
  sortBy?: 'price' | 'rating' | 'distance' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult {
  id: string;
  type: 'service' | 'product' | 'store';
  title: string;
  subtitle: string;
  image: string;
  rating: number;
  price?: number;
  distance?: number;
  isAvailable: boolean;
}