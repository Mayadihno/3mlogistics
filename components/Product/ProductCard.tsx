"use client";
import { formatCurrency } from "@/utils/format";
import { ProductProp } from "@/utils/productData";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import toast from "react-hot-toast";
import {
  addProductToCart,
  CartItem,
  removeProductFromCart,
} from "@/redux/slice/cartSlice";

const ProductCard = ({ item }: { item: ProductProp }) => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [existing, setExisting] = useState(false);

  useEffect(() => {
    const isExisting = cartItems.some((cartItem) => cartItem.id === item.id);
    setExisting(isExisting);
  }, [cartItems, item.id]);
  const handleAddToCart = (item: ProductProp) => {
    const cartItem: CartItem = {
      id: item.id,
      title: item.title,
      category: item.category,
      price: item.price,
      image: item.image,
      qty: 1,
      discountPrice: item.price,
    };
    dispatch(addProductToCart(cartItem));
    toast.success("Item added to cart successfully");
  };

  const handleRemove = (id: number) => {
    dispatch(removeProductFromCart(id));
    toast.success("Item remove from cart");
  };
  return (
    <div className="bg-white shadow-lg p-3 cursor-pointer rounded-md font-ebgaramond">
      <Link
        href={`/product/${item.id}`}
        className="hover:shadow-2xl hover:shadow-[#00000089] hover:animate-pulse "
      >
        <div className="h-[250px] w-full">
          <Image
            src={item.image}
            alt={item.title}
            width={300}
            height={250}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="pt-4 px-1">
          <h3 className="text-base font-semibold text-nowrap line-clamp-1">
            {item.title}
          </h3>
          <div className="border-y py-2">
            <div className="flex items-center space-x-5">
              <h3 className=" text-lg font-bold">
                {formatCurrency(item.price)}
              </h3>
              <h3 className=" line-through text-base">
                {formatCurrency(item.price)}
              </h3>
            </div>
          </div>
        </div>
      </Link>
      <div className="w-full text-white font-prociono pt-2">
        {existing ? (
          <Button
            onClick={() => handleRemove(item.id)}
            className="bg-[#ED017F] text-lg font-bold w-full"
          >
            Remove from cart
          </Button>
        ) : (
          <Button
            onClick={() => handleAddToCart(item)}
            className="bg-[#202C45] text-lg font-bold w-full"
          >
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
