"use client";
import React, { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TextInput from "@/utils/TextInput";
import { useGetCategoryQuery } from "@/redux/rtk/category";

const AdminProduct = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const columns: GridColDef[] = [
    {
      field: "productName",
      headerName: "Product Name",
      minWidth: 200,
      flex: 0.7,
    },
    {
      field: "image",
      headerName: "Image",
      minWidth: 130,
      flex: 0.7,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => (
        <div className="flex justify-center items-center">
          <Image
            src={params.value}
            alt={params.row.productName}
            width={40}
            height={40}
            className=" rounded-[5px] my-2"
          />
        </div>
      ),
    },
    {
      field: "salesPrice",
      headerName: "Sales Price",
      type: "singleSelect",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      type: "singleSelect",
      minWidth: 130,
      align: "center",
      headerAlign: "center",
      flex: 0.7,
      // renderCell: (params: any) => (
      //   <ProductStatusCell
      //     value={params.value}
      //     row={params.row}
      //     updateProductStatus={updateProductStatus}
      //     isLoading={loadingRows[params.row.id] || false}
      //   />
      // ),
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "singleSelect",
      minWidth: 130,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "soldOut",
      headerName: "Sold Out",
      type: "singleSelect",
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "Actions",
      flex: 1,
      minWidth: 150,
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      type: "singleSelect",
      //   renderCell: (params: any) => {
      //     const isRowLoading = loadingRows[params.id] || false;
      //     return (
      //       <div className="flex items-center justify-center space-x-2">
      //         <Link href={`/seller-product/${params.id}`}>
      //           {isRowLoading ? (
      //             <div className="px-3">
      //               <LoaderCircleIcon className="mt-4 animate-spin" />
      //             </div>
      //           ) : (
      //             <Button variant="ghost">
      //               <ICONS.eye
      //                 title="View Product"
      //                 size={20}
      //                 className="text-green-500"
      //               />
      //             </Button>
      //           )}
      //         </Link>
      //         <Link href={`/edit-product/${params.id}`}>
      //           {isRowLoading ? (
      //             <div className="px-3">
      //               <LoaderCircleIcon className="mt-4 animate-spin" />
      //             </div>
      //           ) : (
      //             <Button variant="ghost">
      //               <ICONS.edit
      //                 title="Edit Product"
      //                 size={20}
      //                 className="text-blue-500"
      //               />
      //             </Button>
      //           )}
      //         </Link>
      //         {isRowLoading ? (
      //           <div className="px-3">
      //             <LoaderCircleIcon className="mt-4 animate-spin" />
      //           </div>
      //         ) : (
      //           <Button
      //             onClick={() => setConfirmDelete({ open: true, id: params.id })}
      //             variant="destructive"
      //           >
      //             <ICONS.delete
      //               title="Delete Product"
      //               size={20}
      //               className="text-red-500"
      //             />
      //           </Button>
      //         )}
      //       </div>
      //     );
      //   },
    },
  ];
  const { data } = useGetCategoryQuery({});

  const rows: readonly any[] | undefined = [];
  return (
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
                options={data?.map((item: { category: string }) => ({
                  value: item.category,
                  displayValue: item.category,
                }))}
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
                options={data?.map((item: { category: string }) => ({
                  value: item.category,
                  displayValue: item.category,
                }))}
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        )}
        <div className="">
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
