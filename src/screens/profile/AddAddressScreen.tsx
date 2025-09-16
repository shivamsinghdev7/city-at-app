import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddAddressScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Address</Text>
      <Text style={styles.subtitle}>Add a new delivery address</Text>
    </View>
  );
};

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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
});

export default AddAddressScreen;