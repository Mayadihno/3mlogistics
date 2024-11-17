import dbConnect from "@/lib/db";
import { ErrorMessage } from "@/lib/ErrorMessage";
import orderModel from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return ErrorMessage("Order ID is required", 400);
    }

    await dbConnect();

    const order = await orderModel.findById(id);
    return new NextResponse(JSON.stringify({ order }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return ErrorMessage("Server Error", 500);
  }
};
