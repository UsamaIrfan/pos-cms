// import NotificationHelper from 'Helpers/NotificationHelper';
import { REDUCER_PATHS, SERVICE_TAGS } from '@utils/enums';

import { createApi, customizeBaseQuery } from './api';
import { API_SECTION_ITEMS } from '../config/webServices';

const sectionItemsApi = createApi({
  reducerPath: REDUCER_PATHS.sectionItems,
  baseQuery: customizeBaseQuery(),
  tagTypes: [SERVICE_TAGS.SECTION_ITEMS],
  endpoints: (builder) => ({
    sectionItems: builder.query({
      query: (params) => ({
        url: API_SECTION_ITEMS,
        method: 'GET',
        params
      }),
      providesTags: [SERVICE_TAGS.SECTION_ITEMS]
    }),
    createSectionItem: builder.mutation({
      query: (body) => ({
        url: API_SECTION_ITEMS,
        method: 'POST',
        body
      }),
      providesTags: [SERVICE_TAGS.SECTION_ITEMS],
      invalidatesTags: [SERVICE_TAGS.SECTION_ITEMS]
    }),
    updateSectionItem: builder.mutation({
      query: (body) => ({
        url: `${API_SECTION_ITEMS}/${body?.id}`,
        method: 'PUT',
        body
      }),
      providesTags: [SERVICE_TAGS.SECTION_ITEMS],
      invalidatesTags: [SERVICE_TAGS.SECTION_ITEMS]
    }),
    removeSectionItem: builder.mutation({
      query: (body) => ({
        url: `${API_SECTION_ITEMS}/${body?.id}`,
        method: 'DELETE',
        body
      }),
      providesTags: [SERVICE_TAGS.SECTION_ITEMS],
      invalidatesTags: [SERVICE_TAGS.SECTION_ITEMS]
    }),
    sectionItem: builder.query({
      query: (body) => ({
        url: `${API_SECTION_ITEMS}/${body?.id}`,
        method: 'GET',
        body
      }),
      providesTags: [SERVICE_TAGS.SECTION_ITEMS],
      invalidatesTags: [SERVICE_TAGS.SECTION_ITEMS]
    })
  })
});

export default sectionItemsApi;
export const {
  useSectionItemsQuery,
  useCreateSectionItemMutation,
  useUpdateSectionItemMutation,
  useRemoveSectionItemMutation,
  useSectionItemQuery
} = sectionItemsApi;
