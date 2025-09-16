import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList, OrderStatus, BookingStatus } from '../../types';

type OrdersNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

interface OrderItem {
  id: string;
  type: 'product' | 'service';
  title: string;
  subtitle: string;
  status: OrderStatus | BookingStatus;
  date: string;
  amount: number;
  image: string;
  estimatedTime?: string;
  provider?: string;
  storeName?: string;
}

const OrdersScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'products' | 'services'>('all');
  const navigation = useNavigation<OrdersNavigationProp>();

  const mockOrders: OrderItem[] = [
    {
      id: '1',
      type: 'product',
      title: 'Grocery Order #12345',
      subtitle: 'Rice, Dal, Oil, Vegetables',
      status: 'out_for_delivery',
      date: '2024-01-15T14:30:00Z',
      amount: 1250,
      image: '🛒',
      estimatedTime: '15 min',
      storeName: 'Sharma Kirana Store',
    },
    {
      id: '2',
      type: 'service',
      title: 'Plumbing Service',
      subtitle: 'Kitchen tap repair',
      status: 'in_progress',
      date: '2024-01-15T10:00:00Z',
      amount: 350,
      image: '🔧',
      provider: 'Ram Kumar',
    },
    {
      id: '3',
      type: 'product',
      title: 'Medicine Order #12344',
      subtitle: 'Paracetamol, Vitamin C',
      status: 'delivered',
      date: '2024-01-14T18:45:00Z',
      amount: 280,
      image: '💊',
      storeName: 'MedPlus Pharmacy',
    },
    {
      id: '4',
      type: 'service',
      title: 'House Cleaning',
      subtitle: '2 BHK cleaning service',
      status: 'completed',
      date: '2024-01-13T09:00:00Z',
      amount: 800,
      image: '🧹',
      provider: 'CleanPro Services',
    },
    {
      id: '5',
      type: 'product',
      title: 'Fresh Fruits Order #12343',
      subtitle: 'Apples, Bananas, Oranges',
      status: 'cancelled',
      date: '2024-01-12T16:20:00Z',
      amount: 450,
      image: '🍎',
      storeName: 'Daily Fresh Fruits',
    },
  ];

  const filteredOrders = mockOrders.filter(order => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'products') return order.type === 'product';
    if (selectedTab === 'services') return order.type === 'service';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
      case 'requested':
        return '#FF9800';
      case 'confirmed':
      case 'quoted':
        return '#2196F3';
      case 'preparing':
      case 'ready':
        return '#FF5722';
      case 'out_for_delivery':
      case 'in_progress':
        return '#9C27B0';
      case 'delivered':
      case 'completed':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      case 'refunded':
        return '#607D8B';
      default:
        return '#999999';
    }
  };

  const getStatusText = (status: string) => {
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
      case 'requested':
        return 'Service Requested';
      case 'quoted':
        return 'Quote Received';
      case 'in_progress':
        return 'Service in Progress';
      case 'completed':
        return 'Service Completed';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const renderOrder = ({ item }: { item: OrderItem }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => {
        if (item.type === 'product') {
          navigation.navigate('OrderDetails', { orderId: item.id });
        } else {
          navigation.navigate('BookingDetails', { bookingId: item.id });
        }
      }}
    >
      {/* Order Header */}
      <View style={styles.orderHeader}>
        <View style={styles.orderImage}>
          <Text style={styles.orderEmoji}>{item.image}</Text>
        </View>
        <View style={styles.orderInfo}>
          <Text style={styles.orderTitle}>{item.title}</Text>
          <Text style={styles.orderSubtitle}>{item.subtitle}</Text>
          <Text style={styles.orderProvider}>
            {item.type === 'product' ? `From ${item.storeName}` : `By ${item.provider}`}
          </Text>
        </View>
        <View style={styles.orderAmount}>
          <Text style={styles.amountText}>₹{item.amount}</Text>
        </View>
      </View>

      {/* Order Status */}
      <View style={styles.orderStatus}>
        <View style={styles.statusLeft}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {getStatusText(item.status)}
          </Text>
        </View>
        <Text style={styles.orderDate}>{formatDate(item.date)}</Text>
      </View>

      {/* Estimated Time (if applicable) */}
      {item.estimatedTime && (item.status === 'out_for_delivery' || item.status === 'in_progress') && (
        <View style={styles.estimatedTime}>
          <Icon name="access-time" size={16} color="#007AFF" />
          <Text style={styles.estimatedTimeText}>Arriving in {item.estimatedTime}</Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.orderActions}>
        {(item.status === 'out_for_delivery' || item.status === 'in_progress') && (
          <TouchableOpacity style={styles.trackButton}>
            <Icon name="location-on" size={16} color="#007AFF" />
            <Text style={styles.trackButtonText}>Track Live</Text>
          </TouchableOpacity>
        )}
        {(item.status === 'delivered' || item.status === 'completed') && (
          <TouchableOpacity style={styles.reorderButton}>
            <Icon name="refresh" size={16} color="#4CAF50" />
            <Text style={styles.reorderButtonText}>Reorder</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.helpButton}>
          <Icon name="help-outline" size={16} color="#666666" />
          <Text style={styles.helpButtonText}>Help</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
        <TouchableOpacity>
          <Icon name="search" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'all' && styles.activeTab]}
          onPress={() => setSelectedTab('all')}
        >
          <Text style={[styles.tabText, selectedTab === 'all' && styles.activeTabText]}>
            All Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'products' && styles.activeTab]}
          onPress={() => setSelectedTab('products')}
        >
          <Text style={[styles.tabText, selectedTab === 'products' && styles.activeTabText]}>
            Products
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'services' && styles.activeTab]}
          onPress={() => setSelectedTab('services')}
        >
          <Text style={[styles.tabText, selectedTab === 'services' && styles.activeTabText]}>
            Services
          </Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        renderItem={renderOrder}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="receipt-long" size={48} color="#CCCCCC" />
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptySubtitle}>
              Start shopping or book services to see your orders here
            </Text>
            <TouchableOpacity style={styles.browseButton}>
              <Text style={styles.browseButtonText}>Browse Services & Stores</Text>
            </TouchableOpacity>
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  ordersList: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderEmoji: {
    fontSize: 24,
  },
  orderInfo: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  orderSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  orderProvider: {
    fontSize: 12,
    color: '#999999',
  },
  orderAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  orderStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#999999',
  },
  estimatedTime: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  estimatedTimeText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  trackButtonText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  reorderButtonText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  helpButtonText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 40,
  },
  browseButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default OrdersScreen;