import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import cartReducer from './cart/reducers';
import userReducer from './user/reducers';

const combineReducer = combineReducers({ cart: cartReducer, user: userReducer });

const store = configureStore({
  reducer: combineReducer,
  devTools: process.env.NODE_ENV !== 'production',

  // without using the Thunk middleware,
  // we‘d get an error in the browser’s console reading
  // a non-serializable value was detected in the state.
  middleware: [thunk],
});

export default store;
