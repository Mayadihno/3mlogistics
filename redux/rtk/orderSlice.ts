import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartItem } from "../slice/cartSlice";
import { AddressProp } from "@/components/checkout/BillingInfo";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
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
        url: "/create-order",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: `/admin/orders`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    getAdminOrderDetails: builder.query({
      query: (orderId: string) => ({
        url: `/admin/order-details?id=${orderId}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation({
      query: (arg: { orderId: string; orderStatus: string }) => ({
        url: `/admin/update-orderStatus`,
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
