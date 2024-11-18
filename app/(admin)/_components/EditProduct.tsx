"use client";
import { Button } from "@/components/ui/button";
import { useGetProductByIdQuery } from "@/redux/rtk/product";
import { ProductProps } from "@/utils/productData";
import TextInput from "@/utils/TextInput";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EditProduct = ({ productId }: { productId: string }) => {
  const [loading, setloading] = useState(false);
  const { data, isLoading } = useGetProductByIdQuery(productId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductProps>();
  useEffect(() => {
    if (data) {
      setValue("name", data?.product?.name || "");
      setValue("description", data?.product?.description || "");
      setValue("price", data?.product?.price);
      setValue("brand", data?.product?.brand);
      setValue("discountPrice", data?.product?.discountPrice || 0);
      setValue("Weight", data?.product?.weight);
    }
  }, [data, setValue]);

  const handleUpdateProduct = (data: ProductProps) => {
    console.log(data);
    setloading(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-[200px]">
        <LoaderCircle size={50} className="animate-spin" />
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl my-10">
        <h1 className="text-2xl text-center font-semibold mb-6 text-gray-700">
          Edit Product
        </h1>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(handleUpdateProduct)}
        >
          <div className="grid grid-cols-1">
            <div className="flex-1 !text-base">
              <TextInput
                label="Product Name"
                name="name"
                type="text"
                register={register}
                errors={errors}
              />
            </div>
            <div className="flex-1 !text-base mt-5">
              <TextInput
                label="Product Description"
                name="description"
                type="textarea"
                register={register}
                errors={errors}
                className="h-[150px]"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-x-6 grid-cols-1 mt-3">
            <div className="flex-1 !text-base">
              <TextInput
                label="Product Price"
                name="price"
                register={register}
                errors={errors}
              />
            </div>
            <div className="flex-1 !text-base">
              <TextInput
                label="Product Discount Price"
                name="discountPrice"
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-x-6 grid-cols-1 mt-3">
            <div className="flex-1 !text-base">
              <TextInput
                label="Product Weight"
                name="Weight"
                register={register}
                errors={errors}
              />
            </div>
            <div className="flex-1 !text-base">
              <TextInput
                label="Product Brand"
                name="brand"
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-x-6 gap-y-5">
            {data?.product?.image.map((item: string, index: number) => (
              <div className="w-[150px] h-[150px]" key={index}>
                <Image
                  src={item}
                  alt="product-image"
                  width={150}
                  height={150}
                  className=" w-full h-full object-contain rounded-md"
                  priority
                />
              </div>
            ))}
          </div>
          <div className="">
            <Button className=" w-full text-lg font-semibold py-5">
              {loading ? (
                <span className="flex items-center">
                  <LoaderCircle className=" animate-spin mr-1" size={20} />
                  Updating product please wait...
                </span>
              ) : (
                "Update Product"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
