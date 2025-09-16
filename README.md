# City At - Smart City Services App

A comprehensive React Native application connecting local service providers with customers, featuring location-based services, real-time notifications, and multi-vendor marketplace functionality.

## 🚀 Features

### Core Functionality
- **User Authentication**: Phone/Email registration with OTP verification and role-based access
- **Location Services**: Auto-detect user location with manual city selection fallback
- **Smart Notifications**: Real-time push notifications with FCM integration
- **Multi-role Support**: Customer, Service Provider, and Store Owner accounts

### Services Marketplace
- **Service Categories**: Plumbing, Electrical, Cleaning, Painting, Carpentry, AC Repair
- **Provider Listings**: Detailed profiles with ratings, reviews, and portfolios
- **Real-time Booking**: Service booking with time slot selection
- **Live Tracking**: Real-time service provider location tracking
- **Communication**: In-app chat and calling features

### Kirana Store & E-commerce
- **Store Listings**: Local kirana stores, pharmacies, vegetable marts
- **Product Catalog**: Browse products with categories and inventory
- **Shopping Cart**: Add to cart with store-specific ordering
- **Delivery Options**: Home delivery and store pickup
- **Order Management**: Track orders with live delivery updates

### Advanced Features
- **Search & Discovery**: Global search across services and products
- **Real-time Updates**: Live order tracking and notifications
- **Review System**: Rate and review services and stores
- **Multiple Payment Options**: Support for various payment methods
- **Location-based Filtering**: Services and stores based on user location

## 🛠 Technical Stack

### Frontend
- **React Native 0.81.4** with TypeScript
- **React Navigation v6** for navigation
- **Redux Toolkit** with RTK Query for state management
- **React Native Vector Icons** for UI icons
- **React Native Maps** for location services

### State Management
- **Redux Toolkit**: Centralized state management
- **RTK Query**: API calls and caching
- **Custom Slices**: Auth, Location, Notifications, Cart

## 🚀 Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Prerequisites
- Node.js (>=20)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shivamsinghdev7/city-at-app.git
   cd city-at-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (iOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## 📱 App Features

### Authentication Flow
- **Splash Screen**: App initialization with branding
- **Onboarding**: Feature introduction with swipeable slides
- **Login Screen**: Phone/email login with OTP
- **Registration**: Account creation with role selection
- **OTP Verification**: Secure phone number verification

### Main Application
- **Home Screen**: Quick access to services and stores with location selection
- **Services**: Browse and book service providers by category
- **Stores**: Shop from local kirana stores and pharmacies
- **Orders**: Track orders and service bookings with real-time updates
- **Notifications**: Real-time alerts and updates

### Key Features Implemented
- Location-based city selection with GPS detection
- Real-time notifications with badge counters
- Service provider marketplace with booking system
- Kirana store listings with category filtering
- Comprehensive order tracking and management
- Professional UI with status indicators and interactive elements

## 🔧 Development Commands

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run linting
npm run lint

# Run tests
npm test

# TypeScript type checking
npx tsc --noEmit
```

## 📋 Project Structure

```
src/
├── components/           # Reusable UI components
├── navigation/          # Navigation configuration
├── screens/             # Application screens
├── store/              # Redux store configuration
├── services/           # Business logic services
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Step 3: Explore the app

Now that you have successfully run the app, explore the features:

1. **Splash & Onboarding**: See the app introduction
2. **Authentication**: Try the login/register flow with role selection
3. **Home Screen**: Tap on location to select your city
4. **Services**: Browse service categories and providers
5. **Stores**: Explore local kirana stores
6. **Orders**: View order tracking interface
7. **Notifications**: Check the notification system (demo notifications appear after 5 seconds)

The app demonstrates a complete smart city services platform with professional UI and comprehensive functionality.

## 🤝 Contributing

This is a comprehensive React Native smart city services app implementation. The codebase includes:

- Complete authentication system with OTP verification
- Location services with city selection
- Service marketplace with booking functionality
- Kirana store listings and e-commerce foundation
- Order management and tracking
- Real-time notifications system
- Professional UI/UX with TypeScript support

## Congratulations! :tada:

You've successfully set up the City At smart city services app! :partying_face:

### Next Steps

- Explore the implemented features
- Customize the service categories and providers
- Add your backend API endpoints
- Configure Firebase for notifications
- Enhance the UI with your branding

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

---

Built with ❤️ using React Native and TypeScript