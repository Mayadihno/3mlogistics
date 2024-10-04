"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import React, { useEffect, useState } from "react";
import { AddressProp } from "../checkout/BillingInfo";
import { CartItem, clearCart } from "@/redux/slice/cartSlice";
import PaypalPayment from "./PaypalPayment";
import PaymentCard from "./PaymentCard";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const PaymentInfo = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const [select, setSelect] = useState(1);
  const dispatch = useAppDispatch();
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
  const router = useRouter();

  //   const [createOrder] = useCreateOrderMutation();

  const cashOnDeliveryHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const paymentInfo = {
      type: "Cash on delivery",
      value: "Not Paid",
    };

    // const result = await createOrder({
    //   userData: orderData?.usersData,
    //   cartItems,
    //   shippingFee: orderData?.selected.price,
    //   totalPrice: orderData?.totalPrice,
    //   paymentInfo,
    // });
    // if (result?.data) {
    //   toast.success("Order successfully created");
    //   localStorage.removeItem("orderItemsdata");
    //   dispatch(clearCart());
    // router.push(`/success?orderId=${data.orderId}`);
    //   router.push("/payment/success");
    // }
  };

  return (
    <div className="w-full md:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      <div>
        <div className="flex w-full pb-5 border-b mb-2 cursor-pointer">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4
            onClick={() => setSelect(1)}
            className="text-[18px] pl-2 font-[600] text-[#000000b1]"
          >
            Pay with Debit/credit card
          </h4>
        </div>

        {/* pay with card */}
        {select === 1 ? (
          <div className="flex w-full items-center justify-center ">
            <PaymentCard />
          </div>
        ) : null}
        <br />

        <div className="">
          <div className="flex w-full pb-5 border-b mb-2 cursor-pointer">
            <div
              className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
              onClick={() => setSelect(2)}
            >
              {select === 2 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
              ) : null}
            </div>
            <h4
              onClick={() => setSelect(2)}
              className="text-[18px] pl-2 font-[600] text-[#000000b1]"
            >
              Pay with Paypal
            </h4>
          </div>
        </div>

        {/* pay with payement */}
        {select === 2 ? <PaypalPayment /> : null}

        <br />

        {/* mobilePay */}

        <div>
          <div className="flex w-full pb-5 cursor-pointer border-b mb-2">
            <div
              className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
              onClick={() => setSelect(4)}
            >
              {select === 4 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
              ) : null}
            </div>
            <h4
              onClick={() => setSelect(4)}
              className="text-[18px] pl-2 font-[600] text-[#000000b1]"
            >
              Mobile Pay
            </h4>
          </div>
          {/* mobilepay */}
          {select === 4 ? (
            <div className="w-full flex font-ebgaramond">
              <form className="w-full">
                {/* onSubmit={cashOnDeliveryHandler} */}
                <input
                  type="submit"
                  value="Mobile Pay"
                  className={` !bg-[#202C45] p-3 text-[#fff] rounded-[5px] my-3 cursor-pointer text-[18px] font-[600]`}
                />
              </form>
            </div>
          ) : null}
        </div>

        <br />
        {/* cash on delivery */}
        <div>
          <div className="flex w-full pb-5 border-b mb-2 cursor-pointer">
            <div
              className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
              onClick={() => setSelect(3)}
            >
              {select === 3 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
              ) : null}
            </div>
            <h4
              onClick={() => setSelect(3)}
              className="text-[18px] pl-2 font-[600] text-[#000000b1]"
            >
              Cash on Delivery
            </h4>
          </div>
          {/* cash on delivery */}
          {select === 3 ? (
            <div className="w-full flex font-ebgaramond">
              <form className="w-full" onSubmit={cashOnDeliveryHandler}>
                <input
                  type="submit"
                  value="Payment on delivery"
                  className={` !bg-[#202C45] p-3 text-[#fff] rounded-[5px] my-3 cursor-pointer text-[18px] font-[600]`}
                />
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
