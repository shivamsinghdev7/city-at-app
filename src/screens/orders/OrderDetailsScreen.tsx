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
import { RootStackParamList, OrderStatus } from '../../types';

type OrderDetailsRouteProp = RouteProp<RootStackParamList, 'OrderDetails'>;

interface OrderDetailItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface OrderDetails {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderDetailItem[];
  storeName: string;
  storeAddress: string;
  deliveryAddress: string;
  orderDate: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  estimatedTime?: string;
  trackingInfo?: {
    currentStatus: string;
    location: string;
    timestamp: string;
  };
}

const OrderDetailsScreen: React.FC = () => {
  const route = useRoute<OrderDetailsRouteProp>();
  const { orderId } = route.params;

  // Mock data - in real app, this would come from API
  const orderDetails: OrderDetails = {
    id: orderId,
    orderNumber: '#12345',
    status: 'out_for_delivery',
    items: [
      { id: '1', name: 'Basmati Rice (5kg)', quantity: 1, price: 450, image: '🌾' },
      { id: '2', name: 'Toor Dal (1kg)', quantity: 2, price: 120, image: '🫘' },
      { id: '3', name: 'Cooking Oil (1L)', quantity: 1, price: 180, image: '🫗' },
      { id: '4', name: 'Mixed Vegetables', quantity: 1, price: 150, image: '🥬' },
    ],
    storeName: 'Sharma Kirana Store',
    storeAddress: 'Shop 15, Main Market, Sector 12',
    deliveryAddress: 'A-101, Green Park Apartments, Sector 15',
    orderDate: '2024-01-15T14:30:00Z',
    estimatedDelivery: '2024-01-15T16:00:00Z',
    subtotal: 900,
    deliveryFee: 40,
    discount: 90,
    total: 850,
    paymentMethod: 'Online Payment',
    estimatedTime: '15 min',
    trackingInfo: {
      currentStatus: 'Out for delivery',
      location: 'Near Sector 14 Metro Station',
      timestamp: '2024-01-15T15:45:00Z',
    },
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return '#FF9800';
      case 'confirmed':
        return '#2196F3';
      case 'preparing':
      case 'ready':
        return '#FF5722';
      case 'out_for_delivery':
        return '#9C27B0';
      case 'delivered':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      case 'refunded':
        return '#607D8B';
      default:
        return '#666666';
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'Order Pending';
      case 'confirmed':
        return 'Order Confirmed';
      case 'preparing':
        return 'Being Prepared';
      case 'ready':
        return 'Ready for Pickup';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      case 'refunded':
        return 'Refunded';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleTrackOrder = () => {
    Alert.alert('Track Order', 'Opening live tracking...');
  };

  const handleReorder = () => {
    Alert.alert('Reorder', 'Adding items to cart...');
  };

  const handleContactStore = () => {
    Alert.alert('Contact Store', `Calling ${orderDetails.storeName}...`);
  };

  const handleCancelOrder = () => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', style: 'destructive' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Order Status Header */}
        <View style={styles.statusHeader}>
          <View style={styles.statusInfo}>
            <Text style={styles.orderNumber}>Order {orderDetails.orderNumber}</Text>
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(orderDetails.status) }]} />
              <Text style={[styles.statusText, { color: getStatusColor(orderDetails.status) }]}>
                {getStatusText(orderDetails.status)}
              </Text>
            </View>
            <Text style={styles.orderDate}>Placed on {formatDate(orderDetails.orderDate)}</Text>
          </View>
          <Text style={styles.totalAmount}>₹{orderDetails.total}</Text>
        </View>

        {/* Live Tracking */}
        {orderDetails.trackingInfo && orderDetails.status === 'out_for_delivery' && (
          <View style={styles.trackingCard}>
            <View style={styles.trackingHeader}>
              <Icon name="location-on" size={20} color="#007AFF" />
              <Text style={styles.trackingTitle}>Live Tracking</Text>
            </View>
            <Text style={styles.trackingStatus}>{orderDetails.trackingInfo.currentStatus}</Text>
            <Text style={styles.trackingLocation}>{orderDetails.trackingInfo.location}</Text>
            <Text style={styles.trackingTime}>
              Updated {formatDate(orderDetails.trackingInfo.timestamp)}
            </Text>
            {orderDetails.estimatedTime && (
              <View style={styles.estimatedTime}>
                <Icon name="access-time" size={16} color="#007AFF" />
                <Text style={styles.estimatedTimeText}>Arriving in {orderDetails.estimatedTime}</Text>
              </View>
            )}
          </View>
        )}

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {orderDetails.items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Text style={styles.itemEmoji}>{item.image}</Text>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
          ))}
        </View>

        {/* Store Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Store Details</Text>
          <View style={styles.storeInfo}>
            <Icon name="store" size={20} color="#666666" />
            <View style={styles.storeDetails}>
              <Text style={styles.storeName}>{orderDetails.storeName}</Text>
              <Text style={styles.storeAddress}>{orderDetails.storeAddress}</Text>
            </View>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressInfo}>
            <Icon name="location-on" size={20} color="#666666" />
            <Text style={styles.addressText}>{orderDetails.deliveryAddress}</Text>
          </View>
        </View>

        {/* Bill Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill Details</Text>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Subtotal</Text>
            <Text style={styles.billValue}>₹{orderDetails.subtotal}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery Fee</Text>
            <Text style={styles.billValue}>₹{orderDetails.deliveryFee}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Discount</Text>
            <Text style={[styles.billValue, styles.discountText]}>-₹{orderDetails.discount}</Text>
          </View>
          <View style={[styles.billRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{orderDetails.total}</Text>
          </View>
          <Text style={styles.paymentMethod}>Paid via {orderDetails.paymentMethod}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {orderDetails.status === 'out_for_delivery' && (
            <TouchableOpacity style={styles.primaryButton} onPress={handleTrackOrder}>
              <Icon name="location-on" size={16} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Track Live</Text>
            </TouchableOpacity>
          )}
          
          {orderDetails.status === 'delivered' && (
            <TouchableOpacity style={styles.primaryButton} onPress={handleReorder}>
              <Icon name="refresh" size={16} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Reorder</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.secondaryButton} onPress={handleContactStore}>
            <Icon name="phone" size={16} color="#007AFF" />
            <Text style={styles.secondaryButtonText}>Contact Store</Text>
          </TouchableOpacity>

          {(orderDetails.status === 'pending' || orderDetails.status === 'confirmed') && (
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelOrder}>
              <Icon name="cancel" size={16} color="#F44336" />
              <Text style={styles.cancelButtonText}>Cancel Order</Text>
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
  orderNumber: {
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
  orderDate: {
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
  trackingLocation: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  trackingTime: {
    fontSize: 12,
    color: '#999999',
  },
  estimatedTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  estimatedTimeText: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 4,
    fontWeight: '500',
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
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  itemQuantity: {
    fontSize: 12,
    color: '#666666',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  storeDetails: {
    marginLeft: 12,
    flex: 1,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 2,
  },
  storeAddress: {
    fontSize: 12,
    color: '#666666',
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
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  billLabel: {
    fontSize: 14,
    color: '#666666',
  },
  billValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  discountText: {
    color: '#4CAF50',
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

export default OrderDetailsScreen;