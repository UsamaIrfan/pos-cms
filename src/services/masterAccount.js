// import NotificationHelper from 'Helpers/NotificationHelper';
import { REDUCER_PATHS, SERVICE_TAGS } from '@utils/enums';

import { createApi, customizeBaseQuery } from './api';
import { API_MASTER_ACCOUNT } from '../config/webServices';

const masterAccountApi = createApi({
  reducerPath: REDUCER_PATHS.masterAccount,
  baseQuery: customizeBaseQuery(),
  tagTypes: [SERVICE_TAGS.MASTER_ACCOUNT],
  endpoints: (builder) => ({
    masterAccounts: builder.query({
      query: (params) => ({
        url: API_MASTER_ACCOUNT,
        method: 'GET',
        params,
      }),
      providesTags: [SERVICE_TAGS.MASTER_ACCOUNT],
    }),
    createMasterAccount: builder.mutation({
      query: (body) => ({
        url: API_MASTER_ACCOUNT,
        method: 'POST',
        body,
      }),
      providesTags: [SERVICE_TAGS.MASTER_ACCOUNT],
      invalidatesTags: [SERVICE_TAGS.MASTER_ACCOUNT],
    }),
    updateMasterAccount: builder.mutation({
      query: (body) => ({
        url: `${API_MASTER_ACCOUNT}/${body?.id}`,
        method: 'PUT',
        body,
      }),
      providesTags: [SERVICE_TAGS.MASTER_ACCOUNT],
      invalidatesTags: [SERVICE_TAGS.MASTER_ACCOUNT],
    }),
  }),
});

export default masterAccountApi;
export const {
  useMasterAccountsQuery,
  useCreateMasterAccountMutation,
  useUpdateMasterAccountMutation,
} = masterAccountApi;
