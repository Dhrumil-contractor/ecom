import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import cartReducer from './cart/reducers';
import userReducer from './user/reducers';
import orderReducer from './orders/reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const combineReducer = combineReducers({ cart: cartReducer, user: userReducer, orders: orderReducer });

const rootReducer = persistReducer(persistConfig, combineReducer);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',

  // without using the Thunk middleware,
  // we‘d get an error in the browser’s console reading
  // a non-serializable value was detected in the state.
  middleware: [thunk],
});

export const persistor = persistStore(store);
export default store;
