import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_API_URL
        : typeof window !== "undefined" &&
          window.location.hostname === "localhost"
        ? process.env.NEXT_PUBLIC_API_URL
        : process.env.NEXT_PUBLIC_API_BASE_URL_MOBILE,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => ({
        url: "create-user",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    changePassword: builder.mutation({
      query: ({ newData, userId }) => ({
        url: "change-password",
        method: "POST",
        body: { newData, userId },
      }),
      invalidatesTags: ["User"],
    }),
    editProfile: builder.mutation({
      query: (data) => ({
        url: "edit-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useChangePasswordMutation,
  useEditProfileMutation,
} = userApi;

export default userApi;
