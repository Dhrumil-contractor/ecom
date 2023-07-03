import { createReducer } from '@reduxjs/toolkit';
import { addUser, removeUser } from './actions';

const initialState = { user: {} };

export default createReducer(initialState, (builder) => {
  builder
    .addCase(addUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(removeUser, (state, action) => {
      state.user = {};
    });
});
