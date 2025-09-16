import { store } from '../store';
import { addNotification } from '../store/slices/notificationSlice';
import { Notification, NotificationType } from '../types';

// Mock FirebaseMessagingTypes for development
interface MockRemoteMessage {
  messageId?: string;
  notification?: {
    title?: string;
    body?: string;
    android?: {
      imageUrl?: string;
    };
    ios?: {
      attachments?: { url?: string }[];
    };
  };
  data?: { [key: string]: string };
}

export class NotificationService {
  private static instance: NotificationService;
  private fcmToken: string | null = null;

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async initialize(): Promise<void> {
    try {
      console.log('Initializing notification service...');
      // In a production app, this would initialize Firebase messaging
      // For now, we'll use mock implementation
      this.fcmToken = 'mock-fcm-token';
      this.setupMessageHandlers();
    } catch (error) {
      console.warn('Failed to initialize notifications:', error);
    }
  }

  private async getFCMToken(): Promise<string | null> {
    try {
      // Mock FCM token for development
      this.fcmToken = 'mock-fcm-token-' + Date.now();
      console.log('FCM Token:', this.fcmToken);
      return this.fcmToken;
    } catch (error) {
      console.warn('Failed to get FCM token:', error);
      return null;
    }
  }

  private setupMessageHandlers(): void {
    console.log('Setting up message handlers...');
    // In production, this would set up Firebase message handlers
  }

  private handleNotification(remoteMessage: MockRemoteMessage): void {
    const notification: Notification = {
      id: remoteMessage.messageId || `notif_${Date.now()}`,
      userId: '', // Will be set based on current user
      type: this.getNotificationType(remoteMessage.data?.type),
      title: remoteMessage.notification?.title || 'New Notification',
      message: remoteMessage.notification?.body || '',
      data: remoteMessage.data,
      isRead: false,
      deepLink: remoteMessage.data?.deepLink,
      imageUrl: remoteMessage.notification?.android?.imageUrl || remoteMessage.notification?.ios?.attachments?.[0]?.url,
      createdAt: new Date(),
    };

    // Add to Redux store
    store.dispatch(addNotification(notification));
  }

  private handleNotificationTap(remoteMessage: MockRemoteMessage): void {
    const deepLink = remoteMessage.data?.deepLink;
    if (deepLink) {
      console.log('Handling deep link:', deepLink);
    }
  }

  private getNotificationType(type?: string): NotificationType {
    switch (type) {
      case 'order_update':
        return 'order_update';
      case 'service_update':
        return 'service_update';
      case 'promotional':
        return 'promotional';
      case 'payment':
        return 'payment';
      case 'reminder':
        return 'reminder';
      default:
        return 'system';
    }
  }

  createLocalNotification(
    type: NotificationType,
    title: string,
    message: string,
    data?: any
  ): void {
    const notification: Notification = {
      id: `local_${Date.now()}`,
      userId: '', // Will be set based on current user
      type,
      title,
      message,
      data,
      isRead: false,
      createdAt: new Date(),
    };

    store.dispatch(addNotification(notification));
  }

  // Subscribe to topics
  async subscribeToTopic(topic: string): Promise<void> {
    try {
      console.log(`Subscribed to topic: ${topic}`);
      // In production: await messaging().subscribeToTopic(topic);
    } catch (error) {
      console.warn(`Failed to subscribe to topic ${topic}:`, error);
    }
  }

  // Unsubscribe from topics
  async unsubscribeFromTopic(topic: string): Promise<void> {
    try {
      console.log(`Unsubscribed from topic: ${topic}`);
      // In production: await messaging().unsubscribeFromTopic(topic);
    } catch (error) {
      console.warn(`Failed to unsubscribe from topic ${topic}:`, error);
    }
  }

  // Get FCM token for backend registration
  getFCMTokenForBackend(): string | null {
    return this.fcmToken;
  }

  // Create demo notifications for testing
  createDemoNotifications(): void {
    setTimeout(() => {
      this.createLocalNotification(
        'order_update',
        'Order Confirmed! 🎉',
        'Your order from Sharma Kirana Store has been confirmed and will be delivered in 30 minutes.'
      );
    }, 3000);

    setTimeout(() => {
      this.createLocalNotification(
        'service_update',
        'Service Provider On The Way 🚗',
        'Ram Kumar (Plumber) is heading to your location. ETA: 15 minutes.'
      );
    }, 6000);

    setTimeout(() => {
      this.createLocalNotification(
        'promotional',
        'Special Offer! 💰',
        'Get 20% off on your next grocery order. Use code SAVE20. Valid till midnight!'
      );
    }, 9000);
  }
}