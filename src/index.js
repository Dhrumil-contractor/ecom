import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PageRoutes from './Routes';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PageRoutes />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
