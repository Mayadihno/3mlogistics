"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { useGetUserProductsQuery } from "@/redux/rtk/user";
import { ProductProps } from "@/utils/productData";
import ProductSkeleton from "../skeletom/ProductSkeleton";

const Products = () => {
  const { data, isLoading } = useGetUserProductsQuery({});
  const products = data?.products;
  return (
    <div className="w-full bg-[#f7f7f7]">
      <div className="flex flex-col text-center py-4">
        <h1 className="text-3xl font-bold font-prociono pb-3">
          Trending Products
        </h1>
        <div className="flex justify-center items-center space-x-2">
          <div className="w-[10px] h-[10px] rounded-full bg-[#202C45]"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-[#202C45]"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-[#202C45]"></div>
          <div className="w-[180px] h-[10px] rounded-full bg-[#202C45]"></div>
        </div>
      </div>
      <div className="">
        {isLoading ? (
          <div className="m-5">
            <ProductSkeleton count={4} />
          </div>
        ) : (
          <div className=" w-[90%] mx-auto grid grid-cols-1 gap-6 md:grid-cols-4 py-6">
            {products?.map((item: ProductProps) => (
              <div className="" key={item._id}>
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
