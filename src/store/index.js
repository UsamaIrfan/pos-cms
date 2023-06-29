/* eslint-disable no-undef */
import { configureStore as reduxConfigureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import sectionItemsApi from '@services/sectionItems';

import {
  boqApi,
  companyApi,
  sectionApi,
  tenderApi,
  userApi
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
      [tenderApi.reducerPath]: tenderApi.reducer,
      [companyApi.reducerPath]: companyApi.reducer,
      [boqApi.reducerPath]: boqApi.reducer,
      [sectionApi.reducerPath]: sectionApi.reducer,
      [sectionItemsApi.reducerPath]: sectionItemsApi.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        userApi.middleware,
        tenderApi.middleware,
        companyApi.middleware,
        boqApi.middleware,
        sectionApi.middleware,
        sectionItemsApi.middleware
      ),
    devTools: process.env.NODE_ENV === 'development'
  });

  return cs;
};

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store().dispatch);
