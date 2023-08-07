/* eslint-disable no-undef */
import { configureStore as reduxConfigureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import orderItemsApi from '@services/orderItems';

import {
  companyApi,
  itemAccountApi,
  itemTransactionApi,
  masterAccountApi,
  orderApi,
  userApi,
} from '../services';
// import auth from '../Slices/authSlice';
import combineReducer from '../slices';

// import { createLogger } from 'redux-logger';
// const isDebuggingInChrome = window.location.hostname === 'localhost';
// const logger = createLogger({
//   predicate: () => isDebuggingInChrome,
//   collapsed: true,
//   duration: true,
//   diff: true
// });

export const store = () => {
  const cs = reduxConfigureStore({
    reducer: {
      ...combineReducer,
      [userApi.reducerPath]: userApi.reducer,
      [masterAccountApi.reducerPath]: masterAccountApi.reducer,
      [companyApi.reducerPath]: companyApi.reducer,
      [itemAccountApi.reducerPath]: itemAccountApi.reducer,
      [orderApi.reducerPath]: orderApi.reducer,
      [orderItemsApi.reducerPath]: orderItemsApi.reducer,
      [itemTransactionApi.reducerPath]: itemTransactionApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        userApi.middleware,
        masterAccountApi.middleware,
        companyApi.middleware,
        itemAccountApi.middleware,
        orderApi.middleware,
        orderItemsApi.middleware,
        itemTransactionApi.middleware
      ),
    devTools: process.env.NODE_ENV === 'development',
  });

  return cs;
};

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store().dispatch);
