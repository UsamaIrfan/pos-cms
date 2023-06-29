// import NotificationHelper from 'Helpers/NotificationHelper';
import { REDUCER_PATHS, SERVICE_TAGS } from '@utils/enums';

import { createApi, customizeBaseQuery } from './api';
import { API_SECTION } from '../config/webServices';

const sectionApi = createApi({
  reducerPath: REDUCER_PATHS.section,
  baseQuery: customizeBaseQuery(),
  tagTypes: [SERVICE_TAGS.SECTION],
  endpoints: (builder) => ({
    sections: builder.query({
      query: (params) => ({
        url: API_SECTION,
        method: 'GET',
        params
      }),
      providesTags: [SERVICE_TAGS.SECTION]
    }),
    createSection: builder.mutation({
      query: (body) => ({
        url: API_SECTION,
        method: 'POST',
        body
      }),
      providesTags: [SERVICE_TAGS.SECTION],
      invalidatesTags: [SERVICE_TAGS.SECTION]
    }),
    updateSection: builder.mutation({
      query: (body) => ({
        url: `${API_SECTION}/${body?.id}`,
        method: 'PUT',
        body
      }),
      providesTags: [SERVICE_TAGS.SECTION],
      invalidatesTags: [SERVICE_TAGS.SECTION]
    }),
    removeSection: builder.mutation({
      query: (body) => ({
        url: `${API_SECTION}/${body?.id}`,
        method: 'DELETE',
        body
      }),
      providesTags: [SERVICE_TAGS.SECTION],
      invalidatesTags: [SERVICE_TAGS.SECTION]
    }),
    section: builder.query({
      query: (body) => ({
        url: `${API_SECTION}/${body?.id}`,
        method: 'GET',
        body
      }),
      providesTags: [SERVICE_TAGS.SECTION],
      invalidatesTags: [SERVICE_TAGS.SECTION]
    })
  })
});

export default sectionApi;
export const {
  useSectionsQuery,
  useCreateSectionMutation,
  useUpdateSectionMutation,
  useRemoveSectionMutation,
  useSectionQuery
} = sectionApi;
