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
  }),
});

export const { useCreateOrderMutation } = orderApi;

export default orderApi;
