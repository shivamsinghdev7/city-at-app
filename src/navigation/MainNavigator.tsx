import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { MainTabParamList, RootStackParamList } from '../types';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import ServicesScreen from '../screens/services/ServicesScreen';
import StoresScreen from '../screens/stores/StoresScreen';
import OrdersScreen from '../screens/orders/OrdersScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// Additional screens
import ServiceDetailsScreen from '../screens/services/ServiceDetailsScreen';
import ServicesListScreen from '../screens/services/ServicesListScreen';
import StoreDetailsScreen from '../screens/stores/StoreDetailsScreen';
import ProductDetailsScreen from '../screens/stores/ProductDetailsScreen';
import OrderDetailsScreen from '../screens/orders/OrderDetailsScreen';
import BookingDetailsScreen from '../screens/services/BookingDetailsScreen';
import ChatScreen from '../screens/ChatScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import SearchScreen from '../screens/SearchScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import AddAddressScreen from '../screens/profile/AddAddressScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainTabNavigator: React.FC = () => {
  const { unreadCount } = useSelector((state: RootState) => state.notifications);
  const { itemCount } = useSelector((state: RootState) => state.cart);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Services':
              iconName = 'build';
              break;
            case 'Stores':
              iconName = 'store';
              break;
            case 'Orders':
              iconName = 'shopping-bag';
              break;
            case 'Profile':
              iconName = 'person';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarBadge: 
          route.name === 'Orders' && itemCount > 0 ? itemCount :
          route.name === 'Profile' && unreadCount > 0 ? unreadCount :
          undefined,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Stores" component={StoresScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen 
        name="Main" 
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ServiceDetails" 
        component={ServiceDetailsScreen}
        options={{ title: 'Service Details' }}
      />
      <Stack.Screen 
        name="ServicesList" 
        component={ServicesListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="StoreDetails" 
        component={StoreDetailsScreen}
        options={{ title: 'Store Details' }}
      />
      <Stack.Screen 
        name="ProductDetails" 
        component={ProductDetailsScreen}
        options={{ title: 'Product Details' }}
      />
      <Stack.Screen 
        name="OrderDetails" 
        component={OrderDetailsScreen}
        options={{ title: 'Order Details' }}
      />
      <Stack.Screen 
        name="BookingDetails" 
        component={BookingDetailsScreen}
        options={{ title: 'Booking Details' }}
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{ title: 'Chat' }}
      />
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{ title: 'Notifications' }}
      />
      <Stack.Screen 
        name="Search" 
        component={SearchScreen}
        options={{ title: 'Search' }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{ title: 'Edit Profile' }}
      />
      <Stack.Screen 
        name="AddAddress" 
        component={AddAddressScreen}
        options={{ title: 'Add Address' }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;