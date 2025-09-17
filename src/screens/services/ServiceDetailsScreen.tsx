import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../types';

type ServiceDetailsRouteProp = RouteProp<RootStackParamList, 'ServiceDetails'>;
type ServiceDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ServiceDetails'
>;

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
  description: string;
  services: string[];
  portfolio: string[];
  reviews: Review[];
  phoneNumber: string;
}

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

const ServiceDetailsScreen: React.FC = () => {
  const route = useRoute<ServiceDetailsRouteProp>();
  const navigation = useNavigation<ServiceDetailsNavigationProp>();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDescription, setBookingDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Mock data - in real app, this would be fetched using the serviceId
  const serviceProvider: ServiceProvider = {
    id: route.params?.serviceId || '1',
    name: 'Ram Kumar',
    category: 'Plumbing',
    rating: 4.8,
    reviewCount: 127,
    price: '₹299 onwards',
    distance: '1.2 km',
    image: '👨‍🔧',
    isAvailable: true,
    experience: '8 years',
    description: 'Professional plumber with 8+ years of experience. Specializes in pipe repairs, tap installations, bathroom fittings, and emergency plumbing services. Available 24/7 for urgent repairs.',
    services: [
      'Pipe Repair & Installation',
      'Tap & Faucet Repair',
      'Bathroom Fittings',
      'Drainage Cleaning',
      'Water Tank Cleaning',
      'Emergency Repairs',
    ],
    portfolio: ['🚿', '🚰', '🔧', '⚙️'],
    phoneNumber: '+91 98765 43210',
    reviews: [
      {
        id: '1',
        customerName: 'Anjali Sharma',
        rating: 5,
        comment: 'Excellent service! Fixed my kitchen tap quickly and efficiently. Very professional and reasonably priced.',
        date: '2 days ago',
      },
      {
        id: '2',
        customerName: 'Rohit Gupta',
        rating: 4,
        comment: 'Good work on bathroom renovation. Arrived on time and completed work as promised.',
        date: '1 week ago',
      },
      {
        id: '3',
        customerName: 'Priya Singh',
        rating: 5,
        comment: 'Emergency call at midnight for water leakage. Ram ji came immediately and fixed the issue. Highly recommended!',
        date: '2 weeks ago',
      },
    ],
  };

  const availableSlots = [
    { date: 'Today', time: '2:00 PM' },
    { date: 'Today', time: '4:00 PM' },
    { date: 'Tomorrow', time: '10:00 AM' },
    { date: 'Tomorrow', time: '2:00 PM' },
    { date: 'Tomorrow', time: '6:00 PM' },
  ];

  const handleBookService = () => {
    if (!bookingDescription.trim()) {
      Alert.alert('Error', 'Please describe your service requirement');
      return;
    }
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select a date and time');
      return;
    }

    Alert.alert(
      'Booking Confirmed!',
      `Your service booking with ${serviceProvider.name} has been confirmed for ${selectedDate} at ${selectedTime}.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowBookingModal(false);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleCallProvider = () => {
    Alert.alert(
      'Call Provider',
      `Call ${serviceProvider.name} at ${serviceProvider.phoneNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Calling provider...') },
      ]
    );
  };

  const renderReview = (review: Review) => (
    <View key={review.id} style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerName}>{review.customerName}</Text>
          <View style={styles.reviewRating}>
            {[1, 2, 3, 4, 5].map(star => (
              <Icon
                key={star}
                name="star"
                size={14}
                color={star <= review.rating ? '#FFD700' : '#E0E0E0'}
              />
            ))}
          </View>
        </View>
        <Text style={styles.reviewDate}>{review.date}</Text>
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Provider Header */}
      <View style={styles.header}>
        <View style={styles.providerImageLarge}>
          <Text style={styles.providerEmojiLarge}>{serviceProvider.image}</Text>
        </View>
        <View style={styles.providerMainInfo}>
          <Text style={styles.providerName}>{serviceProvider.name}</Text>
          <Text style={styles.providerCategory}>{serviceProvider.category}</Text>
          <Text style={styles.providerExperience}>{serviceProvider.experience} experience</Text>
          
          <View style={styles.providerStats}>
            <View style={styles.statItem}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.statText}>{serviceProvider.rating}</Text>
              <Text style={styles.statSubtext}>({serviceProvider.reviewCount})</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="location-on" size={16} color="#666666" />
              <Text style={styles.statText}>{serviceProvider.distance}</Text>
            </View>
            <View style={[styles.statItem, styles.statusContainer]}>
              <View style={[
                styles.statusDot,
                { backgroundColor: serviceProvider.isAvailable ? '#4CAF50' : '#FF5722' }
              ]} />
              <Text style={[
                styles.statusText,
                { color: serviceProvider.isAvailable ? '#4CAF50' : '#FF5722' }
              ]}>
                {serviceProvider.isAvailable ? 'Available' : 'Busy'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.callButton} onPress={handleCallProvider}>
          <Icon name="phone" size={20} color="#007AFF" />
          <Text style={styles.callButtonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatButton}>
          <Icon name="chat" size={20} color="#007AFF" />
          <Text style={styles.chatButtonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => setShowBookingModal(true)}
        >
          <Text style={styles.bookButtonText}>Book Service</Text>
        </TouchableOpacity>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>{serviceProvider.description}</Text>
      </View>

      {/* Services Offered */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Services Offered</Text>
        <View style={styles.servicesList}>
          {serviceProvider.services.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <Icon name="check-circle" size={16} color="#4CAF50" />
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Portfolio */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Portfolio</Text>
        <View style={styles.portfolio}>
          {serviceProvider.portfolio.map((item, index) => (
            <View key={index} style={styles.portfolioItem}>
              <Text style={styles.portfolioEmoji}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews ({serviceProvider.reviewCount})</Text>
        {serviceProvider.reviews.map(renderReview)}
      </View>

      {/* Booking Modal */}
      <Modal
        visible={showBookingModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowBookingModal(false)}>
              <Icon name="close" size={24} color="#333333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Book Service</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.providerNameModal}>{serviceProvider.name}</Text>
            <Text style={styles.providerCategoryModal}>{serviceProvider.category}</Text>

            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Describe your requirement</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Describe what needs to be done..."
                value={bookingDescription}
                onChangeText={setBookingDescription}
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Select Date & Time</Text>
              <View style={styles.timeSlots}>
                {availableSlots.map((slot, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.timeSlot,
                      selectedDate === slot.date && selectedTime === slot.time && styles.selectedTimeSlot,
                    ]}
                    onPress={() => {
                      setSelectedDate(slot.date);
                      setSelectedTime(slot.time);
                    }}
                  >
                    <Text style={[
                      styles.timeSlotText,
                      selectedDate === slot.date && selectedTime === slot.time && styles.selectedTimeSlotText,
                    ]}>
                      {slot.date} - {slot.time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={handleBookService}>
              <Text style={styles.confirmButtonText}>Confirm Booking</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
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
  providerImageLarge: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  providerEmojiLarge: {
    fontSize: 40,
  },
  providerMainInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  providerCategory: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  providerExperience: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 12,
  },
  providerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  statSubtext: {
    marginLeft: 2,
    fontSize: 12,
    color: '#666666',
  },
  statusContainer: {
    marginLeft: 'auto',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#74B9FF',
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: '#F0F8FF',
  },
  callButtonText: {
    marginLeft: 6,
    color: '#74B9FF',
    fontWeight: '600',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#00B894',
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: '#F0FFF4',
  },
  chatButtonText: {
    marginLeft: 6,
    color: '#00B894',
    fontWeight: '600',
  },
  bookButton: {
    flex: 1,
    backgroundColor: '#6C5CE7',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  section: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
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
    color: '#333333',
  },
  portfolio: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  portfolioItem: {
    width: 60,
    height: 60,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  portfolioEmoji: {
    fontSize: 24,
  },
  reviewCard: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999999',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  placeholder: {
    width: 24,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  providerNameModal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  providerCategoryModal: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  formSection: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333333',
    textAlignVertical: 'top',
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  selectedTimeSlot: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333333',
  },
  selectedTimeSlotText: {
    color: '#FFFFFF',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ServiceDetailsScreen;