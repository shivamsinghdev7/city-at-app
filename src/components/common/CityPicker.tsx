import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootState } from '../../store';
import {
  setCurrentLocation,
  setSelectedCity,
  setLocationLoading,
  setLocationError,
} from '../../store/slices/locationSlice';
import { LocationService } from '../../services/LocationService';
import { City } from '../../types';

interface CityPickerProps {
  visible: boolean;
  onClose: () => void;
}

// Mock cities data - in real app, this would come from API
const mockCities: City[] = [
  {
    id: '1',
    name: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    coordinates: { latitude: 19.0760, longitude: 72.8777 },
    isServiceable: true,
  },
  {
    id: '2',
    name: 'Delhi',
    state: 'Delhi',
    country: 'India',
    coordinates: { latitude: 28.6139, longitude: 77.2090 },
    isServiceable: true,
  },
  {
    id: '3',
    name: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    coordinates: { latitude: 12.9716, longitude: 77.5946 },
    isServiceable: true,
  },
  {
    id: '4',
    name: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    coordinates: { latitude: 17.3850, longitude: 78.4867 },
    isServiceable: true,
  },
  {
    id: '5',
    name: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    coordinates: { latitude: 13.0827, longitude: 80.2707 },
    isServiceable: true,
  },
  {
    id: '6',
    name: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    coordinates: { latitude: 22.5726, longitude: 88.3639 },
    isServiceable: true,
  },
  {
    id: '7',
    name: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    coordinates: { latitude: 18.5204, longitude: 73.8567 },
    isServiceable: true,
  },
  {
    id: '8',
    name: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    coordinates: { latitude: 23.0225, longitude: 72.5714 },
    isServiceable: true,
  },
];

const CityPicker: React.FC<CityPickerProps> = ({ visible, onClose }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredCities, setFilteredCities] = useState<City[]>(mockCities);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  
  const dispatch = useDispatch();
  const { recentCities } = useSelector((state: RootState) => state.location);

  useEffect(() => {
    const filtered = mockCities.filter(city =>
      city.name.toLowerCase().includes(searchText.toLowerCase()) ||
      city.state.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [searchText]);

  const handleCitySelect = (city: City) => {
    dispatch(setSelectedCity(city));
    onClose();
  };

  const handleDetectLocation = async () => {
    setIsDetectingLocation(true);
    dispatch(setLocationLoading(true));

    try {
      const location = await LocationService.getCurrentPosition();
      if (location) {
        dispatch(setCurrentLocation(location));
        
        // Find nearest city based on coordinates
        let nearestCity = mockCities[0];
        let minDistance = LocationService.calculateDistance(
          location.latitude,
          location.longitude,
          nearestCity.coordinates.latitude,
          nearestCity.coordinates.longitude
        );

        mockCities.forEach(city => {
          const distance = LocationService.calculateDistance(
            location.latitude,
            location.longitude,
            city.coordinates.latitude,
            city.coordinates.longitude
          );
          if (distance < minDistance) {
            minDistance = distance;
            nearestCity = city;
          }
        });

        if (minDistance < 50) { // Within 50km
          dispatch(setSelectedCity(nearestCity));
          onClose();
        } else {
          Alert.alert(
            'Location Not Serviceable',
            'We currently don\'t provide services in your area. Please select a nearby city.',
            [{ text: 'OK' }]
          );
        }
      } else {
        Alert.alert(
          'Location Error',
          'Could not detect your location. Please select a city manually.'
        );
      }
    } catch (error) {
      console.warn('Location detection error:', error);
      dispatch(setLocationError('Failed to detect location'));
      Alert.alert(
        'Error',
        'Failed to detect your location. Please try again or select a city manually.'
      );
    } finally {
      setIsDetectingLocation(false);
      dispatch(setLocationLoading(false));
    }
  };

  const renderCityItem = ({ item }: { item: City }) => (
    <TouchableOpacity
      style={styles.cityItem}
      onPress={() => handleCitySelect(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cityInfo}>
        <Text style={styles.cityName}>{item.name}</Text>
        <Text style={styles.cityState}>{item.state}, {item.country}</Text>
        {!item.isServiceable && (
          <Text style={styles.notServiceable}>Not serviceable</Text>
        )}
      </View>
      {item.isServiceable && (
        <Icon name="chevron-right" size={20} color="#BDC3C7" />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Choose Location</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color="#636E72" />
          </TouchableOpacity>
        </View>

        {/* Detect Location Button */}
        <TouchableOpacity
          style={[
            styles.detectLocationButton,
            isDetectingLocation && styles.detectLocationButtonDisabled
          ]}
          onPress={handleDetectLocation}
          disabled={isDetectingLocation}
          activeOpacity={0.8}
        >
          <Icon 
            name="my-location" 
            size={20} 
            color={isDetectingLocation ? "#BDC3C7" : "#F39C12"} 
          />
          <Text style={[
            styles.detectLocationText,
            isDetectingLocation && styles.disabledText
          ]}>
            {isDetectingLocation ? 'Detecting your location...' : 'Use current location'}
          </Text>
          {isDetectingLocation && (
            <ActivityIndicator size="small" color="#F39C12" />
          )}
        </TouchableOpacity>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search city or state"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Recent Cities */}
        {recentCities.length > 0 && searchText === '' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Cities</Text>
            {recentCities.map((city: City) => (
              <TouchableOpacity
                key={`recent-${city.id}`}
                style={styles.cityItem}
                onPress={() => handleCitySelect(city)}
              >
                <View style={styles.cityInfo}>
                  <Text style={styles.cityName}>{city.name}</Text>
                  <Text style={styles.cityState}>{city.state}, {city.country}</Text>
                </View>
                <Icon name="history" size={16} color="#666666" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* All Cities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {searchText ? 'Search Results' : 'All Cities'}
          </Text>
          <FlatList
            data={filteredCities}
            renderItem={renderCityItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            style={styles.cityList}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3436',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  detectLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFF7E8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F39C12',
  },
  detectLocationButtonDisabled: {
    backgroundColor: '#F8F9FA',
    borderColor: '#BDC3C7',
  },
  detectLocationText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#F39C12',
    flex: 1,
    fontWeight: '600',
  },
  disabledText: {
    color: '#BDC3C7',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#2D3436',
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#636E72',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#FAFBFC',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cityList: {
    flex: 1,
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
    backgroundColor: '#FFFFFF',
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  cityState: {
    fontSize: 14,
    color: '#636E72',
  },
  notServiceable: {
    fontSize: 12,
    color: '#E17055',
    fontWeight: '600',
    backgroundColor: '#FFF2F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
});

export default CityPicker;