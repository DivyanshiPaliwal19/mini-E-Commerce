import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  stock: number;
  brand?: string;
  discountPercentage?: number;
}

interface CartState {
  items: CartItem[];
  promoCode: string;
  promoDiscount: number;
}

const initialState: CartState = {
  items: [],
  promoCode: '',
  promoDiscount: 0,
};

// Fake promo codes
const promoCodes: Record<string, number> = {
  'SAVE10': 10,
  'WELCOME20': 20,
  'SUMMER15': 15,
  'FIRST25': 25,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => 
          item.id === action.payload.id && 
          item.color === action.payload.color && 
          item.size === action.payload.size
      );

      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + action.payload.quantity,
          existingItem.stock
        );
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number; color: string; size: string }>) => {
      state.items = state.items.filter(
        item => !(
          item.id === action.payload.id && 
          item.color === action.payload.color && 
          item.size === action.payload.size
        )
      );
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; color: string; size: string; quantity: number }>) => {
      const item = state.items.find(
        item => 
          item.id === action.payload.id && 
          item.color === action.payload.color && 
          item.size === action.payload.size
      );
      
      if (item) {
        item.quantity = Math.min(Math.max(action.payload.quantity, 1), item.stock);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.promoCode = '';
      state.promoDiscount = 0;
    },
    applyPromoCode: (state, action: PayloadAction<string>) => {
      const code = action.payload.toUpperCase();
      if (promoCodes[code]) {
        state.promoCode = code;
        state.promoDiscount = promoCodes[code];
      }
    },
    removePromoCode: (state) => {
      state.promoCode = '';
      state.promoDiscount = 0;
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  applyPromoCode, 
  removePromoCode 
} = cartSlice.actions;

export default cartSlice.reducer;