import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_API_URL
        : typeof window !== "undefined" &&
          window.location.hostname === "localhost"
        ? process.env.NEXT_PUBLIC_API_URL
        : process.env.NEXT_PUBLIC_API_BASE_URL_MOBILE,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "admin/product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    getProduct: builder.query({
      query: (arg: { querys: string }) => ({
        url: `admin/product?&${arg.querys}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    updateProdutStatus: builder.mutation({
      query: (arg: { id: string; status: boolean }) => ({
        url: `admin/product`,
        method: "PATCH",
        body: arg,
      }),
      invalidatesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (productId: string) => ({
        url: `admin/products?id=${productId}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    getAllProduct: builder.query({
      query: () => ({
        url: "admin/products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `admin/product`,
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
