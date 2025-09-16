import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../../store';
import { MainTabParamList, RootStackParamList } from '../../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CityPicker from '../../components/common/CityPicker';
import { NotificationService } from '../../services/NotificationService';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const HomeScreen: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedCity } = useSelector((state: RootState) => state.location);
  const { unreadCount } = useSelector((state: RootState) => state.notifications);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    // Initialize notifications
    const notificationService = NotificationService.getInstance();
    notificationService.initialize();

    // Create demo notifications after a delay (for testing)
    setTimeout(() => {
      notificationService.createDemoNotifications();
    }, 5000);
  }, []);

  const handleServicePress = (service: any) => {
    navigation.navigate('ServicesList', { category: service.name });
  };

  const serviceCategories = [
    { id: '1', name: 'Plumbing', icon: 'water-drop', color: '#3498DB' },
    { id: '2', name: 'Electrical', icon: 'electric-bolt', color: '#F39C12' },
    { id: '3', name: 'Cleaning', icon: 'cleaning-services', color: '#2ECC71' },
    { id: '4', name: 'Painting', icon: 'brush', color: '#E74C3C' },
    { id: '5', name: 'Carpentry', icon: 'handyman', color: '#8E44AD' },
    { id: '6', name: 'AC Repair', icon: 'air', color: '#1ABC9C' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.locationContainer}
            onPress={() => setShowCityPicker(true)}
          >
            <Icon name="location-on" size={20} color="#007AFF" />
            <Text style={styles.locationText}>
              {selectedCity?.name || 'Select Location'}
            </Text>
            <Icon name="keyboard-arrow-down" size={20} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Icon name="notifications" size={24} color="#333333" />
            {unreadCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Hello, {user?.name?.split(' ')[0] || 'User'}! 👋
          </Text>
          <Text style={styles.welcomeSubtext}>
            What service do you need today?
          </Text>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <Icon name="search" size={20} color="#666666" />
          <Text style={styles.searchPlaceholder}>
            Search for services, stores, products...
          </Text>
          <Icon name="mic" size={20} color="#666666" />
        </TouchableOpacity>

        {/* Quick Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Services</Text>
          <View style={styles.servicesGrid}>
            {serviceCategories.map((service) => (
              <TouchableOpacity 
                key={service.id} 
                style={styles.serviceCard}
                onPress={() => handleServicePress(service)}
                activeOpacity={0.8}
              >
                <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                  <Icon name={service.icon} size={28} color="#FFFFFF" />
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Services</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((item) => (
              <TouchableOpacity key={item} style={styles.featuredCard}>
                <View style={styles.featuredImage}>
                  <Icon name="build" size={40} color="#007AFF" />
                </View>
                <Text style={styles.featuredTitle}>Professional Plumber</Text>
                <Text style={styles.featuredSubtitle}>⭐ 4.8 • 2.5 km away</Text>
                <Text style={styles.featuredPrice}>₹299 onwards</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Nearby Stores */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Stores</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((item) => (
              <TouchableOpacity key={item} style={styles.storeCard}>
                <View style={styles.storeImage}>
                  <Icon name="store" size={40} color="#4CAF50" />
                </View>
                <Text style={styles.storeTitle}>Sharma Kirana Store</Text>
                <Text style={styles.storeSubtitle}>⭐ 4.5 • 1.2 km away</Text>
                <Text style={styles.storeDelivery}>Free delivery on ₹200+</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* City Picker Modal */}
      <CityPicker 
        visible={showCityPicker}
        onClose={() => setShowCityPicker(false)}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  locationText: {
    marginLeft: 8,
    marginRight: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  notificationButton: {
    position: 'relative',
    backgroundColor: '#F8F9FA',
    padding: 8,
    borderRadius: 20,
  },
  notificationBadge: {
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
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#666666',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#666666',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  seeAllText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  serviceCard: {
    width: '33.33%',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  serviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
  featuredCard: {
    width: 170,
    marginLeft: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  featuredImage: {
    height: 90,
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  featuredPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  storeCard: {
    width: 170,
    marginLeft: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  storeImage: {
    height: 90,
    backgroundColor: '#F0FFF0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  storeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  storeSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  storeDelivery: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default HomeScreen;