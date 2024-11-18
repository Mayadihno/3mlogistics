"use client";

import React from "react";
import { useGetUserProductsQuery } from "@/redux/rtk/user";
import ProductCard from "../Product/ProductCard";
import { ProductProps } from "@/utils/productData";
import ProductSkeleton from "../skeletom/ProductSkeleton";

const Shop = () => {
  const { data, isLoading } = useGetUserProductsQuery({});

  const products = data?.products;
  return (
    <div className="my-10">
      <div className="w-[95%] mx-auto">
        <div className=" flex justify-center items-center">
          <h3 className="text-4xl text-center font-ebgaramond font-semibold">
            Shop Product
          </h3>
        </div>
        <div className="md:container md:mx-auto">
          {isLoading ? (
            <div className="my-5">
              <ProductSkeleton count={4} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 md:gap-x-7 gap-y-12 md:mt-20 mt-10 px-4 md:px-0">
              {products?.map((item: ProductProps) => (
                <div className="" key={item._id}>
                  <ProductCard item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
