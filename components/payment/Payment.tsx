"use client";
import React, { useEffect, useState } from "react";
import { AddressProp } from "../checkout/BillingInfo";
import { CartItem } from "@/redux/slice/cartSlice";
import { useAppSelector } from "@/redux/hooks/hooks";
import { formatCurrency } from "@/utils/format";
import PaymentInfo from "./PaymentInfo";

const Payment = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const [orderData, setOrderData] = useState<{
    usersData: AddressProp;
    cartItems: CartItem[];
    totalPrice: number;
    selected: { name: string; price: number };
  } | null>(null);

  useEffect(() => {
    const storedOrderData = JSON.parse(
      localStorage.getItem("orderItemsdata") || "{}"
    );
    setOrderData(storedOrderData);
  }, []);

  return (
    <div className="flex justify-between w-[75%] mx-auto space-x-5 font-ebgaramond">
      <div className="w-1/2 mx-auto h-fit my-10 border rounded-md shadow-md p-5">
        <div className="py-2 border-b-2 text-sm text-nowrap">
          <h2 className="text-2xl font-semibold">Buyer Information</h2>
          <div className="flex justify-between space-y-4 md:space-y-0 md:flex-row flex-col py-2 md:items-center">
            <h2>
              <span className="font-semibold mr-1"> Name:</span>
              <span>
                {orderData?.usersData?.firstName ?? ""}{" "}
                {orderData?.usersData?.lastName ?? ""}
              </span>
            </h2>
            <h2>
              <span className="font-semibold mr-1"> Email:</span>
              <span>{orderData?.usersData?.email ?? ""}</span>
            </h2>
          </div>
          <div className="flex justify-between space-y-4 md:space-y-0 md:flex-row flex-col py-2 md:items-center">
            <h2>
              <span className="font-semibold mr-1">Phone Number:</span>
              <span>{orderData?.usersData?.phoneNumber}</span>
            </h2>
            <h2>
              <span className="font-semibold mr-1">Country:</span>
              <span>{orderData?.usersData?.countries}</span>
            </h2>
          </div>
          <div className="flex justify-between space-y-4 md:space-y-0 md:flex-row flex-col py-2 md:items-center">
            <h2>
              <span className="font-semibold mr-1"> State:</span>
              <span>{orderData?.usersData?.city}</span>
            </h2>
            <h2>
              <span className="font-semibold mr-1"> Address:</span>
              <span>{orderData?.usersData?.address}</span>
            </h2>
          </div>
        </div>
        <h2 className="text-2xl font-medium pt-2">
          <span className="font-semibold">Item Quantity: </span>
          <span className="ml-2">{cartItems.length}</span>
        </h2>
        <div className="flex flex-col py-2 justify-center font-urbanist border-b-2">
          {cartItems.map((item) => {
            return (
              <div
                className="flex justify-between py-1 text-sm font-normal"
                key={item.id}
              >
                <h2>{item.title}</h2>
                <div className="flex space-x-2">
                  <h4>
                    {formatCurrency(item.price)} * {item.qty}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center py-2 border-b-2">
          <h2 className="text-lg font-semibold">Shipping Fee:</h2>
          <div className="flex space-x-2 text-sm">
            <h4>{formatCurrency(orderData?.selected?.price ?? 0)}</h4>
          </div>
        </div>
        <div className="py-2 flex justify-between items-center text-lg font-semibold">
          <h2>Total:</h2>
          <h4>{formatCurrency(orderData?.totalPrice ?? 0)}</h4>
        </div>
      </div>
      <div className=" w-1/2 mx-auto my-10">
        <PaymentInfo />
      </div>
    </div>
  );
};

export default Payment;
