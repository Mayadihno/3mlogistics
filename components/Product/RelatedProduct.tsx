"use client";
import { ProductProps } from "@/utils/productData";
import React from "react";
import ProductCard from "./ProductCard";
import { useGetUserProductsQuery } from "@/redux/rtk/user";

const RelatedProduct = ({ params }: { params: { id: string } }) => {
  const productId = params.id;
  const { data } = useGetUserProductsQuery({});
  const products = data?.products;
  const currentProduct = products.find(
    (item: ProductProps) => item._id === productId
  );

  if (!currentProduct) {
    return (
      <div className="text-2xl font-bold my-5 pl-5">
        No related products found
      </div>
    );
  }

  const relatedProducts = products.filter(
    (item: ProductProps) =>
      item.category === currentProduct.category &&
      item._id !== currentProduct._id
  );

  return (
    <div className="my-10 px-5 border-t-2">
      <h1 className="text-2xl font-ebgaramond font-medium py-3">
        Related Products
      </h1>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-y-5 gap-x-7">
        {relatedProducts &&
          relatedProducts.map((item: ProductProps) => (
            <div className="" key={item._id}>
              <ProductCard item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
