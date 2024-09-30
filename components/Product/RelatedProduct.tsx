"use client";
import { product, ProductProp } from "@/utils/productData";
import React from "react";
import ProductCard from "./ProductCard";

const RelatedProduct = ({ params }: { params: { id: string } }) => {
  const productId = params.id;
  const currentProduct = product.find((item) => item.id === Number(productId));

  if (!currentProduct) {
    return (
      <div className="text-2xl font-bold my-5 pl-5">
        No related products found
      </div>
    );
  }

  const relatedProducts = product.filter(
    (item) =>
      item.category === currentProduct.category && item.id !== currentProduct.id
  );

  return (
    <div className="my-10 px-5 border-t-2">
      <h1 className="text-2xl font-ebgaramond font-medium py-3">
        Related Products
      </h1>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-y-5 gap-x-7">
        {relatedProducts &&
          relatedProducts.map((item: ProductProp) => (
            <div className="" key={item.id}>
              <ProductCard item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
