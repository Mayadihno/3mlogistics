"use client";
import { Button } from "@/components/ui/button";
import {
  useGetAdminOrderDetailsQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/rtk/orderSlice";
import { CartItem } from "@/redux/slice/cartSlice";
import { formatCurrency } from "@/utils/format";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsFillBagFill } from "react-icons/bs";

const AdminOrderDetails = ({ orderId }: { orderId: string }) => {
  const { data, isFetching, isLoading } = useGetAdminOrderDetailsQuery(orderId);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [statuss, setStatuss] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log(data);
  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle size={50} color="#e94560" />
      </div>
    );
  }
  const totalPrice = data?.order?.cartItems?.reduce(
    (a: number, b: CartItem) => a + b.price * b.qty,
    0
  );
  const handleStatusUpdate = async () => {
    setLoading(true);
    const res = await updateOrderStatus({ orderId, orderStatus: statuss });
    if (res.data.message) {
      toast.success(res.data.message);
      setStatuss("");
      setLoading(false);
      router.back();
    } else {
      setLoading(false);
      toast.error(
        "Something went wrong. Please try again later or contact support."
      );
    }
  };
  const handleRefundStatus = async () => {};
  return (
    <div className={`py-4 min-h-screen font-ebgaramond md:mx-10 mx-3`}>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-1 text-[25px]">Order Details</h1>
        </div>
        <Button
          onClick={() => router.back()}
          className="!bg-[#fce1e6] !rounded-[4px] font-[600] text-[#e94560] !h-[45px] text-[18px]"
        >
          Order List
        </Button>
      </div>
      <div className="flex w-full justify-between items-center pt-3">
        <h5 className="text-[#00000089]">
          Order ID: <span>#{data?.order?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#0000008b] font-medium">
          Placed On:
          <span className=" font-semibold">
            {data?.createdAt?.slice(0, 10)}
          </span>
        </h5>
      </div>
      <br />
      <br />
      {/* order items */}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        {data &&
          data?.order.cartItems?.map((item: CartItem) => {
            return (
              <div key={item._id} className="w-full p-3 mb-5 border">
                <div className="flex justify-center items-center">
                  <Image
                    src={item?.image}
                    className="w-[220px] h-[220px] rounded-[4px]"
                    alt={item.name}
                    width={220}
                    height={220}
                  />
                </div>
                <div className="w-full pt-3">
                  <div className="flex justify-between items-center">
                    <h5 className="text-lg">{item.name}</h5>
                    <h5 className="text-base">
                      {formatCurrency(item.price)} X {item.qty}
                    </h5>
                  </div>
                  <div className="flex justify-between py-2 items-center text-base capitalize">
                    <h4>Category: {item.category}</h4>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="border-b flex justify-between items-center pr-2 w-full md:mt-0 mt-5">
        <div className="">
          {data?.order?.shippingFee !== undefined ? (
            <>
              <h5 className="md:pt-3 text-[18px]">
                Shipping fee:
                <span className="text-base font-semibold pl-2">
                  {formatCurrency(Number(data?.order?.shippingFee.price))}
                </span>
              </h5>
            </>
          ) : (
            <h5 className="md:pt-3 text-[18px]">
              Shipping fee <strong>N/A</strong>
            </h5>
          )}
        </div>
        <h5 className="md:py-3 text-[18px]">
          Total price <strong>{formatCurrency(totalPrice)}</strong>
        </h5>
      </div>
      <div className="w-full md:flex py-4">
        <div className="w-full md:w-[60%]">
          <h4 className="text-[20px] pb-3">
            Name: {data?.order?.usersData?.firstName}{" "}
            {data?.order?.usersData?.lastName}
          </h4>
          <h4 className="text-lg font-semibold pb-2">Shipping Address</h4>
          <h4 className="text-[20px]">
            {data?.order?.usersData?.address},{" "}
            {data?.order?.usersData?.postalCode}, {data?.order?.usersData?.city}
            ,
          </h4>
          <h4 className="text-[20px] pt-1">
            {data?.order?.usersData?.countries}
          </h4>
          <h4 className="text-[20px] pt-1">
            Phone Number: {data?.order?.usersData?.phoneNumber}
          </h4>
          <h4 className="text-[20px] pt-1">
            Company: {data?.order?.usersData?.company}
          </h4>
        </div>
        <div className="w-full md:w-[40%]">
          <h4 className="text-lg font-semibold pb-2">Payment Info:</h4>
          <h4>
            Status:
            <span className="pl-2">
              {data?.order?.paymentInfo
                ? data?.order?.paymentInfo?.type
                : "Not Paid"}
            </span>
          </h4>
          <h4>
            Status:
            <span className="pl-2">
              {data?.order?.paymentInfo
                ? data?.order?.paymentInfo?.value
                : "Not Paid"}
            </span>
          </h4>
        </div>

        {data?.order?.status !== "Processing refund" && (
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold pb-2">Order Status</h4>
            <select
              className="w-[230px] rounded-[4px] border h-[35px]"
              value={statuss}
              onChange={(e) => setStatuss(e.target.value)}
            >
              {[
                "Processing",
                "Transferred to delivery partner",
                "Shipping",
                "Received",
                "Delivered",
                "On the way",
              ]
                .slice(
                  [
                    "Processing",
                    "Transferred to delivery partner",
                    "Shipping",
                    "Received",
                    "Delivered",
                    "On the way",
                  ].indexOf(data?.order?.status)
                )
                .map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>
      <div className="">
        {data?.order?.status === "Processing refund" ||
        data?.order?.status === "Refund Success" ? (
          <select
            value={statuss}
            onChange={(e) => setStatuss(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {["Processing refund", "Refund Success"]
              .slice(
                ["Processing refund", "Refund Success"].indexOf(
                  data?.order?.status
                )
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        ) : null}
      </div>
      <div className="">
        <Button
          onClick={
            data?.status !== "Processing refund"
              ? handleStatusUpdate
              : handleRefundStatus
          }
          className="bg-black w-full text-lg rounded-[5px] text-white hover:bg-[#000000a4]"
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <LoaderCircle size={15} className=" animate-spin" /> Upadting
              Order status...
            </span>
          ) : (
            " Update Order Status"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
