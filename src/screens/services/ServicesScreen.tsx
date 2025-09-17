import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList, MainTabParamList } from '../../types';

type ServicesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

type ServicesRouteProp = RouteProp<MainTabParamList, 'Services'>;

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  providerCount: number;
  basePrice: string;
}

interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  price: string;
  distance: string;
  image: string;
  isAvailable: boolean;
  experience: string;
}

const ServicesScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigation = useNavigation<ServicesNavigationProp>();
  const route = useRoute<ServicesRouteProp>();

  useEffect(() => {
    // If category is passed from navigation, select it
    if (route.params?.category) {
      setSelectedCategory(route.params.category);
    }
  }, [route.params?.category]);

  const serviceCategories: ServiceCategory[] = [
    {
      id: '1',
      name: 'Plumbing',
      description: 'Pipes, taps, drainage',
      icon: 'water-drop',
      color: '#3498DB',
      providerCount: 45,
      basePrice: '₹299',
    },
    {
      id: '2',
      name: 'Electrical',
      description: 'Wiring, switches, repairs',
      icon: 'electric-bolt',
      color: '#F39C12',
      providerCount: 38,
      basePrice: '₹199',
    },
    {
      id: '3',
      name: 'Cleaning',
      description: 'Home, office cleaning',
      icon: 'cleaning-services',
      color: '#2ECC71',
      providerCount: 67,
      basePrice: '₹399',
    },
    {
      id: '4',
      name: 'Painting',
      description: 'Interior, exterior painting',
      icon: 'brush',
      color: '#E74C3C',
      providerCount: 23,
      basePrice: '₹599',
    },
    {
      id: '5',
      name: 'Carpentry',
      description: 'Furniture, repairs',
      icon: 'handyman',
      color: '#8E44AD',
      providerCount: 31,
      basePrice: '₹499',
    },
    {
      id: '6',
      name: 'AC Repair',
      description: 'Installation, servicing',
      icon: 'air',
      color: '#1ABC9C',
      providerCount: 29,
      basePrice: '₹349',
    },
  ];

  const mockProviders: ServiceProvider[] = [
    {
      id: '1',
      name: 'Ram Kumar',
      category: 'Plumbing',
      rating: 4.8,
      reviewCount: 127,
      price: '₹299 onwards',
      distance: '1.2 km',
      image: '👨‍🔧',
      isAvailable: true,
      experience: '8 years',
    },
    {
      id: '2',
      name: 'Suresh Singh',
      category: 'Electrical',
      rating: 4.6,
      reviewCount: 89,
      price: '₹199 onwards',
      distance: '2.1 km',
      image: '⚡',
      isAvailable: true,
      experience: '5 years',
    },
    {
      id: '3',
      name: 'CleanPro Services',
      category: 'Cleaning',
      rating: 4.9,
      reviewCount: 203,
      price: '₹399 onwards',
      distance: '0.8 km',
      image: '🧹',
      isAvailable: false,
      experience: '10 years',
    },
  ];

  const filteredProviders = mockProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || provider.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderServiceCategory = ({ item }: { item: ServiceCategory }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategory === item.name && styles.selectedCategoryCard,
      ]}
      onPress={() => setSelectedCategory(selectedCategory === item.name ? null : item.name)}
    >
      <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
        <Icon name={item.icon} size={24} color="#FFFFFF" />
      </View>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryDescription}>{item.description}</Text>
        <Text style={styles.categoryDetails}>
          {item.providerCount} providers • {item.basePrice} onwards
        </Text>
      </View>
      <Icon name="chevron-right" size={20} color="#CCCCCC" />
    </TouchableOpacity>
  );

  const renderServiceProvider = ({ item }: { item: ServiceProvider }) => (
    <TouchableOpacity
      style={styles.providerCard}
      onPress={() => navigation.navigate('ServiceDetails', { serviceId: item.id })}
    >
      <View style={styles.providerHeader}>
        <View style={styles.providerImage}>
          <Text style={styles.providerEmoji}>{item.image}</Text>
        </View>
        <View style={styles.providerInfo}>
          <Text style={styles.providerName}>{item.name}</Text>
          <Text style={styles.providerCategory}>{item.category}</Text>
          <Text style={styles.providerExperience}>{item.experience} experience</Text>
        </View>
        <View style={styles.providerStatus}>
          <View style={[
            styles.statusIndicator,
            { backgroundColor: item.isAvailable ? '#4CAF50' : '#FF5722' }
          ]} />
          <Text style={[
            styles.statusText,
            { color: item.isAvailable ? '#4CAF50' : '#FF5722' }
          ]}>
            {item.isAvailable ? 'Available' : 'Busy'}
          </Text>
        </View>
      </View>
      
      <View style={styles.providerDetails}>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviewCount}>({item.reviewCount} reviews)</Text>
        </View>
        <Text style={styles.distance}>📍 {item.distance} away</Text>
      </View>
      
      <View style={styles.providerFooter}>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Services</Text>
        <TouchableOpacity>
          <Icon name="filter-list" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search services or providers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Service Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Categories</Text>
        <FlatList
          data={serviceCategories}
          renderItem={renderServiceCategory}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.categoriesList}
        />
      </View>

      {/* Service Providers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {selectedCategory ? `${selectedCategory} Providers` : 'Available Providers'}
        </Text>
        <FlatList
          data={filteredProviders}
          renderItem={renderServiceProvider}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.providersList}
        />
      </View>
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
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  categoriesList: {
    maxHeight: 300,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedCategoryCard: {
    backgroundColor: '#F0F8FF',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  categoryDetails: {
    fontSize: 12,
    color: '#999999',
  },
  providersList: {
    flex: 1,
  },
  providerCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  providerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  providerEmoji: {
    fontSize: 24,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  providerCategory: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  providerExperience: {
    fontSize: 12,
    color: '#999999',
  },
  providerStatus: {
    alignItems: 'flex-end',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  providerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  reviewCount: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666666',
  },
  distance: {
    fontSize: 12,
    color: '#666666',
  },
  providerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ServicesScreen;