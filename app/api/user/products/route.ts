import dbConnect from "@/lib/db";
import { ErrorMessage } from "@/lib/ErrorMessage";
import { productModel } from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") as string) || 1;
  const limit = parseInt(searchParams.get("limit") as string) || 10;
  const name = searchParams.get("name") || "";
  const category = searchParams.get("category") || "";

  try {
    await dbConnect();

    const filters = {} as any;

    if (name) filters.name = { $regex: name, $options: "i" };

    if (category) {
      filters["category.value"] = { $regex: category, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const products = await productModel
      .find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalProducts = await productModel.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / limit);
    return new NextResponse(
      JSON.stringify({
        products,
        totalPages,
        totalProducts,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return ErrorMessage("No product available", 404);
  }
};
