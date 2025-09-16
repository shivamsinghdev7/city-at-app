import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootState } from '../../store';
import { markAsRead, markAllAsRead } from '../../store/slices/notificationSlice';
import { Notification } from '../../types';

const NotificationsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { notifications, isLoading, unreadCount } = useSelector(
    (state: RootState) => state.notifications
  );

  const handleNotificationPress = (notification: Notification) => {
    if (!notification.isRead) {
      dispatch(markAsRead(notification.id));
    }
    
    // Handle deep linking if needed
    if (notification.deepLink) {
      console.log('Navigate to:', notification.deepLink);
      // Integrate with navigation
    }
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order_update':
        return 'shopping-cart';
      case 'service_update':
        return 'build';
      case 'promotional':
        return 'local-offer';
      case 'payment':
        return 'payment';
      case 'reminder':
        return 'alarm';
      default:
        return 'notifications';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order_update':
        return '#4CAF50';
      case 'service_update':
        return '#2196F3';
      case 'promotional':
        return '#FF9800';
      case 'payment':
        return '#9C27B0';
      case 'reminder':
        return '#F44336';
      default:
        return '#607D8B';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.isRead && styles.unreadItem]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={[styles.iconContainer, { backgroundColor: getNotificationColor(item.type) }]}>
        <Icon 
          name={getNotificationIcon(item.type)} 
          size={20} 
          color="#FFFFFF" 
        />
      </View>
      
      <View style={styles.notificationContent}>
        <Text style={[styles.notificationTitle, !item.isRead && styles.unreadTitle]}>
          {item.title}
        </Text>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={styles.notificationTime}>
          {formatTime(item.createdAt)}
        </Text>
      </View>
      
      {!item.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={handleMarkAllAsRead}>
            <Text style={styles.markAllRead}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                // Refresh notifications from API
                console.log('Refresh notifications');
              }}
            />
          }
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="notifications-none" size={64} color="#CCCCCC" />
          <Text style={styles.emptyTitle}>No notifications yet</Text>
          <Text style={styles.emptySubtitle}>
            You'll see updates about your orders and services here
          </Text>
        </View>
      )}
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
  markAllRead: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  listContainer: {
    paddingVertical: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  unreadItem: {
    backgroundColor: '#F8F9FF',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: '600',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginLeft: 8,
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default NotificationsScreen;