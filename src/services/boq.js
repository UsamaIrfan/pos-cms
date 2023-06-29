// import NotificationHelper from 'Helpers/NotificationHelper';
import { REDUCER_PATHS, SERVICE_TAGS } from '@utils/enums';

import { createApi, customizeBaseQuery } from './api';
import { API_BOQ } from '../config/webServices';

const boqApi = createApi({
  reducerPath: REDUCER_PATHS.boq,
  baseQuery: customizeBaseQuery(),
  tagTypes: [SERVICE_TAGS.BOQ],
  endpoints: (builder) => ({
    boqs: builder.query({
      query: (params) => ({
        url: API_BOQ,
        method: 'GET',
        params
      }),
      providesTags: [SERVICE_TAGS.BOQ]
    }),
    createBoq: builder.mutation({
      query: (body) => ({
        url: API_BOQ,
        method: 'POST',
        body
      }),
      providesTags: [SERVICE_TAGS.BOQ],
      invalidatesTags: [SERVICE_TAGS.BOQ]
    }),
    updateBoq: builder.mutation({
      query: (body) => ({
        url: `${API_BOQ}/${body?.id}`,
        method: 'PUT',
        body
      }),
      providesTags: [SERVICE_TAGS.BOQ],
      invalidatesTags: [SERVICE_TAGS.BOQ]
    })
  })
});

export default boqApi;
export const { useBoqsQuery, useCreateBoqMutation, useUpdateBoqMutation } =
  boqApi;
