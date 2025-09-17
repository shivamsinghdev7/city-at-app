import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../types';

type StoreDetailsRouteProp = RouteProp<RootStackParamList, 'StoreDetails'>;
type StoreDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'StoreDetails'
>;

interface Store {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  distance: string;
  isOpen: boolean;
  deliveryTime: string;
  deliveryFee: string;
  image: string;
  description: string;
  address: string;
  phone: string;
  services: string[];
  businessHours: string;
}

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  inStock: boolean;
}

const StoreDetailsScreen: React.FC = () => {
  const route = useRoute<StoreDetailsRouteProp>();
  const navigation = useNavigation<StoreDetailsNavigationProp>();
  const [selectedTab, setSelectedTab] = useState<'products' | 'info' | 'reviews'>('products');

  // Mock store data
  const store: Store = {
    id: route.params.storeId,
    name: 'Sharma Kirana Store',
    category: 'Grocery & Essentials',
    rating: 4.5,
    reviewCount: 128,
    distance: '1.2 km away',
    isOpen: true,
    deliveryTime: '15-30 min',
    deliveryFee: 'Free delivery on ₹200+',
    image: '🏪',
    description: 'Fresh groceries, daily essentials, and household items. Serving the community for over 15 years.',
    address: '123 Main Street, Sector 12, Delhi - 110001',
    phone: '+91 98765 43210',
    services: ['Home Delivery', 'Online Payment', 'Fresh Vegetables', 'Daily Essentials'],
    businessHours: 'Mon-Sun: 7:00 AM - 10:00 PM',
  };

  const products: Product[] = [
    {
      id: '1',
      name: 'Fresh Tomatoes',
      price: '₹40/kg',
      originalPrice: '₹50/kg',
      image: '🍅',
      category: 'Vegetables',
      inStock: true,
    },
    {
      id: '2',
      name: 'Milk (1L)',
      price: '₹55',
      image: '🥛',
      category: 'Dairy',
      inStock: true,
    },
    {
      id: '3',
      name: 'Bread',
      price: '₹25',
      image: '🍞',
      category: 'Bakery',
      inStock: false,
    },
    {
      id: '4',
      name: 'Rice (5kg)',
      price: '₹300',
      originalPrice: '₹350',
      image: '🍚',
      category: 'Grains',
      inStock: true,
    },
  ];

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
      activeOpacity={0.8}
    >
      <View style={styles.productImage}>
        <Text style={styles.productEmoji}>{item.image}</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{item.price}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          )}
        </View>
        {!item.inStock && (
          <Text style={styles.outOfStock}>Out of Stock</Text>
        )}
      </View>
      <TouchableOpacity style={[
        styles.addButton,
        !item.inStock && styles.addButtonDisabled
      ]}>
        <Icon name="add" size={20} color={item.inStock ? "#FFFFFF" : "#BDC3C7"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'products':
        return (
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            style={styles.productsList}
          />
        );
      case 'info':
        return (
          <View style={styles.infoContainer}>
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Services</Text>
              <View style={styles.servicesList}>
                {store.services.map((service, index) => (
                  <View key={index} style={styles.serviceItem}>
                    <Icon name="check-circle" size={16} color="#27AE60" />
                    <Text style={styles.serviceText}>{service}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Contact Information</Text>
              <Text style={styles.infoText}>📍 {store.address}</Text>
              <Text style={styles.infoText}>📞 {store.phone}</Text>
              <Text style={styles.infoText}>🕒 {store.businessHours}</Text>
            </View>
          </View>
        );
      case 'reviews':
        return (
          <View style={styles.reviewsContainer}>
            <Text style={styles.comingSoon}>Reviews coming soon...</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.storeImageLarge}>
          <Text style={styles.storeEmojiLarge}>{store.image}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.storeName}>{store.name}</Text>
          <Text style={styles.storeCategory}>{store.category}</Text>
          <View style={styles.storeStats}>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={16} color="#F39C12" />
              <Text style={styles.rating}>{store.rating}</Text>
              <Text style={styles.reviewCount}>({store.reviewCount})</Text>
            </View>
            <Text style={styles.distance}>📍 {store.distance}</Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusDot,
              store.isOpen ? styles.statusDotOpen : styles.statusDotClosed
            ]} />
            <Text style={[
              styles.statusText,
              store.isOpen ? styles.statusTextOpen : styles.statusTextClosed
            ]}>
              {store.isOpen ? 'Open Now' : 'Closed'}
            </Text>
          </View>
        </View>
      </View>

      {/* Delivery Info */}
      <View style={styles.deliveryInfo}>
        <View style={styles.deliveryItem}>
          <Icon name="access-time" size={20} color="#636E72" />
          <Text style={styles.deliveryText}>{store.deliveryTime}</Text>
        </View>
        <View style={styles.deliveryItem}>
          <Icon name="local-shipping" size={20} color="#636E72" />
          <Text style={styles.deliveryText}>{store.deliveryFee}</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['products', 'info', 'reviews'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.activeTab
            ]}
            onPress={() => setSelectedTab(tab as 'products' | 'info' | 'reviews')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === tab && styles.activeTabText
            ]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      {renderTabContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  storeImageLarge: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#F0FFF0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  storeEmojiLarge: {
    fontSize: 40,
  },
  headerInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 4,
  },
  storeCategory: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 8,
  },
  storeStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
  },
  reviewCount: {
    marginLeft: 4,
    fontSize: 14,
    color: '#636E72',
  },
  distance: {
    fontSize: 14,
    color: '#636E72',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusDotOpen: {
    backgroundColor: '#27AE60',
  },
  statusDotClosed: {
    backgroundColor: '#E74C3C',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextOpen: {
    color: '#27AE60',
  },
  statusTextClosed: {
    color: '#E74C3C',
  },
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#636E72',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6C5CE7',
  },
  tabText: {
    fontSize: 16,
    color: '#636E72',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#6C5CE7',
    fontWeight: '600',
  },
  productsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  productEmoji: {
    fontSize: 28,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: '#636E72',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00B894',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#636E72',
    textDecorationLine: 'line-through',
  },
  outOfStock: {
    fontSize: 12,
    color: '#E74C3C',
    fontWeight: '600',
    marginTop: 4,
  },
  addButton: {
    width: 36,
    height: 36,
    backgroundColor: '#6C5CE7',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#F1F3F4',
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 12,
  },
  servicesList: {
    gap: 8,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#2D3436',
  },
  infoText: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 8,
  },
  reviewsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoon: {
    fontSize: 16,
    color: '#636E72',
  },
});

export default StoreDetailsScreen;