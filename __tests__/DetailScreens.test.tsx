/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderDetailsScreen from '../src/screens/orders/OrderDetailsScreen';
import BookingDetailsScreen from '../src/screens/services/BookingDetailsScreen';

const Stack = createNativeStackNavigator();

const OrderDetailsWrapper = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="OrderDetails" 
        component={OrderDetailsScreen}
        initialParams={{ orderId: '1' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const BookingDetailsWrapper = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="BookingDetails" 
        component={BookingDetailsScreen}
        initialParams={{ bookingId: '1' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

test('OrderDetailsScreen renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<OrderDetailsWrapper />);
  });
});

test('BookingDetailsScreen renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<BookingDetailsWrapper />);
  });
});