import dbConnect from "@/lib/db";
import orderModel from "@/models/orderModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();

    const orders = await orderModel.find().sort({ createdAt: -1 });
    return new NextResponse(JSON.stringify({ orders }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
