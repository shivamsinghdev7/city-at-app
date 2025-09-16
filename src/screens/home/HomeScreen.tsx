import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedCity } = useSelector((state: RootState) => state.location);

  const serviceCategories = [
    { id: '1', name: 'Plumbing', icon: 'plumbing', color: '#FF6B6B' },
    { id: '2', name: 'Electrical', icon: 'electrical-services', color: '#4ECDC4' },
    { id: '3', name: 'Cleaning', icon: 'cleaning-services', color: '#45B7D1' },
    { id: '4', name: 'Painting', icon: 'format-paint', color: '#96CEB4' },
    { id: '5', name: 'Carpentry', icon: 'carpenter', color: '#FFEAA7' },
    { id: '6', name: 'AC Repair', icon: 'ac-unit', color: '#DDA0DD' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={20} color="#007AFF" />
            <Text style={styles.locationText}>
              {selectedCity?.name || 'Select Location'}
            </Text>
            <Icon name="keyboard-arrow-down" size={20} color="#666666" />
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications" size={24} color="#333333" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
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
              <TouchableOpacity key={service.id} style={styles.serviceCard}>
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
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 32,
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
    marginBottom: 20,
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
  featuredCard: {
    width: 160,
    marginLeft: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  featuredImage: {
    height: 80,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
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
    width: 160,
    marginLeft: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  storeImage: {
    height: 80,
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
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