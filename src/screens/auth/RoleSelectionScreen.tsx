import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import { User } from '../../types';

interface RoleOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  role: User['role'];
}

const roleOptions: RoleOption[] = [
  {
    id: '1',
    title: 'Customer',
    description: 'Book services and shop from local stores',
    icon: '🛍️',
    role: 'customer',
  },
  {
    id: '2',
    title: 'Service Provider',
    description: 'Offer your services to customers',
    icon: '🔧',
    role: 'service_provider',
  },
  {
    id: '3',
    title: 'Store Owner',
    description: 'Sell products through your store',
    icon: '🏪',
    role: 'store_owner',
  },
];

const RoleSelectionScreen: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<User['role'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRoleSelection = (role: User['role']) => {
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    if (!selectedRole) {
      Alert.alert('Error', 'Please select your role to continue');
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, this would save the role to backend
      // For demo purposes, create a mock user
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        phone: '9876543210',
        role: selectedRole,
        addresses: [],
        preferences: {
          language: 'en',
          notifications: {
            pushNotifications: true,
            emailNotifications: true,
            smsNotifications: true,
            orderUpdates: true,
            promotionalOffers: true,
            serviceReminders: true,
          },
          preferredCities: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      dispatch(loginSuccess({
        user: mockUser,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
      }));

      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to complete setup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>
          Select how you'd like to use the app
        </Text>
      </View>

      <View style={styles.roleContainer}>
        {roleOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.roleOption,
              selectedRole === option.role && styles.selectedRole,
            ]}
            onPress={() => handleRoleSelection(option.role)}
          >
            <View style={styles.roleIconContainer}>
              <Text style={styles.roleIcon}>{option.icon}</Text>
            </View>
            <View style={styles.roleContent}>
              <Text style={styles.roleTitle}>{option.title}</Text>
              <Text style={styles.roleDescription}>{option.description}</Text>
            </View>
            <View style={styles.radioContainer}>
              <View
                style={[
                  styles.radioButton,
                  selectedRole === option.role && styles.radioButtonSelected,
                ]}
              >
                {selectedRole === option.role && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.continueButton, isLoading && styles.disabledButton]}
        onPress={handleContinue}
        disabled={isLoading}
      >
        <Text style={styles.continueButtonText}>
          {isLoading ? 'Setting up...' : 'Continue'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        You can change your role later in the app settings
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  roleContainer: {
    flex: 1,
    marginBottom: 32,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  selectedRole: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  roleIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleIcon: {
    fontSize: 30,
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  radioContainer: {
    marginLeft: 16,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#007AFF',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default RoleSelectionScreen;