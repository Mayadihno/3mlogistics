"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TextInput from "@/utils/TextInput";
import { useGetCategoryQuery } from "@/redux/rtk/category";
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from "@/redux/rtk/product";
import { ProductProps } from "@/utils/productData";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AdminProduct = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: "" });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data } = useGetCategoryQuery({});
  const query = new URLSearchParams({
    category,
    productName,
    page: (page + 1).toString(),
    limit: pageSize.toString(),
  }).toString();

  const { data: product } = useGetProductQuery({
    querys: query,
  });

  const router = useRouter();
  const handleEditProduct = (id: string) => {
    router.push(`/admin/edit-product/${id}`);
  };
  const [deletProduct] = useDeleteProductMutation();
  const handleDeleteProduct = async () => {
    if (confirmDelete.id) {
      try {
        setDeleteLoading(true);
        console.log(confirmDelete.id);
        const { data } = await deletProduct({ id: confirmDelete.id });
        if (data?.status === 200) {
          toast.success(data?.message);
          setConfirmDelete({ open: false, id: "" });
          setDeleteLoading(false);
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete the product.");
        setDeleteLoading(false);
      }
    }
  };

  return (
    <>
      <div className=" w-full h-full my-10">
        <div className="px-5">
          <div className="flex justify-between items-center pb-4">
            <h1 className="text-2xl text-center font-semibold mb-6 text-gray-700">
              All products
            </h1>
            <Button className="" onClick={() => setOpen(!open)}>
              Filter Product
            </Button>
          </div>
          {open && (
            <div className="py-4 w-full flex items-center space-x-5 px-8">
              <div className="flex-1 w-full">
                <TextInput
                  label="Filter by product name"
                  name="productName"
                  type="text"
                  value={productName}
                  onChange={(e: any) => setProductName(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex-1 w-full">
                <TextInput
                  label="Filter by product category"
                  name="category"
                  type="select"
                  options={data?.categories?.map(
                    (item: { category: string }) => ({
                      value: item.category,
                      displayValue: item.category,
                    })
                  )}
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex-1 w-full">
                <TextInput
                  label="Filter by product category"
                  name="category"
                  type="select"
                  options={data.categories?.map(
                    (item: { category: string }) => ({
                      value: item.category,
                      displayValue: item.category,
                    })
                  )}
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          )}
          <div className="">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
              {product?.products?.map((item: ProductProps) => (
                <div className=" border shadow-md rounded-md" key={item._id}>
                  <div className="w-full h-[250px]">
                    <Image
                      src={item?.image[0]}
                      alt="product-image"
                      className=" w-full h-full object-contain"
                      width={400}
                      height={400}
                      priority
                    />
                  </div>
                  <div className="px-2 font-ebgaramond border-t-2">
                    <div className="flex items-center justify-between pt-2">
                      <h3 className="text-xl font-medium">{item?.name}</h3>
                      <h3 className="text-lg font-medium">
                        Brand: {item?.brand}
                      </h3>
                    </div>
                    <div className="flex space-x-4 py-1 text-lg">
                      <h4 className=" text-red-400 line-through font-medium">
                        {formatCurrency(parseFloat(item?.discountPrice))}
                      </h4>
                      <h4 className="font-bold">
                        {formatCurrency(item?.price)}
                      </h4>
                    </div>
                    <div className="flex justify-between py-1 items-center text-lg font-semibold">
                      <h3>Category: {item.category}</h3>
                      <h3>Stock: {item.stock}</h3>
                      <h3>Sold Out: 0</h3>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <Button
                        className="bg-blue-400 hover:bg-blue-200 text-white"
                        onClick={() => handleEditProduct(item._id)}
                      >
                        Edit Product
                      </Button>
                      <Button
                        className="bg-[#202C45] text-white"
                        onClick={() => setOpen(!open)}
                      >
                        Available
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-red-300 text-white"
                        onClick={() =>
                          setConfirmDelete({ open: true, id: item?._id })
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {confirmDelete.open && (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex justify-center items-center">
          <div className=" w-[95%] md:w-[300px] h-[25vh] md:h-[200px] bg-white rounded-[10px] p-4 shadow-md">
            <h3 className="text-sm my-5 text-nowrap text-center">
              Are you sure you want to delete this Product?
            </h3>
            <div className="flex justify-center mt-[40px] items-center space-x-7">
              {deleteLoading ? (
                <h2 className="text-lg font-semibold font-ebgaramond">
                  Deleting Product. Please wait....
                </h2>
              ) : (
                <>
                  <Button
                    onClick={handleDeleteProduct}
                    className=" bg-red-500 hover:animate-pulse hover:bg-red-500 text-white p-3 rounded-[5px]"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => setConfirmDelete({ open: false, id: "" })}
                    className=" bg-blue-500 hover:bg-blue-500 hover:animate-pulse text-white p-3 rounded-[5px]"
                  >
                    No
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProduct;
