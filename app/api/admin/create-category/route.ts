import dbConnect from "@/lib/db";
import { ErrorMessage } from "@/lib/ErrorMessage";
import categoryModel from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { data } = await req.json();
  await dbConnect();
  try {
    if (!data.category) {
      return ErrorMessage("Category field is empty", 400);
    }

    await categoryModel.create({
      category: data.category,
      subCategory: data.subCategory,
      description: data.description,
    });

    return NextResponse.json({
      message: "Category created successfully",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return ErrorMessage("Internal Server error try again later", 500);
  }
};

export const GET = async () => {
  await dbConnect();
  try {
    const categories = await categoryModel.find();
    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
    return ErrorMessage("Internal Server error try again later", 500);
  }
};
