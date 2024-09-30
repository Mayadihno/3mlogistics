"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { addProductToCart, CartItem } from "@/redux/slice/cartSlice";
import { formatCurrency } from "@/utils/format";
import { ICONS } from "@/utils/icons";
import { product, ProductProp } from "@/utils/productData";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const [count, setCount] = useState(1);
  const productId = params.id;
  const selectedProduct = product.find(
    (item: ProductProp) => item.id === Number(productId)
  );
  const dispatch = useAppDispatch();

  const decrementCount = () => {
    setCount((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const handleAddToCart = (item: ProductProp) => {
    const isItemExist = cartItems && cartItems.find((i) => i.id === item.id);
    if (isItemExist) {
      toast.error("Item already exist in cart");
      return;
    }
    const cartItem: CartItem = {
      id: item.id,
      title: item.title,
      category: item.category,
      price: item.price,
      image: item.image,
      qty: count,
      discountPrice: item.price,
    };
    dispatch(addProductToCart(cartItem));
    toast.success("Item added to cart successfully");
  };

  return (
    <div className="mt-10 mb-5 w-[95%] mx-auto font-ebgaramond">
      <div className="flex space-x-16">
        <div className="w-[500px] h-[500px]">
          <Image
            src={selectedProduct?.image ?? ""}
            alt={selectedProduct?.title ?? ""}
            width={300}
            height={300}
            className=" w-full h-full object-contain"
          />
        </div>
        <div className="pl-4 w-1/2">
          <h3 className="text-5xl font-semibold">{selectedProduct?.title}</h3>
          <div className=" py-5 flex justify-between items-center">
            <div className="">
              <div className="flex items-center space-x-5">
                <h3 className="text-2xl font-bold">
                  {formatCurrency(selectedProduct?.price ?? 0)}
                </h3>
                <h3 className=" line-through text-base">
                  {formatCurrency(selectedProduct?.price ?? 0)}
                </h3>
              </div>
            </div>
            <div className="">
              <h3>
                <span className="text-xl font-semibold">Category: </span>
                <span className=" text-base font-medium">
                  {selectedProduct?.category}
                </span>
              </h3>
            </div>
          </div>
          <div className="">
            <h3 className=" text-3xl font-semibold">Product Decsription</h3>
            <p>
              <p className="text-base leading-8">
                Dress Pants Elevate your professional style with our sleek and
                sophisticated Dress Pants. Tailored to perfection, these
                trousers are designed to make a statement in any business
                setting. Crafted from high-quality fabrics such as wool, cotton,
                or polyester blends, they offer a comfortable fit and a crisp,
                polished look. Features: - Slim or classic fit options to suit
                your personal style - Flat front or pleated design for a
                versatile look - Zip fly and button closure for a secure fit -
                Two side pockets and one or two back pockets for convenient
                storage - Cuffed or plain hem finish - Available in a range of
                neutral colors, including black, navy, gray, beige, and more
                Perfect for: - Business meetings and presentations - Formal
                events and networking receptions - Job interviews and career
                advancement opportunities - Everyday office wear for
                professionals and executives Style Tips: - Pair with a dress
                shirt, tie, and blazer for a sharp, put-together look - Mix and
                match with different dress shoes and belts to add personality to
                your outfit - Consider a slim-fit style for a modern,
                fashion-forward look Look sharp, feel confident, and take your
                professional style to the next level with our Dress Pants!
              </p>
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
                onClick={() => handleAddToCart(selectedProduct!)}
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
