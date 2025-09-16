import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';
import {
  User,
  LoginRequest,
  RegisterRequest,
  ApiResponse,
  PaginatedResponse,
  ServiceProvider,
  Store,
  Product,
  Order,
  ServiceBooking,
  Notification,
  Review,
  SearchResult,
  SearchFilters,
  City,
} from '../../types';

// Base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [
    'User',
    'ServiceProvider',
    'Store',
    'Product',
    'Order',
    'ServiceBooking',
    'Notification',
    'Review',
    'City',
  ],
  endpoints: (builder) => ({
    // Authentication endpoints
    login: builder.mutation<
      ApiResponse<{ user: User; token: string; refreshToken: string }>,
      LoginRequest
    >({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),

    register: builder.mutation<
      ApiResponse<{ user: User; token: string; refreshToken: string }>,
      RegisterRequest
    >({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    verifyOtp: builder.mutation<
      ApiResponse<{ token: string; refreshToken: string }>,
      { phone: string; otp: string }
    >({
      query: (data) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),

    refreshToken: builder.mutation<
      ApiResponse<{ token: string; refreshToken: string }>,
      { refreshToken: string }
    >({
      query: (data) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: data,
      }),
    }),

    // OAuth endpoints
    googleLogin: builder.mutation<
      ApiResponse<{ user: User; token: string; refreshToken: string }>,
      { accessToken: string; idToken: string }
    >({
      query: (data) => ({
        url: '/auth/google',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    facebookLogin: builder.mutation<
      ApiResponse<{ user: User; token: string; refreshToken: string }>,
      { accessToken: string }
    >({
      query: (data) => ({
        url: '/auth/facebook',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // User endpoints
    getProfile: builder.query<ApiResponse<User>, void>({
      query: () => '/users/profile',
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation<ApiResponse<User>, Partial<User>>({
      query: (userData) => ({
        url: '/users/profile',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    // Location endpoints
    getCities: builder.query<ApiResponse<City[]>, { search?: string }>({
      query: ({ search }) => ({
        url: '/locations/cities',
        params: search ? { search } : {},
      }),
      providesTags: ['City'],
    }),

    // Service Provider endpoints
    getServiceProviders: builder.query<
      ApiResponse<PaginatedResponse<ServiceProvider>>,
      {
        category?: string;
        location?: { latitude: number; longitude: number };
        page?: number;
        limit?: number;
      }
    >({
      query: (params) => ({
        url: '/services/providers',
        params,
      }),
      providesTags: ['ServiceProvider'],
    }),

    getServiceProvider: builder.query<ApiResponse<ServiceProvider>, string>({
      query: (id) => `/services/providers/${id}`,
      providesTags: (result, error, id) => [{ type: 'ServiceProvider', id }],
    }),

    createServiceBooking: builder.mutation<ApiResponse<ServiceBooking>, Partial<ServiceBooking>>({
      query: (booking) => ({
        url: '/services/bookings',
        method: 'POST',
        body: booking,
      }),
      invalidatesTags: ['ServiceBooking'],
    }),

    getServiceBookings: builder.query<
      ApiResponse<PaginatedResponse<ServiceBooking>>,
      { page?: number; limit?: number; status?: string }
    >({
      query: (params) => ({
        url: '/services/bookings',
        params,
      }),
      providesTags: ['ServiceBooking'],
    }),

    // Store endpoints
    getStores: builder.query<
      ApiResponse<PaginatedResponse<Store>>,
      {
        location?: { latitude: number; longitude: number };
        category?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: (params) => ({
        url: '/stores',
        params,
      }),
      providesTags: ['Store'],
    }),

    getStore: builder.query<ApiResponse<Store>, string>({
      query: (id) => `/stores/${id}`,
      providesTags: (result, error, id) => [{ type: 'Store', id }],
    }),

    getStoreProducts: builder.query<
      ApiResponse<PaginatedResponse<Product>>,
      { storeId: string; category?: string; page?: number; limit?: number }
    >({
      query: ({ storeId, ...params }) => ({
        url: `/stores/${storeId}/products`,
        params,
      }),
      providesTags: ['Product'],
    }),

    getProduct: builder.query<ApiResponse<Product>, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    // Order endpoints
    createOrder: builder.mutation<ApiResponse<Order>, Partial<Order>>({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Order'],
    }),

    getOrders: builder.query<
      ApiResponse<PaginatedResponse<Order>>,
      { page?: number; limit?: number; status?: string }
    >({
      query: (params) => ({
        url: '/orders',
        params,
      }),
      providesTags: ['Order'],
    }),

    getOrder: builder.query<ApiResponse<Order>, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),

    updateOrderStatus: builder.mutation<
      ApiResponse<Order>,
      { orderId: string; status: string }
    >({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: (result, error, { orderId }) => [{ type: 'Order', id: orderId }],
    }),

    // Notification endpoints
    getNotifications: builder.query<
      ApiResponse<PaginatedResponse<Notification>>,
      { page?: number; limit?: number }
    >({
      query: (params) => ({
        url: '/notifications',
        params,
      }),
      providesTags: ['Notification'],
    }),

    markNotificationAsRead: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'PUT',
      }),
      invalidatesTags: ['Notification'],
    }),

    // Review endpoints
    createReview: builder.mutation<ApiResponse<Review>, Partial<Review>>({
      query: (review) => ({
        url: '/reviews',
        method: 'POST',
        body: review,
      }),
      invalidatesTags: ['Review'],
    }),

    getReviews: builder.query<
      ApiResponse<PaginatedResponse<Review>>,
      { targetId: string; targetType: string; page?: number; limit?: number }
    >({
      query: (params) => ({
        url: '/reviews',
        params,
      }),
      providesTags: ['Review'],
    }),

    // Search endpoints
    search: builder.query<
      ApiResponse<PaginatedResponse<SearchResult>>,
      { query: string; filters?: SearchFilters; page?: number; limit?: number }
    >({
      query: (params) => ({
        url: '/search',
        params,
      }),
    }),

    // Payment endpoints
    initiatePayment: builder.mutation<
      ApiResponse<{ paymentId: string; amount: number; currency: string }>,
      { orderId: string; amount: number; method: string }
    >({
      query: (data) => ({
        url: '/payments/initiate',
        method: 'POST',
        body: data,
      }),
    }),

    verifyPayment: builder.mutation<
      ApiResponse<{ status: string; transactionId: string }>,
      { paymentId: string; signature: string }
    >({
      query: (data) => ({
        url: '/payments/verify',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  // Authentication
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useRefreshTokenMutation,
  useGoogleLoginMutation,
  useFacebookLoginMutation,

  // User
  useGetProfileQuery,
  useUpdateProfileMutation,

  // Location
  useGetCitiesQuery,

  // Service Providers
  useGetServiceProvidersQuery,
  useGetServiceProviderQuery,
  useCreateServiceBookingMutation,
  useGetServiceBookingsQuery,

  // Stores
  useGetStoresQuery,
  useGetStoreQuery,
  useGetStoreProductsQuery,
  useGetProductQuery,

  // Orders
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderStatusMutation,

  // Notifications
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,

  // Reviews
  useCreateReviewMutation,
  useGetReviewsQuery,

  // Search
  useSearchQuery,

  // Payments
  useInitiatePaymentMutation,
  useVerifyPaymentMutation,
} = apiSlice;