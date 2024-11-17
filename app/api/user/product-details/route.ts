import dbConnect from "@/lib/db";
import { ErrorMessage } from "@/lib/ErrorMessage";
import { productModel } from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return ErrorMessage("Product ID is required", 400);
    }
    await dbConnect();

    const product = await productModel.findById(id);

    if (!product) {
      return ErrorMessage("Product not found", 404);
    }

    return new NextResponse(JSON.stringify({ product }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return ErrorMessage("Server Error", 500);
  }
};
