import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/admin",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    getProduct: builder.query({
      query: (arg: { querys: string }) => ({
        url: `/product?&${arg.querys}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    updateProdutStatus: builder.mutation({
      query: (arg: { id: string; status: boolean }) => ({
        url: `/product`,
        method: "PATCH",
        body: arg,
      }),
      invalidatesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (productId: string) => ({
        url: `/products?id=${productId}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductQuery,
  useDeleteProductMutation,
  useUpdateProdutStatusMutation,
  useGetProductByIdQuery,
} = productApi;

export default productApi;
