import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userProductApi = createApi({
  reducerPath: "userProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/user",
  }),
  tagTypes: ["Products", "Orders"],
  endpoints: (builder) => ({
    getUserProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (productId: string) => ({
        url: `/product-details?id=${productId}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    getUserOrders: builder.query({
      query: (id: string) => ({
        url: `/orders?id=${id}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getUserOrderDetails: builder.query({
      query: (id: string) => ({
        url: `/order-details?id=${id}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetUserProductsQuery,
  useGetProductByIdQuery,
  useGetUserOrdersQuery,
  useGetUserOrderDetailsQuery,
} = userProductApi;

export default userProductApi;
