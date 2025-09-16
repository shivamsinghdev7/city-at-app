import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../types';
import { RootState } from '../../store';

type StoresNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

interface Store {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  distance: string;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  image: string;
  isOpen: boolean;
  offers: string[];
  tags: string[];
}

interface StoreCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const StoresScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigation = useNavigation<StoresNavigationProp>();
  const { itemCount } = useSelector((state: RootState) => state.cart);

  const storeCategories: StoreCategory[] = [
    { id: '1', name: 'Kirana Store', icon: 'store', color: '#4CAF50' },
    { id: '2', name: 'Pharmacy', icon: 'local-pharmacy', color: '#2196F3' },
    { id: '3', name: 'Vegetables', icon: 'eco', color: '#8BC34A' },
    { id: '4', name: 'Fruits', icon: 'apple', color: '#FF9800' },
    { id: '5', name: 'Dairy', icon: 'local-drink', color: '#9C27B0' },
    { id: '6', name: 'Bakery', icon: 'cake', color: '#FF5722' },
  ];

  const mockStores: Store[] = [
    {
      id: '1',
      name: 'Sharma Kirana Store',
      category: 'Kirana Store',
      rating: 4.5,
      reviewCount: 234,
      distance: '0.8 km',
      deliveryTime: '20-30 min',
      deliveryFee: 0,
      minimumOrder: 200,
      image: '🏪',
      isOpen: true,
      offers: ['Free delivery on ₹200+', '10% off on first order'],
      tags: ['Popular', 'Fast Delivery'],
    },
    {
      id: '2',
      name: 'Fresh Vegetables Mart',
      category: 'Vegetables',
      rating: 4.7,
      reviewCount: 156,
      distance: '1.2 km',
      deliveryTime: '15-25 min',
      deliveryFee: 25,
      minimumOrder: 150,
      image: '🥬',
      isOpen: true,
      offers: ['Fresh from farm', 'Organic options available'],
      tags: ['Organic', 'Fresh'],
    },
    {
      id: '3',
      name: 'MedPlus Pharmacy',
      category: 'Pharmacy',
      rating: 4.3,
      reviewCount: 89,
      distance: '2.1 km',
      deliveryTime: '25-35 min',
      deliveryFee: 30,
      minimumOrder: 100,
      image: '💊',
      isOpen: false,
      offers: ['24x7 availability', 'Prescription delivery'],
      tags: ['24x7', 'Prescription'],
    },
    {
      id: '4',
      name: 'Daily Fresh Fruits',
      category: 'Fruits',
      rating: 4.6,
      reviewCount: 198,
      distance: '1.5 km',
      deliveryTime: '20-30 min',
      deliveryFee: 20,
      minimumOrder: 200,
      image: '🍎',
      isOpen: true,
      offers: ['Fresh daily', 'Seasonal fruits available'],
      tags: ['Seasonal', 'Quality'],
    },
  ];

  const filteredStores = mockStores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || store.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderStoreCategory = ({ item }: { item: StoreCategory }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item.name && styles.selectedCategoryChip,
        { borderColor: item.color },
      ]}
      onPress={() => setSelectedCategory(selectedCategory === item.name ? null : item.name)}
    >
      <Icon 
        name={item.icon} 
        size={16} 
        color={selectedCategory === item.name ? '#FFFFFF' : item.color} 
      />
      <Text style={[
        styles.categoryChipText,
        selectedCategory === item.name && styles.selectedCategoryChipText,
        { color: selectedCategory === item.name ? '#FFFFFF' : item.color },
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderStore = ({ item }: { item: Store }) => (
    <TouchableOpacity
      style={styles.storeCard}
      onPress={() => navigation.navigate('StoreDetails', { storeId: item.id })}
    >
      {/* Store Header */}
      <View style={styles.storeHeader}>
        <View style={styles.storeImage}>
          <Text style={styles.storeEmoji}>{item.image}</Text>
        </View>
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{item.name}</Text>
          <Text style={styles.storeCategory}>{item.category}</Text>
          <View style={styles.storeRating}>
            <Icon name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviewCount}+)</Text>
          </View>
        </View>
        <View style={styles.storeStatus}>
          <View style={[
            styles.statusDot,
            { backgroundColor: item.isOpen ? '#4CAF50' : '#FF5722' }
          ]} />
          <Text style={[
            styles.statusText,
            { color: item.isOpen ? '#4CAF50' : '#FF5722' }
          ]}>
            {item.isOpen ? 'Open' : 'Closed'}
          </Text>
        </View>
      </View>

      {/* Store Details */}
      <View style={styles.storeDetails}>
        <View style={styles.detailItem}>
          <Icon name="location-on" size={14} color="#666666" />
          <Text style={styles.detailText}>{item.distance}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="access-time" size={14} color="#666666" />
          <Text style={styles.detailText}>{item.deliveryTime}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="delivery-dining" size={14} color="#666666" />
          <Text style={styles.detailText}>
            {item.deliveryFee === 0 ? 'Free delivery' : `₹${item.deliveryFee} delivery`}
          </Text>
        </View>
      </View>

      {/* Offers */}
      {item.offers.length > 0 && (
        <View style={styles.offersContainer}>
          <Text style={styles.offersTitle}>🎯 Offers:</Text>
          <Text style={styles.offersText}>{item.offers[0]}</Text>
        </View>
      )}

      {/* Tags */}
      <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        {item.minimumOrder > 0 && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>Min ₹{item.minimumOrder}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stores</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="filter-list" size={24} color="#333333" />
          </TouchableOpacity>
          {itemCount > 0 && (
            <TouchableOpacity style={styles.cartButton}>
              <Icon name="shopping-cart" size={24} color="#007AFF" />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{itemCount}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search stores, products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={storeCategories}
          renderItem={renderStoreCategory}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Stores List */}
      <FlatList
        data={filteredStores}
        renderItem={renderStore}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.storesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="store" size={48} color="#CCCCCC" />
            <Text style={styles.emptyTitle}>No stores found</Text>
            <Text style={styles.emptySubtitle}>
              Try searching with different keywords or check your location
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 16,
  },
  cartButton: {
    marginLeft: 16,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333333',
  },
  categoriesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  categoriesList: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  selectedCategoryChip: {
    backgroundColor: '#007AFF',
  },
  categoryChipText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  selectedCategoryChipText: {
    color: '#FFFFFF',
  },
  storesList: {
    padding: 20,
  },
  storeCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  storeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  storeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  storeEmoji: {
    fontSize: 24,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  storeCategory: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  storeRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  reviewCount: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666666',
  },
  storeStatus: {
    alignItems: 'flex-end',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  storeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666666',
  },
  offersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  offersTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4CAF50',
    marginRight: 4,
  },
  offersText: {
    fontSize: 12,
    color: '#4CAF50',
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#1976D2',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default StoresScreen;