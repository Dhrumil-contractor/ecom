import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { clearOrders, createOrder } from './action';

const initialState = { orders: [] };

export default createReducer(initialState, (builder) => {
  builder.addCase(createOrder, (state, action) => {
    const order_id = uuidv4();
    state.orders = [{ order_id, ...action.payload }, ...state.orders];
  });
  builder.addCase(clearOrders, (state, action) => {
    state.orders = [];
  });
});
