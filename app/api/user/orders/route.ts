import dbConnect from "@/lib/db";
import { ErrorMessage } from "@/lib/ErrorMessage";
import orderModel from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return ErrorMessage("User ID is required", 400);
    }
    await dbConnect();

    const order = await orderModel
      .find({ "usersData._id": id })
      .populate("cartItems")
      .sort({ createdAt: -1 });
    return new NextResponse(JSON.stringify({ order }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return ErrorMessage("Server Error", 500);
  }
};