import Carousel from "@/components/carousel/Carousel";
import Danish from "@/components/danish/Danish";
import Policy from "@/components/policy/Policy";
import Products from "@/components/Product/Products";
import React from "react";

const page = () => {
  return (
    <div>
      <Carousel />
      <Policy />
      <Products />
      <Danish />
    </div>
  );
};

export default page;
