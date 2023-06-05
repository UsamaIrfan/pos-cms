// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
// initialize an empty api service that we'll inject endpoints into later as needed
// import { redirect } from 'react-router-dom';
import { baseUrl } from '@config/webServices';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthToken, setAuthToken } from '@utils/auth';
import { message } from 'antd';

const customizeBaseQuery = () => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    // mode: "cors",
    prepareHeaders: (headers) => {
      const { token } = getAuthToken();

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      // headers.set('Content-Type', `application/json`);
      return headers;
    }
  });

  return async (args, api, extraOptions) => {
    const response = await baseQuery(args, api, extraOptions);
    let status = response.meta.response?.status;
    const { data, error } = response;

    if (data?.token) {
      setAuthToken(data?.token);
    }
    /* eslint-disable no-console */
    if (data?.data?.inboxLink)
      alert('Goto this link ===>' + data.data.inboxLink);
    if (error?.status === 'FETCH_ERROR') {
      // TODO: Need to redirect the user
      // redirect('/internetError');
    }

    if (error?.data) {
      notificationFailPopup(error.data);
    } else if (data && status !== 200) {
      notificationSuccessPopup(data);
    }

    return { data, error };
  };
};

const notificationSuccessPopup = (data) => {
  if (data && typeof data === 'string') {
    // NotificationHelper.success(data);
  } else if (data?.message) {
    // NotificationHelper.success(data?.message);
  }
};

const notificationFailPopup = (data) => {
  if (data && data?.message) {
    message.error(data?.message);
    // NotificationHelper.error(data);
  } else if (data?.message) {
    // NotificationHelper.error(data?.message);
  }
};

export { createApi, customizeBaseQuery, fetchBaseQuery };
