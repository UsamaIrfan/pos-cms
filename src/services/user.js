// import NotificationHelper from 'Helpers/NotificationHelper';
import { setUser } from '@slices/auth';
import { setAuthCredentials } from '@utils/auth';
import { REDUCER_PATHS } from '@utils/enums';

import { createApi, customizeBaseQuery } from './api';
import {
  API_FORGOT_PASSWORD,
  API_FORGOT_PASSWORD_VERIFY,
  API_LOGIN,
  API_REGISTER,
  API_RESET_PASSWORD,
  API_VERIFY_EMAIL,
  API_VERIFY_EMAIL_RESEND
} from '../config/webServices';

export const updateUserLocally = async (
  _options,
  { queryFulfilled, dispatch }
) => {
  try {
    const { data: userData } = await queryFulfilled;
    dispatch(setUser(userData?.data?.user));
    setAuthCredentials(
      userData.token,
      userData.permissions,
      userData?.data?.user
    );
  } catch ({ error }) {
    // NotificationHelper.error(error?.data?.error);
  }
};

const userApi = createApi({
  reducerPath: REDUCER_PATHS.user,
  baseQuery: customizeBaseQuery(),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: API_LOGIN,
        method: 'POST',
        body: data
      }),
      onQueryStarted: updateUserLocally
      // invalidatesTags: ['User']
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: API_REGISTER,
        method: 'POST',
        body: data
      })
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: API_VERIFY_EMAIL,
        method: 'POST',
        body: data
      })
    }),
    resendVerifyEmail: builder.mutation({
      query: (data) => ({
        url: API_VERIFY_EMAIL_RESEND,
        method: 'POST',
        body: data
      })
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: API_FORGOT_PASSWORD,
        method: 'POST',
        body: data
      })
    }),
    verifyForgotPasswordToken: builder.mutation({
      query: (data) => ({
        url: API_FORGOT_PASSWORD_VERIFY,
        method: 'POST',
        body: data
      })
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: API_RESET_PASSWORD,
        method: 'POST',
        body: data
      })
    })
  }),
  overrideExisting: true
});

export default userApi;
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useVerifyEmailMutation,
  useVerifyForgotPasswordTokenMutation,
  useResendVerifyEmailMutation,
  useGetUserDetailsQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = userApi;
