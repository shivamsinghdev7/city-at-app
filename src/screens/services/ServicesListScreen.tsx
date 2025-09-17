import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../types';

type ServicesListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ServicesList'
>;

type ServicesListRouteProp = RouteProp<RootStackParamList, 'ServicesList'>;

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  isAvailable: boolean;
  distance: string;
  experience: string;
}

const ServicesListScreen: React.FC = () => {
  const navigation = useNavigation<ServicesListNavigationProp>();
  const route = useRoute<ServicesListRouteProp>();
  const { category } = route.params;

  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    // Mock services data based on category
    const mockServices: Service[] = [
      {
        id: '1',
        name: 'Ram Kumar - Expert Plumber',
        description: 'Professional plumbing services with 8+ years experience',
        price: '₹299 onwards',
        rating: 4.8,
        reviewCount: 156,
        image: '🔧',
        category,
        isAvailable: true,
        distance: '1.2 km away',
        experience: '8 years',
      },
      {
        id: '2',
        name: 'Quick Fix Solutions',
        description: 'Emergency plumbing and repair services',
        price: '₹399 onwards',
        rating: 4.6,
        reviewCount: 89,
        image: '🚰',
        category,
        isAvailable: true,
        distance: '2.1 km away',
        experience: '5 years',
      },
      {
        id: '3',
        name: 'Reliable Repairs Co.',
        description: 'Home maintenance and plumbing specialists',
        price: '₹449 onwards',
        rating: 4.7,
        reviewCount: 203,
        image: '⚙️',
        category,
        isAvailable: false,
        distance: '0.8 km away',
        experience: '12 years',
      },
      {
        id: '4',
        name: 'City Service Hub',
        description: 'Complete home services and maintenance',
        price: '₹349 onwards',
        rating: 4.5,
        reviewCount: 127,
        image: '🔨',
        category,
        isAvailable: true,
        distance: '3.2 km away',
        experience: '6 years',
      },
    ];
    setServices(mockServices);
  }, [category]);

  const renderServiceItem = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => navigation.navigate('ServiceDetails', { serviceId: item.id })}
      activeOpacity={0.8}
    >
      <View style={styles.serviceHeader}>
        <View style={styles.serviceImage}>
          <Text style={styles.serviceEmoji}>{item.image}</Text>
        </View>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text style={styles.serviceDescription}>{item.description}</Text>
          <Text style={styles.serviceExperience}>{item.experience} experience</Text>
        </View>
        <View style={styles.availabilityContainer}>
          <View style={[
            styles.statusIndicator,
            item.isAvailable ? styles.statusIndicatorAvailable : styles.statusIndicatorBusy
          ]} />
          <Text style={[
            styles.statusText,
            item.isAvailable ? styles.statusTextAvailable : styles.statusTextBusy
          ]}>
            {item.isAvailable ? 'Available' : 'Busy'}
          </Text>
        </View>
      </View>
      
      <View style={styles.serviceDetails}>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#F39C12" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviewCount}>({item.reviewCount} reviews)</Text>
          <Text style={styles.distance}>📍 {item.distance}</Text>
        </View>
      </View>
      
      <View style={styles.serviceFooter}>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity 
          style={[
            styles.bookButton,
            !item.isAvailable && styles.bookButtonDisabled
          ]}
          disabled={!item.isAvailable}
          onPress={() => navigation.navigate('ServiceDetails', { serviceId: item.id })}
        >
          <Text style={[
            styles.bookButtonText,
            !item.isAvailable && styles.bookButtonTextDisabled
          ]}>
            {item.isAvailable ? 'Book Now' : 'Not Available'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category} Services</Text>
        <TouchableOpacity>
          <Icon name="filter-list" size={24} color="#636E72" />
        </TouchableOpacity>
      </View>

      {/* Category Info */}
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryDescription}>
          Professional {category.toLowerCase()} services near you
        </Text>
        <Text style={styles.serviceCount}>
          {services.length} service providers available
        </Text>
      </View>

      {/* Services List */}
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.servicesList}
        contentContainerStyle={styles.servicesContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
  },
  categoryInfo: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  categoryDescription: {
    fontSize: 16,
    color: '#2D3436',
    marginBottom: 4,
  },
  serviceCount: {
    fontSize: 14,
    color: '#636E72',
  },
  servicesList: {
    flex: 1,
  },
  servicesContainer: {
    paddingVertical: 16,
  },
  serviceCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceImage: {
    width: 60,
    height: 60,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceEmoji: {
    fontSize: 28,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 4,
  },
  serviceExperience: {
    fontSize: 12,
    color: '#74B9FF',
    fontWeight: '600',
  },
  availabilityContainer: {
    alignItems: 'flex-end',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  statusIndicatorAvailable: {
    backgroundColor: '#27AE60',
  },
  statusIndicatorBusy: {
    backgroundColor: '#E74C3C',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextAvailable: {
    color: '#27AE60',
  },
  statusTextBusy: {
    color: '#E74C3C',
  },
  serviceDetails: {
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
    color: '#2D3436',
  },
  reviewCount: {
    marginLeft: 4,
    fontSize: 14,
    color: '#636E72',
  },
  distance: {
    marginLeft: 12,
    fontSize: 14,
    color: '#636E72',
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00B894',
  },
  bookButton: {
    backgroundColor: '#74B9FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  bookButtonDisabled: {
    backgroundColor: '#BDC3C7',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bookButtonTextDisabled: {
    color: '#DDD',
  },
});

export default ServicesListScreen;