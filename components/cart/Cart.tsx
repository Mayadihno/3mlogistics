"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  CartItem,
  removeProductFromCart,
  updateCartItemQty,
} from "@/redux/slice/cartSlice";
import { formatCurrency, formatNumber } from "@/utils/format";
import { ICONS } from "@/utils/icons";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import image from "../../public/cart1.jpg";

type CartProp = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

const Cart = ({ setOpen, open }: CartProp) => {
  const { cartItems } = useAppSelector((state) => state.cart);

  const subtotal = cartItems.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    <div
      onClick={() => setOpen(!open)}
      className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex justify-end"
    >
      <div className="relative w-[95%] md:w-[30%] h-screen bg-white rounded-sm shadow-sm md:mt-0 mt-[-50px] ">
        <div className="flex justify-between items-center shadow-lg w-full p-3 font-ebgaramond">
          <h2 className=" text-2xl font-semibold">Cart Overview</h2>
          <div
            onClick={() => setOpen(!open)}
            className="border cursor-pointer p-2 flex items-center space-x-1"
          >
            <p className="text-sm">Close</p> <ICONS.close size={15} />
          </div>
        </div>
        {cartItems.length > 0 ? (
          <div className="">
            <div className="p-3 font-ebgaramond overflow-y-scroll h-[530px]">
              {cartItems?.map((item) => (
                <div key={item?.id} className="">
                  <SingleCart item={item} />
                </div>
              ))}
            </div>
            <div className="w-full p-3 bg-[#0000000c] font-ebgaramond">
              <div className="flex py-2 justify-between items-center">
                <h1 className="text-2xl font-semibold">Subtotal</h1>
                <h3 className="text-lg font-bold">
                  {formatCurrency(subtotal)}
                </h3>
              </div>
              <Button className=" bg-green-500 text-2xl font-bold py-3 text-center w-full">
                Checkout
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-[80vh] flex justify-center flex-col items-center">
            <div className="w-[150px] h-[150px]">
              <Image
                src={image}
                alt="empty cart image"
                width={150}
                height={150}
                className=" w-full h-full object-contain"
              />
            </div>
            <p className="text-lg font-semibold">Cart is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

const SingleCart = ({ item }: { item: CartItem }) => {
  const [value, setValue] = useState(item?.qty);
  const dispatch = useAppDispatch();

  const increment = (item: CartItem) => {
    const newQty = value + 1;
    setValue(newQty);
    dispatch(updateCartItemQty({ id: item?.id, qty: newQty }));
  };

  const decrement = () => {
    const newQty = value === 1 ? 1 : value - 1;
    setValue(newQty);
    dispatch(updateCartItemQty({ id: item?.id, qty: newQty }));
  };
  const handleRemoveFromCart = (id: number) => {
    toast.success("Item successfully removed from cart");
    dispatch(removeProductFromCart(id));
  };
  const totalPrice = item?.price * item?.qty;
  return (
    <div className=" border-b py-2">
      <div className="flex space-x-5">
        <div className="w-[70px] h-[70px]">
          <Image
            src={item.image}
            alt={item.title}
            width={70}
            height={70}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col w-full">
          <h3 className="text-lg line-clamp-1 font-semibold">{item.title}</h3>
          <div className="flex justify-between items-center pt-5">
            <h4 className="text-base font-medium">
              {formatCurrency(item.discountPrice ?? 0)} *{" "}
              {formatNumber(item.qty)}
            </h4>
            <h2 className="text-lg font-medium flex justify-end">
              {formatCurrency(totalPrice)}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-4 pt-4 pb-2">
        <div
          className="flex items-center font-ebgaramond cursor-pointer"
          onClick={() => handleRemoveFromCart(item?.id)}
        >
          <ICONS.delete size={20} className="text-[#B10C62]" />
          <span className="text-[#B10C62] text-lg uppercase ml-2">Remove</span>
        </div>
        <div className="flex items-center text-white">
          <div
            className={`border w-[30px] h-[30px] justify-center 
                        cursor-pointer bg-[#202C45] border-[##202C45] flex items-center`}
            onClick={() => increment(item)}
          >
            <ICONS.add size={20} />
          </div>
          <span className="px-[10px] text-black">{value}</span>
          <div
            onClick={decrement}
            className="flex items-center w-[30px] h-[30px] justify-center cursor-pointer bg-[#202C45]"
          >
            <ICONS.minus size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};
