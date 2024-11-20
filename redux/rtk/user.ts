import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userProductApi = createApi({
  reducerPath: "userProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_API_URL
        : typeof window !== "undefined" &&
          window.location.hostname === "localhost"
        ? process.env.NEXT_PUBLIC_API_URL
        : process.env.NEXT_PUBLIC_API_BASE_URL_MOBILE,
  }),
  tagTypes: ["Products", "Orders"],
  endpoints: (builder) => ({
    getUserProducts: builder.query({
      query: () => ({
        url: "user/products",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (productId: string) => ({
        url: `user/product-details?id=${productId}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    getUserOrders: builder.query({
      query: (id: string) => ({
        url: `user/orders?id=${id}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getUserOrderDetails: builder.query({
      query: (id: string) => ({
        url: `user/order-details?id=${id}`,
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
