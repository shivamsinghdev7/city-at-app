import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, OrderItem } from '../../types';

interface CartItem extends OrderItem {
  product: Product;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  itemCount: number;
  storeId: string | null;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  itemCount: 0,
  storeId: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload;
      
      // Check if adding from different store
      if (state.storeId && state.storeId !== product.storeId) {
        // Clear cart if switching stores
        state.items = [];
        state.totalAmount = 0;
        state.itemCount = 0;
      }
      
      state.storeId = product.storeId;
      
      const existingCartItem = state.items.find(cartItem => cartItem.productId === product.id);
      
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        const newItem: CartItem = {
          id: `cart_${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.discountPrice || product.price,
          quantity,
          product,
        };
        state.items.push(newItem);
      }
      
      // Recalculate totals
      state.totalAmount = state.items.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
      state.itemCount = state.items.reduce((count, cartItem) => count + cartItem.quantity, 0);
    },
    
    updateQuantity: (state, action: PayloadAction<{ itemId: string; quantity: number }>) => {
      const { itemId, quantity } = action.payload;
      const targetItem = state.items.find(cartItem => cartItem.id === itemId);
      
      if (targetItem) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter(cartItem => cartItem.id !== itemId);
        } else {
          targetItem.quantity = quantity;
        }
        
        // Recalculate totals
        state.totalAmount = state.items.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
        state.itemCount = state.items.reduce((count, cartItem) => count + cartItem.quantity, 0);
        
        // Clear store if no items
        if (state.items.length === 0) {
          state.storeId = null;
        }
      }
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.items = state.items.filter(cartItem => cartItem.id !== itemId);
      
      // Recalculate totals
      state.totalAmount = state.items.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
      state.itemCount = state.items.reduce((count, cartItem) => count + cartItem.quantity, 0);
      
      // Clear store if no items
      if (state.items.length === 0) {
        state.storeId = null;
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.itemCount = 0;
      state.storeId = null;
    },
    
    addSpecialInstructions: (state, action: PayloadAction<{ itemId: string; instructions: string }>) => {
      const { itemId, instructions } = action.payload;
      const targetItem = state.items.find(cartItem => cartItem.id === itemId);
      
      if (targetItem) {
        targetItem.specialInstructions = instructions;
      }
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  addSpecialInstructions,
} = cartSlice.actions;

export default cartSlice.reducer;