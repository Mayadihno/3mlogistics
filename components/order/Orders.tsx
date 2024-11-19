"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useGetUserOrdersQuery } from "@/redux/rtk/user";
import React, { useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { Button } from "../ui/button";
import { ICONS } from "@/utils/icons";
import { formatCurrency } from "@/utils/format";
import { CartItem } from "@/redux/slice/cartSlice";
const Orders = () => {
  const { user } = useAppSelector((state) => state.user);
  const id = user.data?._id;
  const { data } = useGetUserOrdersQuery(id!);
  console.log(data);
  const orders = data?.order;

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: "Order ID", minWidth: 200, flex: 1.5 },
      {
        field: "status",
        headerName: "Status",
        minWidth: 180,
        flex: 1,
        type: "singleSelect",
        cellClassName: (params) => {
          return params.value === "Delivered"
            ? "text-base text-green-500 font-semibold font-ebgaramond"
            : "text-base text-red-500 font-semibold font-ebgaramond";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 180,
        align: "center",
        headerAlign: "center",
        flex: 1,
      },
      {
        field: "total",
        headerName: "Total",
        type: "number",
        minWidth: 100,
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: " ",
        flex: 1,
        minWidth: 170,
        headerName: "",
        renderCell: (params) => (
          <Link href={`/orders/${params.id}`} className="pl-24">
            <Button variant="ghost">
              <ICONS.eye size={20} />
            </Button>
          </Link>
        ),
      },
    ],
    []
  );

  const rows = useMemo(
    () =>
      orders?.map(
        (item: { _id: string; cartItems: CartItem[]; status: string }) => ({
          id: item._id,
          itemsQty: item.cartItems.length,
          total: formatCurrency(
            item.cartItems.reduce(
              (acc: number, cartItem: { price: number; qty: number }) =>
                acc + cartItem.price * cartItem.qty,
              0
            )
          ),
          status: item.status,
        })
      ) || [],
    [orders]
  );
  return (
    <div className="md:w-[90%] w-[98%] mx-auto mb-32">
      <h3 className="text-3xl font-ebgaramond my-5 text-center font-bold">
        Orders
      </h3>
      <div className="pt-1 md:w-[90%] w-full mx-auto">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default Orders;
