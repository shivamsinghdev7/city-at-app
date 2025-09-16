import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { RootStackParamList } from '../types';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check authentication state and navigate accordingly
      if (isAuthenticated) {
        navigation.replace('Main');
      } else {
        // Check if user has seen onboarding
        // For now, navigate to onboarding
        navigation.replace('Onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, isAuthenticated]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>🏙️</Text>
        </View>
        <Text style={styles.appName}>City At</Text>
        <Text style={styles.tagline}>Smart City Services</Text>
      </View>
      
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 60,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 16,
  },
});

export default SplashScreen;