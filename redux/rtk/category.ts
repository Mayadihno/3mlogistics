import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/admin/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    getCategory: builder.query({
      query: () => ({
        url: "/admin/create-category",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoryQuery } = categoryApi;

export default categoryApi;
