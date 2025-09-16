import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location, City } from '../../types';

interface LocationState {
  currentLocation: Location | null;
  selectedCity: City | null;
  recentCities: City[];
  isLocationEnabled: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  currentLocation: null,
  selectedCity: null,
  recentCities: [],
  isLocationEnabled: false,
  isLoading: false,
  error: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<Location>) => {
      state.currentLocation = action.payload;
      state.isLocationEnabled = true;
      state.error = null;
    },
    setSelectedCity: (state, action: PayloadAction<City>) => {
      state.selectedCity = action.payload;
      
      // Add to recent cities if not already present
      const existingIndex = state.recentCities.findIndex(city => city.id === action.payload.id);
      if (existingIndex === -1) {
        state.recentCities.unshift(action.payload);
        // Keep only last 5 recent cities
        state.recentCities = state.recentCities.slice(0, 5);
      } else {
        // Move to front if already exists
        const [city] = state.recentCities.splice(existingIndex, 1);
        state.recentCities.unshift(city);
      }
    },
    setLocationLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLocationError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setLocationEnabled: (state, action: PayloadAction<boolean>) => {
      state.isLocationEnabled = action.payload;
    },
    clearLocationError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCurrentLocation,
  setSelectedCity,
  setLocationLoading,
  setLocationError,
  setLocationEnabled,
  clearLocationError,
} = locationSlice.actions;

export default locationSlice.reducer;