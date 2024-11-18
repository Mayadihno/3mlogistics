import dbConnect from "@/lib/db";
import { ErrorMessage } from "@/lib/ErrorMessage";
import orderModel from "@/models/orderModel";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const { orderId, orderStatus } = await req.json();

  await dbConnect();

  try {
    const order = await orderModel.findOneAndUpdate(
      { _id: orderId },
      { status: orderStatus }
    );

    if (!order) {
      return ErrorMessage("Order not found", 400);
    }
    revalidatePath("/admin-orders");
    revalidatePath("/admin-dashboard");
    return new NextResponse(
      JSON.stringify({ message: "Order Status updated successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return ErrorMessage("Something went wrong", 500);
  }
};
