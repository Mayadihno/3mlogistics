import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartItem } from "../slice/cartSlice";
import { AddressProp } from "@/components/checkout/BillingInfo";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_API_URL
        : typeof window !== "undefined" &&
          window.location.hostname === "localhost"
        ? process.env.NEXT_PUBLIC_API_URL
        : process.env.NEXT_PUBLIC_API_BASE_URL_MOBILE,
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (arg: {
        usersData: AddressProp;
        cartItems: CartItem[];
        shippingFee: { name: string; price: number };
        totalPrice: number;
        paymentInfo: { type: string; value: string };
      }) => ({
        url: "create-order",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: `admin/orders`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    getAdminOrderDetails: builder.query({
      query: (orderId: string) => ({
        url: `admin/order-details?id=${orderId}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation({
      query: (arg: { orderId: string; orderStatus: string }) => ({
        url: `admin/update-orderStatus`,
        method: "PATCH",
        body: {
          orderId: arg.orderId,
          orderStatus: arg.orderStatus,
        },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetAdminOrderDetailsQuery,
  useUpdateOrderStatusMutation,
} = orderApi;

export default orderApi;
