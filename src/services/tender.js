// import NotificationHelper from 'Helpers/NotificationHelper';
import { REDUCER_PATHS, SERVICE_TAGS } from '@utils/enums';

import { createApi, customizeBaseQuery } from './api';
import { API_TENDER } from '../config/webServices';

const tenderApi = createApi({
  reducerPath: REDUCER_PATHS.tender,
  baseQuery: customizeBaseQuery(),
  tagTypes: [SERVICE_TAGS.TENDER],
  endpoints: (builder) => ({
    tenders: builder.query({
      query: (params) => ({
        url: API_TENDER,
        method: 'GET',
        params
      }),
      providesTags: [SERVICE_TAGS.TENDER]
    }),
    createTender: builder.mutation({
      query: (body) => ({
        url: API_TENDER,
        method: 'POST',
        body
      }),
      providesTags: [SERVICE_TAGS.TENDER],
      invalidatesTags: [SERVICE_TAGS.TENDER]
    })
  })
});

export default tenderApi;
export const { useTendersQuery, useCreateTenderMutation } = tenderApi;
