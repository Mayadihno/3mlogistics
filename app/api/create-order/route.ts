import dbConnect from "@/lib/db";
import { ErrorMessage } from "@/lib/ErrorMessage";
import orderModel from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { usersData, cartItems, shippingFee, totalPrice, paymentInfo } =
    await request.json();

  await dbConnect();
  try {
    const order = await orderModel.create({
      usersData: usersData,
      cartItems: cartItems,
      shippingFee: shippingFee,
      totalPrice: totalPrice,
      paymentInfo: paymentInfo,
    });

    if (!order) {
      return ErrorMessage("Order not created ", 401);
    }

    return new NextResponse(
      JSON.stringify({
        message: "Orders Created Successfully",
        orderId: order._id,
        status: 201,
      })
    );
  } catch (error) {
    return ErrorMessage("Internal server error. please try again", 500);
  }
};
