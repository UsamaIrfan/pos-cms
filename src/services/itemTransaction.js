// import NotificationHelper from 'Helpers/NotificationHelper';
import { REDUCER_PATHS, SERVICE_TAGS } from '@utils/enums';

import { createApi, customizeBaseQuery } from './api';
import { API_TRANSACTION, API_TRANSACTION_INVEST } from '../config/webServices';

const itemTransactionApi = createApi({
  reducerPath: REDUCER_PATHS.transaction,
  baseQuery: customizeBaseQuery(),
  tagTypes: [SERVICE_TAGS.TRANSACTION, SERVICE_TAGS.ITEM_ACCOUNT],
  endpoints: (builder) => ({
    itemTransactions: builder.query({
      query: (params) => ({
        url: API_TRANSACTION,
        method: 'GET',
        params,
      }),
      providesTags: [SERVICE_TAGS.TRANSACTION],
    }),
    createInvestment: builder.mutation({
      query: (body) => ({
        url: API_TRANSACTION_INVEST,
        method: 'POST',
        body,
      }),
      providesTags: [SERVICE_TAGS.TRANSACTION, SERVICE_TAGS.ITEM_ACCOUNT],
      invalidatesTags: [SERVICE_TAGS.TRANSACTION, SERVICE_TAGS.ITEM_ACCOUNT],
    }),
  }),
});

export default itemTransactionApi;
export const { useItemTransactionsQuery, useCreateInvestmentMutation } =
  itemTransactionApi;
