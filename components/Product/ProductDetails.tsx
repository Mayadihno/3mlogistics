"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useGetProductByIdQuery } from "@/redux/rtk/product";
import { addProductToCart, CartItem } from "@/redux/slice/cartSlice";
import { formatCurrency } from "@/utils/format";
import { ICONS } from "@/utils/icons";
import { ProductProps } from "@/utils/productData";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const [count, setCount] = useState(1);
  const [select, setSelect] = useState(0);
  const productId = params.id;
  const dispatch = useAppDispatch();
  const { data } = useGetProductByIdQuery(productId);
  console.log(data);
  const product = data?.product;
  const decrementCount = () => {
    setCount((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const handleAddToCart = (item: ProductProps) => {
    const isItemExist = cartItems && cartItems.find((i) => i._id === item._id);
    if (isItemExist) {
      toast.error("Item already exist in cart");
      return;
    }
    const cartItem: CartItem = {
      _id: item._id,
      name: item.name,
      category: item.category,
      price: parseFloat(item.discountPrice),
      image: item.image[0],
      qty: count,
      discountPrice: item.price,
    };
    dispatch(addProductToCart(cartItem));
    toast.success("Item added to cart successfully");
  };

  return (
    <div className="mt-10 mb-5 w-[95%] mx-auto font-ebgaramond">
      <div className="flex space-x-16">
        <div className="w-[50%]">
          <div className="md:w-[300px] w-full md:h-[300px] my-5">
            <Image
              src={product?.image[select]}
              alt={product?.name}
              className="w-full h-full object-contain"
              width={300}
              height={300}
            />
          </div>
          <div className="w-full grid grid-cols-3 mb-8">
            {product &&
              product.image.map((i: string, index: number) => (
                <div
                  key={index}
                  className={`${
                    select === index
                      ? "border flex justify-center items-center mx-2"
                      : "null"
                  } cursor-pointer`}
                >
                  <div className="w-[100px] h-[100px]">
                    <Image
                      src={i}
                      alt=""
                      className="overflow-hidden mt-2"
                      onClick={() => setSelect(index)}
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="pl-4 w-[50%]">
          <h3 className="text-5xl font-semibold">{product?.name}</h3>
          <div className=" py-5 flex justify-between items-center">
            <div className="">
              <div className="flex items-center space-x-5">
                <h3 className="text-2xl font-bold">
                  {formatCurrency(product?.discountPrice ?? 0)}
                </h3>
                <h3 className=" line-through text-base">
                  {formatCurrency(product?.price ?? 0)}
                </h3>
              </div>
            </div>
            <div className="">
              <h3>
                <span className="text-xl font-semibold">Category: </span>
                <span className=" text-base font-medium">
                  {product?.category}
                </span>
              </h3>
              <h3>
                <span className="text-xl font-semibold">Weight: </span>
                <span className=" text-base font-medium">
                  {product?.weight}
                </span>
              </h3>
              <h3>
                <span className="text-xl font-semibold">Brand: </span>
                <span className=" text-base font-medium">{product?.brand}</span>
              </h3>
            </div>
          </div>
          <div className="">
            <h3 className=" text-3xl font-semibold">Product Decsription</h3>
            <p>
              <p className="text-base leading-8">{product?.description}</p>
            </p>
          </div>
          <div className="mt-10 mb-6">
            <div className="flex items-center justify-between pr-3">
              <div className=" font-unkempt">
                <button
                  className="bg-gradient-to-r from-slate-400 to-slate-500 text-white 
                            font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                  onClick={decrementCount}
                >
                  -
                </button>
                <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                  {count}
                </span>
                <button
                  className="bg-gradient-to-r from-slate-400 to-slate-500 text-white font-bold
                             rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                  onClick={incrementCount}
                >
                  +
                </button>
              </div>
              <div
                className="button font-prociono"
                onClick={() => handleAddToCart(data!)}
              >
                <button className="bg-[#202C45] text-white py-2 px-4 rounded flex items-center">
                  <ICONS.addToCart size={20} className="mr-2" />
                  <span>Add to cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
