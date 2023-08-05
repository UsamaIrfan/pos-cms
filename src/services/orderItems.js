// import NotificationHelper from 'Helpers/NotificationHelper';
import { REDUCER_PATHS, SERVICE_TAGS } from '@utils/enums';

import { createApi, customizeBaseQuery } from './api';
import { API_ORDER_ITEMS } from '../config/webServices';

const orderItemsApi = createApi({
  reducerPath: REDUCER_PATHS.sectionItems,
  baseQuery: customizeBaseQuery(),
  tagTypes: [SERVICE_TAGS.SECTION_ITEMS],
  endpoints: (builder) => ({
    orderItems: builder.query({
      query: (params) => ({
        url: API_ORDER_ITEMS,
        method: 'GET',
        params,
      }),
      providesTags: [SERVICE_TAGS.SECTION_ITEMS],
    }),
    createOrderItem: builder.mutation({
      query: (body) => ({
        url: API_ORDER_ITEMS,
        method: 'POST',
        body,
      }),
      providesTags: [SERVICE_TAGS.SECTION_ITEMS],
      invalidatesTags: [SERVICE_TAGS.SECTION_ITEMS],
    }),
    updateOrderItem: builder.mutation({
      query: (body) => ({
        url: `${API_ORDER_ITEMS}/${body?.id}`,
        method: 'PUT',
        body,
      }),
      providesTags: [SERVICE_TAGS.SECTION_ITEMS],
      invalidatesTags: [SERVICE_TAGS.SECTION_ITEMS],
    }),
    removeOrderItem: builder.mutation({
      query: (body) => ({
        url: `${API_ORDER_ITEMS}/${body?.id}`,
        method: 'DELETE',
        body,
      }),
      providesTags: [SERVICE_TAGS.SECTION_ITEMS],
      invalidatesTags: [SERVICE_TAGS.SECTION_ITEMS],
    }),
    orderItem: builder.query({
      query: (body) => ({
        url: `${API_ORDER_ITEMS}/${body?.id}`,
        method: 'GET',
        body,
      }),
      providesTags: [SERVICE_TAGS.SECTION_ITEMS],
      invalidatesTags: [SERVICE_TAGS.SECTION_ITEMS],
    }),
  }),
});

export default orderItemsApi;
export const {
  useOrderItemsQuery,
  useCreateOrderItemMutation,
  useUpdateOrderItemMutation,
  useRemoveOrderItemMutation,
  useOrderItemQuery,
} = orderItemsApi;
