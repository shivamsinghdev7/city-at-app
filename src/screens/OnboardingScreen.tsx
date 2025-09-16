import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type OnboardingNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Welcome to City At',
    description: 'Your one-stop solution for all city services and local stores',
    icon: '🏙️',
  },
  {
    id: 2,
    title: 'Book Services',
    description: 'Find and book trusted service providers for plumbing, electrical, cleaning and more',
    icon: '🔧',
  },
  {
    id: 3,
    title: 'Shop Local',
    description: 'Order from nearby kirana stores and get fresh products delivered to your door',
    icon: '🛒',
  },
  {
    id: 4,
    title: 'Real-time Updates',
    description: 'Track your orders and service bookings with live updates and notifications',
    icon: '📱',
  },
];

const OnboardingScreen: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigation = useNavigation<OnboardingNavigationProp>();

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.replace('Auth');
    }
  };

  const skipOnboarding = () => {
    navigation.replace('Auth');
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slide Content */}
      <View style={styles.slideContainer}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{currentSlideData.icon}</Text>
        </View>
        
        <Text style={styles.title}>{currentSlideData.title}</Text>
        <Text style={styles.description}>{currentSlideData.description}</Text>
      </View>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              currentSlide === index && styles.activeDot,
            ]}
            onPress={() => goToSlide(index)}
          />
        ))}
      </View>

      {/* Next/Get Started Button */}
      <TouchableOpacity style={styles.nextButton} onPress={nextSlide}>
        <Text style={styles.nextButtonText}>
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  skipButton: {
    alignSelf: 'flex-end',
    paddingTop: 50,
    paddingBottom: 20,
  },
  skipText: {
    fontSize: 16,
    color: '#666666',
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    fontSize: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007AFF',
    width: 24,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnboardingScreen;