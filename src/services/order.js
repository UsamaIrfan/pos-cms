// import NotificationHelper from 'Helpers/NotificationHelper';
import { REDUCER_PATHS, SERVICE_TAGS } from '@utils/enums';

import { createApi, customizeBaseQuery } from './api';
import { API_ORDER } from '../config/webServices';

const orderApi = createApi({
  reducerPath: REDUCER_PATHS.order,
  baseQuery: customizeBaseQuery(),
  tagTypes: [SERVICE_TAGS.ORDER],
  endpoints: (builder) => ({
    orders: builder.query({
      query: (params) => ({
        url: API_ORDER,
        method: 'GET',
        params,
      }),
      providesTags: [SERVICE_TAGS.ORDER],
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: API_ORDER,
        method: 'POST',
        body,
      }),
      providesTags: [SERVICE_TAGS.ORDER],
      invalidatesTags: [SERVICE_TAGS.ORDER],
    }),
    updateOrder: builder.mutation({
      query: (body) => ({
        url: `${API_ORDER}/${body?.id}`,
        method: 'PUT',
        body,
      }),
      providesTags: [SERVICE_TAGS.ORDER],
      invalidatesTags: [SERVICE_TAGS.ORDER],
    }),
    removeOrder: builder.mutation({
      query: (body) => ({
        url: `${API_ORDER}/${body?.id}`,
        method: 'DELETE',
        body,
      }),
      providesTags: [SERVICE_TAGS.ORDER],
      invalidatesTags: [SERVICE_TAGS.ORDER],
    }),
    order: builder.query({
      query: (body) => ({
        url: `${API_ORDER}/${body?.id}`,
        method: 'GET',
        body,
      }),
      providesTags: [SERVICE_TAGS.ORDER],
      invalidatesTags: [SERVICE_TAGS.ORDER],
    }),
  }),
});

export default orderApi;
export const {
  useOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useRemoveOrderMutation,
  useOrderQuery,
} = orderApi;
