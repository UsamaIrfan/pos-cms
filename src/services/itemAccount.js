// import NotificationHelper from 'Helpers/NotificationHelper';
import { REDUCER_PATHS, SERVICE_TAGS } from '@utils/enums';

import { createApi, customizeBaseQuery } from './api';
import { API_ITEM_ACCOUNT } from '../config/webServices';

const itemAccountApi = createApi({
  reducerPath: REDUCER_PATHS.itemAccount,
  baseQuery: customizeBaseQuery(),
  tagTypes: [SERVICE_TAGS.ITEM_ACCOUNT],
  endpoints: (builder) => ({
    itemAccounts: builder.query({
      query: (params) => ({
        url: API_ITEM_ACCOUNT,
        method: 'GET',
        params,
      }),
      providesTags: [SERVICE_TAGS.ITEM_ACCOUNT],
    }),
    allItemAccounts: builder.query({
      query: (params) => ({
        url: `${API_ITEM_ACCOUNT}/all`,
        method: 'GET',
        params,
      }),
      providesTags: [SERVICE_TAGS.ITEM_ACCOUNT],
    }),
    createItemAccount: builder.mutation({
      query: (body) => ({
        url: API_ITEM_ACCOUNT,
        method: 'POST',
        body,
      }),
      providesTags: [SERVICE_TAGS.ITEM_ACCOUNT],
      invalidatesTags: [SERVICE_TAGS.ITEM_ACCOUNT],
    }),
    updateItemAccount: builder.mutation({
      query: (body) => ({
        url: `${API_ITEM_ACCOUNT}/${body?.id}`,
        method: 'PUT',
        body,
      }),
      providesTags: [SERVICE_TAGS.ITEM_ACCOUNT],
      invalidatesTags: [SERVICE_TAGS.ITEM_ACCOUNT],
    }),
  }),
});

export default itemAccountApi;
export const {
  useItemAccountsQuery,
  useAllItemAccountsQuery,
  useLazyItemAccountsQuery,
  useLazyAllItemAccountsQuery,
  useCreateItemAccountMutation,
  useUpdateItemAccountMutation,
} = itemAccountApi;
