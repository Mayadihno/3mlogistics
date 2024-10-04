"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import React, { useState } from "react";
import { Card } from "../ui/card";
import { formatCurrency } from "@/utils/format";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const OrderSummary = ({ handlePayment }: any) => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const [selected, setSelected] = useState<{
    name: string;
    price: number;
  } | null>(null);
  const subtotal = cartItems.reduce((a, b) => a + b.price * b.qty, 0);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.id;
    const price = parseFloat(e.target.getAttribute("data-price") || "0");
    setSelected({ name, price });
  };
  const total = subtotal + (selected?.price ?? 0);

  return (
    <div className="w-full font-ebgaramond">
      <Card className="rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mx-3 mt-2">Order Summary</h2>
        <div className=" border-y mt-2">
          {cartItems.map((item) => (
            <div
              className="flex justify-between items-center px-3 py-1"
              key={item.id}
            >
              <p className="text-sm font-medium">{item.title}</p>
              <div className="flex text-sm font-medium">
                <p>{formatCurrency(item.price)}</p> * <p>{item.qty}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center border-b p-2">
          <h3 className="text-lg font-semibold">Subtotal Price:</h3>
          <p className="text-lg font-bold">{formatCurrency(subtotal)}</p>
        </div>
        <form className="flex space-x-3 items-center p-3 border-b">
          <div className="flex-1 !text-base">
            <input
              type="text"
              className={`w-full border p-1 outline-none rounded-[5px] h-[40px] pl-2`}
              placeholder="Discount code"
              //   value={couponCode}
              //   onChange={(e) => setCouponCode(e.target.value)}
              required
            />
          </div>
          <Button className="text-base font-semibold">Apply</Button>
        </form>
        <div className="flex justify-between md:items-start items-center p-4">
          <h3 className="text-lg font-ebgaramond font-semibold">
            Shipping Fee
          </h3>
          <form className="font-urbanist md:text-base text-sm font-medium">
            {[
              {
                id: "postnode",
                label: "Postnode Pickup (Incl. VAT): ",
                price: "12050",
              },
              {
                id: "gls",
                label: "GLS Pickup (Incl. VAT): ",
                price: "12550",
              },
              {
                id: "bring",
                label: "Bring Pickup (Incl. VAT): ",
                price: "9550",
              },
            ].map((option) => (
              <div key={option.id} className="flex items-center space-x-2 py-1">
                <input
                  type="radio"
                  name="shipping"
                  id={option.id}
                  data-price={parseFloat(option.price)}
                  onChange={handleChange}
                />
                <label htmlFor={option.id}>
                  {option.label} {formatCurrency(parseFloat(option.price))}
                </label>
              </div>
            ))}
          </form>
        </div>
        <div className="border-t p-2 flex justify-between items-center">
          <h2 className="text-lg font-bold">Total price:</h2>
          <p className="text-lg font-bold">{formatCurrency(total)}</p>
        </div>
        {/* <div className="px-4 py-2">
          <Button
            onClick={() => handlePayment(null, selected, total)}
            className="bg-[#202C45] w-full"
            type="submit"
          >
            Payment
          </Button>
        </div> */}
      </Card>
    </div>
  );
};

export default OrderSummary;
