import { createReducer } from '@reduxjs/toolkit';
import { addToCart, emptyCart, removeFromCart } from './actions';

const initialState = { cart: [] };

export default createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      if (state.cart.findIndex((item) => item.id === action.payload.id) === -1) {
        state.cart.push(action.payload);
      }
    })
    .addCase(removeFromCart, (state, action) => {
      state.cart = state.cart.filter((item) => item !== action.payload);
    })
    .addCase(emptyCart, (state) => {
      state.cart = [];
    });
});
