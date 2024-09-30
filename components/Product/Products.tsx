import { product } from "@/utils/productData";
import React from "react";
import ProductCard from "./ProductCard";

const Products = () => {
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
      <div className=" w-[90%] mx-auto grid grid-cols-1 gap-6 md:grid-cols-4 py-6">
        {product.map((item) => (
          <div className="" key={item.id}>
            <ProductCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
