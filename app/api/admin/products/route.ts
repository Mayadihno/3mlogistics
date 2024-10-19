import dbConnect from "@/lib/db";
import { ErrorMessage } from "@/lib/ErrorMessage";
import { productModel } from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return ErrorMessage("Product ID is required", 400);
  }
  await dbConnect();
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return ErrorMessage("No product found", 404);
    }
    return NextResponse.json({
      product,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return ErrorMessage("Failed to get product", 500);
  }
};
