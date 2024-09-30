import ProductDetails from "@/components/Product/ProductDetails";
import RelatedProduct from "@/components/Product/RelatedProduct";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <ProductDetails params={params} />
      <RelatedProduct params={params} />
    </div>
  );
};

export default page;
