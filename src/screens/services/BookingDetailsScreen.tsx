import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList, BookingStatus } from '../../types';

type BookingDetailsRouteProp = RouteProp<RootStackParamList, 'BookingDetails'>;

interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  rating: number;
  phoneNumber: string;
  profileImage: string;
}

interface BookingDetails {
  id: string;
  bookingNumber: string;
  status: BookingStatus;
  serviceCategory: string;
  description: string;
  provider: ServiceProvider;
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration: number;
  address: string;
  bookingDate: string;
  actualStartTime?: string;
  actualEndTime?: string;
  quotationAmount?: number;
  finalAmount?: number;
  paymentMethod: string;
  paymentStatus: string;
  specialInstructions?: string;
  images?: string[];
  currentLocation?: string;
}

const BookingDetailsScreen: React.FC = () => {
  const route = useRoute<BookingDetailsRouteProp>();
  const { bookingId } = route.params;

  // Mock data - in real app, this would come from API
  const bookingDetails: BookingDetails = {
    id: bookingId,
    bookingNumber: '#SB789',
    status: 'in_progress',
    serviceCategory: 'Plumbing',
    description: 'Kitchen tap repair and maintenance',
    provider: {
      id: 'provider1',
      name: 'Ram Kumar',
      category: 'Plumbing Expert',
      rating: 4.8,
      phoneNumber: '+91 98765 43210',
      profileImage: '👨‍🔧',
    },
    scheduledDate: '2024-01-15',
    scheduledTime: '10:00 AM',
    estimatedDuration: 90, // 90 minutes
    address: 'A-101, Green Park Apartments, Sector 15',
    bookingDate: '2024-01-13T09:30:00Z',
    actualStartTime: '2024-01-15T10:15:00Z',
    quotationAmount: 350,
    finalAmount: 350,
    paymentMethod: 'Cash on Service',
    paymentStatus: 'pending',
    specialInstructions: 'Please call before arriving. Ring bell twice.',
    currentLocation: 'On the way to your location',
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'requested':
        return '#FF9800';
      case 'quoted':
        return '#2196F3';
      case 'confirmed':
        return '#4CAF50';
      case 'in_progress':
        return '#9C27B0';
      case 'completed':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      default:
        return '#666666';
    }
  };

  const getStatusText = (status: BookingStatus) => {
    switch (status) {
      case 'requested':
        return 'Service Requested';
      case 'quoted':
        return 'Quotation Received';
      case 'confirmed':
        return 'Booking Confirmed';
      case 'in_progress':
        return 'Service in Progress';
      case 'completed':
        return 'Service Completed';
      case 'cancelled':
        return 'Booking Cancelled';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins} minutes`;
  };

  const handleCallProvider = () => {
    Alert.alert('Call Provider', `Calling ${bookingDetails.provider.name}...`);
  };

  const handleReschedule = () => {
    Alert.alert('Reschedule', 'Opening reschedule options...');
  };

  const handleCancelBooking = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', style: 'destructive' },
      ]
    );
  };

  const handleTrackProvider = () => {
    Alert.alert('Track Provider', 'Opening live location tracking...');
  };

  const handleBookAgain = () => {
    Alert.alert('Book Again', 'Creating new booking with same details...');
  };

  const handleRateService = () => {
    Alert.alert('Rate Service', 'Opening rating screen...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Booking Status Header */}
        <View style={styles.statusHeader}>
          <View style={styles.statusInfo}>
            <Text style={styles.bookingNumber}>Booking {bookingDetails.bookingNumber}</Text>
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(bookingDetails.status) }]} />
              <Text style={[styles.statusText, { color: getStatusColor(bookingDetails.status) }]}>
                {getStatusText(bookingDetails.status)}
              </Text>
            </View>
            <Text style={styles.bookingDate}>Booked on {formatDate(bookingDetails.bookingDate)}</Text>
          </View>
          <Text style={styles.totalAmount}>₹{bookingDetails.finalAmount || bookingDetails.quotationAmount}</Text>
        </View>

        {/* Live Tracking */}
        {bookingDetails.status === 'in_progress' && bookingDetails.currentLocation && (
          <View style={styles.trackingCard}>
            <View style={styles.trackingHeader}>
              <Icon name="location-on" size={20} color="#007AFF" />
              <Text style={styles.trackingTitle}>Service in Progress</Text>
            </View>
            <Text style={styles.trackingStatus}>{bookingDetails.currentLocation}</Text>
            {bookingDetails.actualStartTime && (
              <Text style={styles.trackingTime}>
                Started at {formatTime(bookingDetails.actualStartTime)}
              </Text>
            )}
          </View>
        )}

        {/* Service Provider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Provider</Text>
          <View style={styles.providerCard}>
            <Text style={styles.providerImage}>{bookingDetails.provider.profileImage}</Text>
            <View style={styles.providerInfo}>
              <Text style={styles.providerName}>{bookingDetails.provider.name}</Text>
              <Text style={styles.providerCategory}>{bookingDetails.provider.category}</Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{bookingDetails.provider.rating}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.callButton} onPress={handleCallProvider}>
              <Icon name="phone" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Service Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Details</Text>
          <View style={styles.serviceInfo}>
            <View style={styles.serviceRow}>
              <Icon name="build" size={20} color="#666666" />
              <View style={styles.serviceText}>
                <Text style={styles.serviceCategory}>{bookingDetails.serviceCategory}</Text>
                <Text style={styles.serviceDescription}>{bookingDetails.description}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Schedule Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Schedule</Text>
          <View style={styles.scheduleInfo}>
            <View style={styles.scheduleRow}>
              <Icon name="event" size={20} color="#666666" />
              <View style={styles.scheduleText}>
                <Text style={styles.scheduleLabel}>Date & Time</Text>
                <Text style={styles.scheduleValue}>
                  {formatDate(bookingDetails.scheduledDate)} at {bookingDetails.scheduledTime}
                </Text>
              </View>
            </View>
            <View style={styles.scheduleRow}>
              <Icon name="schedule" size={20} color="#666666" />
              <View style={styles.scheduleText}>
                <Text style={styles.scheduleLabel}>Estimated Duration</Text>
                <Text style={styles.scheduleValue}>{formatDuration(bookingDetails.estimatedDuration)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Service Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Address</Text>
          <View style={styles.addressInfo}>
            <Icon name="location-on" size={20} color="#666666" />
            <Text style={styles.addressText}>{bookingDetails.address}</Text>
          </View>
        </View>

        {/* Special Instructions */}
        {bookingDetails.specialInstructions && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Special Instructions</Text>
            <Text style={styles.instructionsText}>{bookingDetails.specialInstructions}</Text>
          </View>
        )}

        {/* Payment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Service Charge</Text>
            <Text style={styles.paymentValue}>₹{bookingDetails.quotationAmount}</Text>
          </View>
          <View style={[styles.paymentRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{bookingDetails.finalAmount || bookingDetails.quotationAmount}</Text>
          </View>
          <Text style={styles.paymentMethod}>Payment via {bookingDetails.paymentMethod}</Text>
          <View style={styles.paymentStatusContainer}>
            <Text style={styles.paymentStatusLabel}>Status: </Text>
            <Text style={[
              styles.paymentStatusText,
              bookingDetails.paymentStatus === 'completed' ? styles.completedPayment : styles.pendingPayment
            ]}>
              {bookingDetails.paymentStatus.charAt(0).toUpperCase() + bookingDetails.paymentStatus.slice(1)}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {bookingDetails.status === 'in_progress' && (
            <TouchableOpacity style={styles.primaryButton} onPress={handleTrackProvider}>
              <Icon name="location-on" size={16} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Track Provider</Text>
            </TouchableOpacity>
          )}
          
          {bookingDetails.status === 'completed' && (
            <>
              <TouchableOpacity style={styles.primaryButton} onPress={handleRateService}>
                <Icon name="star" size={16} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Rate Service</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton} onPress={handleBookAgain}>
                <Icon name="refresh" size={16} color="#007AFF" />
                <Text style={styles.secondaryButtonText}>Book Again</Text>
              </TouchableOpacity>
            </>
          )}

          {(bookingDetails.status === 'confirmed' || bookingDetails.status === 'quoted') && (
            <TouchableOpacity style={styles.secondaryButton} onPress={handleReschedule}>
              <Icon name="schedule" size={16} color="#007AFF" />
              <Text style={styles.secondaryButtonText}>Reschedule</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.secondaryButton} onPress={handleCallProvider}>
            <Icon name="phone" size={16} color="#007AFF" />
            <Text style={styles.secondaryButtonText}>Call Provider</Text>
          </TouchableOpacity>

          {(bookingDetails.status === 'requested' || bookingDetails.status === 'quoted' || bookingDetails.status === 'confirmed') && (
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelBooking}>
              <Icon name="cancel" size={16} color="#F44336" />
              <Text style={styles.cancelButtonText}>Cancel Booking</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  statusHeader: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  statusInfo: {
    flex: 1,
  },
  bookingNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  bookingDate: {
    fontSize: 12,
    color: '#666666',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  trackingCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  trackingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  trackingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginLeft: 8,
  },
  trackingStatus: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 4,
  },
  trackingTime: {
    fontSize: 12,
    color: '#999999',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerImage: {
    fontSize: 40,
    marginRight: 16,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 2,
  },
  providerCategory: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 4,
    fontWeight: '500',
  },
  callButton: {
    backgroundColor: '#F0F8FF',
    padding: 12,
    borderRadius: 20,
  },
  serviceInfo: {
    flexDirection: 'row',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  serviceText: {
    marginLeft: 12,
    flex: 1,
  },
  serviceCategory: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 2,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666666',
  },
  scheduleInfo: {
    gap: 12,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  scheduleText: {
    marginLeft: 12,
    flex: 1,
  },
  scheduleLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  scheduleValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  addressInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 12,
    flex: 1,
  },
  instructionsText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666666',
  },
  paymentValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  paymentMethod: {
    fontSize: 12,
    color: '#666666',
    marginTop: 8,
    textAlign: 'center',
  },
  paymentStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  paymentStatusLabel: {
    fontSize: 12,
    color: '#666666',
  },
  paymentStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  completedPayment: {
    color: '#4CAF50',
  },
  pendingPayment: {
    color: '#FF9800',
  },
  actionButtons: {
    padding: 16,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#F44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  cancelButtonText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookingDetailsScreen;