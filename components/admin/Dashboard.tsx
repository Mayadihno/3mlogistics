"use client";
import React, { useEffect, useMemo, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { Button } from "../ui/button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useGetAllOrdersQuery } from "@/redux/rtk/orderSlice";
import { CartItem } from "@/redux/slice/cartSlice";
import { formatCurrency } from "@/utils/format";
import { LoaderCircle } from "lucide-react";
import { useGetProductQuery } from "@/redux/rtk/product";

const Dashboard = () => {
  const [availableBalance, setAvailableBalance] = useState<number>(0);
  const { data, error, isLoading } = useGetAllOrdersQuery({});
  const { data: product } = useGetProductQuery({
    querys: "",
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "text-green-500" : "text-red-500";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "total",
      headerName: "Total Price",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "payment",
      headerName: "Payment Info",
      type: "string",
      minWidth: 120,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },

    {
      field: " ",
      flex: 0.6,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link href={`/admin-orders/${params.id}`}>
              <Button className="bg-black hover:bg-[#000000c0] px-4 py-2 my-1 text-white rounded-[5px]">
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const totalOrderDelivered = useMemo(() => {
    return (
      (data?.orders &&
        data?.orders?.filter(
          (item: { status: string }) => item.status === "Delivered"
        )) ||
      []
    );
  }, [data?.orders]);

  const totalEarningWithoutTax = useMemo(() => {
    return (
      totalOrderDelivered
        ?.map((order: { cartItems: CartItem[] }) =>
          order.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
        .reduce((acc: number, value: number) => acc + value, 0) ?? 0
    );
  }, [totalOrderDelivered]);

  useEffect(() => {
    setAvailableBalance(totalEarningWithoutTax);
  }, [totalEarningWithoutTax]);

  const rows =
    data?.orders
      ?.map(
        (item: {
          cartItems: CartItem[];
          _id: string;
          status: string;
          paymentInfo: { type: string };
        }) => {
          const total = item.cartItems.reduce(
            (acc: number, cartItem: CartItem) =>
              acc + cartItem.price * cartItem.qty,
            0
          );
          return {
            id: item._id,
            itemsQty: item.cartItems.length,
            total: formatCurrency(total),
            status: item.status,
            payment: item.paymentInfo.type,
          };
        }
      )
      .slice(0, 5) || [];
  const totalOrders = data?.orders.length;
  const totalProduct = product?.products?.length;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className=" animate-spin" size={50} color="#e94560" />
      </div>
    );
  }
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        Error loading orders
      </div>
    );
  return (
    <div className="md:w-full font-ebgaramond md:px-5 px-1 mt-5">
      <h3 className="font-ebgaramond font-bold text-2xl pb-2 md:pb-5">
        Overview
      </h3>
      <div className="md:flex-row flex-col w-full md:flex items-center justify-between">
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow-md md:shadow px-2 rounded py-5">
          <div className="flex items-center pl-4">
            <h3 className={`text-2xl font-medium text-black`}>
              Account Balance
            </h3>
          </div>
          <h5 className="py-3 pl-4 font-bold text-2xl">
            {formatCurrency(availableBalance)}
          </h5>
        </div>
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow-md md:shadow px-2 rounded py-5">
          <div className="flex items-center pl-4">
            <h3 className={`text-2xl font-medium text-black`}>
              All Orders
              <span className="text-sm pl-1">
                (including pending & completed orders)
              </span>
            </h3>
          </div>
          <h5 className="py-3 pl-4 font-bold text-2xl">{totalOrders ?? 0}</h5>
          <Link href={"/admin-orders"}>
            <h5 className="pl-4 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow-md md:shadow px-2 rounded py-5">
          <div className="flex items-center pl-4">
            <h3 className={`text-2xl font-medium text-black`}>
              All Products
              <span className="text-sm pl-2">
                (including out-of-stock items)
              </span>
            </h3>
          </div>
          <h5 className="py-3 pl-4 font-bold text-2xl">{totalProduct}</h5>
          <Link href={"/admin-product"}>
            <h5 className="pl-4 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
      </div>
      <div className="mt-10 md:my-0 my-6">
        <h3 className="font-ebgaramond font-bold text-2xl pb-2 pt-5">
          Latest Orders
        </h3>
        <div className="w-full pt-1 bg-white">
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pagination
            pageSizeOptions={[5]}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
