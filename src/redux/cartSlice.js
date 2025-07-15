import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem('cartItems') || '[]')
  },
  reducers: {
    addToCart: (state, action) => {
      const exist = state.items.find(i => i.product === action.payload.product);
      if (exist) {
        exist.qty = action.payload.qty;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.product !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems'); // ✅ Clear from localStorage too
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
