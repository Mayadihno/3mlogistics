"use client";
import TextInput from "@/utils/TextInput";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDropzone, FileRejection } from "react-dropzone";
import { MdDelete, MdOutlineErrorOutline } from "react-icons/md";
import { TbCameraPlus } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { useGetCategoryQuery } from "@/redux/rtk/category";
import { useCreateProductMutation } from "@/redux/rtk/product";
import { useAppSelector } from "@/redux/hooks/hooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

interface ProductProp {
  name: string;
  description: string;
  price: number;
  discountPrice: string;
  stock: number;
  category: string;
  subCategory: string;
  image: FileList | null;
  weight: string;
  brand: string;
}

const CreateProduct = () => {
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredSubcategories, setFilteredSubcategories] = useState<string[]>(
    []
  );
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    clearErrors,
    setError,
  } = useForm<ProductProp>();

  const handleDeleteImage = (index: number) => {
    const updatedImages = images.filter((_: any, i: number) => i !== index);
    setImages(updatedImages);
  };

  const handleDrop = (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > 5) {
      setError("image", {
        type: "manual",
        message: "At most 5 images are allowed for each product",
      });
      return;
    }

    const processedImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...processedImages]);
    clearErrors("image");
  };

  const maxSizeInBytes = 5242880;
  const { getInputProps, open } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
    },
    maxFiles: 5,
    maxSize: maxSizeInBytes,
    onDrop: handleDrop,
    onDropRejected: (rejectedFiles: FileRejection[]) => {
      const rejectedFile = rejectedFiles[0];
      if (rejectedFile.file.size > maxSizeInBytes) {
        setError("image", {
          type: "manual",
          message: "File size exceeds the maximum allowed size of 5 MB",
        });
      } else {
        setError("image", {
          type: "manual",
          message: "At most 5 images are allowed for each product",
        });
      }
    },
  });
  const { data } = useGetCategoryQuery({});
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryValue = e.target.value;
    setSelectedCategory(selectedCategoryValue);
    const subcategories = data
      ?.filter(
        (item: { category: string }) => item.category === selectedCategoryValue
      )
      .map((item: { subCategory: string }) => item.subCategory);

    setFilteredSubcategories(subcategories || []);
  };
  const [createProduct] = useCreateProductMutation();
  const userId = user?.data?._id;
  if (user?.data?.role !== "admin") {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-semibold mb-6 text-gray-700">
          You are not authorized to access this page
        </h1>
      </div>
    );
  }
  const router = useRouter();
  const handleCreateProduct = async (data: ProductProp) => {
    setLoading(true);
    if (images.length === 0 || images === null) {
      return setErrorMsg("Please select at least one image");
    }
    if (images.length > 0) {
      setErrorMsg("");
    }
    const formdata = { ...data, image: images, userId: userId };
    const formData = new FormData();
    formData.append("userId", formdata?.userId ?? "");
    formData.append("name", formdata.name);
    formData.append("description", formdata.description);
    formData.append("price", formdata.price.toString());
    formData.append("discountPrice", formdata.discountPrice);
    formData.append("stock", formdata.stock.toString());
    formData.append("category", formdata.category);
    formData.append("subCategory", formdata.subCategory);
    formData.append("weight", formdata.weight);
    formData.append("brand", formdata.brand);
    images.forEach((image: { file: string | Blob | File }) => {
      formData.append("images", image.file);
    });

    try {
      const { data: res } = await createProduct(formData);
      console.log(res);
      if (res.status === 201) {
        toast.success(res?.message);
        reset();
        setLoading(false);
        router.push("/admin-product");
      } else {
        toast.error(res?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl my-10">
        <h1 className="text-2xl font-semibold mb-6 text-gray-700">
          Create Product
        </h1>
        <form
          onSubmit={handleSubmit(handleCreateProduct)}
          className="space-y-6"
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
                label="Product Description Price"
                name="discountPrice"
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-x-6 grid-cols-1 mt-3">
            <div className="flex-1 !text-base">
              <TextInput
                label="Product Stock"
                name="stock"
                register={register}
                errors={errors}
              />
            </div>
            <div className="flex-1 !text-base">
              <TextInput
                label="Product Weight"
                name="weight"
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
          <div className="grid md:grid-cols-2 gap-x-6 grid-cols-1 mt-3">
            <div className="flex-1 !text-base">
              <TextInput
                label="Product Category"
                name="category"
                register={register}
                type="select"
                options={data?.map((item: { category: string }) => ({
                  value: item.category,
                  displayValue: item.category,
                }))}
                onChange={handleCategoryChange}
                errors={errors}
              />
            </div>
            <div className="flex-1 !text-base">
              <TextInput
                label="Product Subcategory"
                name="subcategory"
                register={register}
                type="select"
                options={filteredSubcategories?.map((sub: string) => ({
                  value: sub,
                  displayValue: sub,
                }))}
                errors={errors}
              />
            </div>
          </div>
          <div className="">
            <h3 className="text-xl font-semibold pb-2">Select Product Image</h3>
            <div className="flex justify-center items-center mb-1">
              <div className="border-2 border-dashed md:w-[95%] w-full h-52 relative">
                <Controller
                  name="image"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <div className="absolute top-[35%] left-[50%] -translate-x-[45%]">
                      <label
                        htmlFor="file-input"
                        className="flex cursor-pointer items-center justify-center md:px-1 text-black py-2 border rounded-md shadow-sm text-sm font-medium border-green-600 mb-2"
                      >
                        <input className="hidden" {...getInputProps()} />
                        <button
                          className="flex items-center text-[10px]"
                          type="button"
                          onClick={open}
                        >
                          Upload
                          <TbCameraPlus size={"20px"} className="ml-1" />
                          <span className="text-red-500">*</span>
                        </button>
                      </label>
                      <p className="block text-[10px]">
                        Drop your file here or click to upload
                      </p>
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end mr-2">
              <div className="">
                <span className="flex items-center text-[11px]">
                  <MdOutlineErrorOutline size={"15px"} className="mr-1" />
                  Maximum file size: 5MB & Maximum of 5 IMAGES
                </span>
              </div>
            </div>
            {errorMsg && (
              <div className="text-red-500 text-base font-medium">
                {errorMsg}
              </div>
            )}
            <div className="">
              <p>
                {errors?.image?.message &&
                  typeof errors?.image?.message === "string" && (
                    <small style={{ color: "red" }}>
                      {errors?.image?.message}
                    </small>
                  )}
              </p>
              {images.length > 0 && (
                <h3 className="text-lg font-medium my-3">Product Images</h3>
              )}
              <div className="grid gap-y-3 gap-x-3 grid-cols-5 mb-2">
                {images.map((image: any, index: number) => (
                  <div key={index} className="relative w-[80px] h-[80px] ">
                    <img
                      src={image.preview}
                      alt={`Cover image ${index + 1}`}
                      className="w-full h-full rounded-[5px] object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1"
                    >
                      <MdDelete size={"20px"} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="">
            <Button className=" w-full text-lg font-semibold py-5">
              {loading ? (
                <span className="flex space-x-1">
                  <LoaderCircle className=" animate-spin" size={15} />
                  Creating product please wait...
                </span>
              ) : (
                "Create Product"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
