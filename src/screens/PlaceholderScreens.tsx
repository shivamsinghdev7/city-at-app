// Placeholder screens for navigation

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ServiceDetailsScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Service Details</Text>
  </View>
);

export const StoreDetailsScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Store Details</Text>
  </View>
);

export const ProductDetailsScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Product Details</Text>
  </View>
);

export const OrderDetailsScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Order Details</Text>
  </View>
);

export const BookingDetailsScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Booking Details</Text>
  </View>
);

export const ChatScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Chat</Text>
  </View>
);

export const NotificationsScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Notifications</Text>
  </View>
);

export const SearchScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Search</Text>
  </View>
);

export const EditProfileScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Edit Profile</Text>
  </View>
);

export const AddAddressScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Add Address</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
});