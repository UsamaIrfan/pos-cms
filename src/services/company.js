// import NotificationHelper from 'Helpers/NotificationHelper';
import { REDUCER_PATHS, SERVICE_TAGS } from '@utils/enums';

import { createApi, customizeBaseQuery } from './api';
import { API_COMPANY } from '../config/webServices';

const companyApi = createApi({
  reducerPath: REDUCER_PATHS.company,
  baseQuery: customizeBaseQuery(),
  tagTypes: [SERVICE_TAGS.COMPANY],
  endpoints: (builder) => ({
    companies: builder.query({
      query: (params) => ({
        url: API_COMPANY,
        method: 'GET',
        params
      }),
      providesTags: [SERVICE_TAGS.COMPANY]
    }),
    createCompany: builder.mutation({
      query: (body) => ({
        url: API_COMPANY,
        method: 'POST',
        body
      }),
      providesTags: [SERVICE_TAGS.COMPANY],
      invalidatesTags: [SERVICE_TAGS.COMPANY]
    }),

    company: builder.query({
      query: (id) => ({
        url: `${API_COMPANY}/${id}`,
        method: 'GET'
      }),
      providesTags: [SERVICE_TAGS.COMPANY]
    })
  })
});

export default companyApi;
export const { useCompaniesQuery, useCreateCompanyMutation, useCompanyQuery } =
  companyApi;
