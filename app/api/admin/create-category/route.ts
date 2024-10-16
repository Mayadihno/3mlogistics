import dbConnect from "@/lib/db";
import { ErrorMessage } from "@/lib/ErrorMessage";
import categoryModel from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const {
    data: { category, subCategory, description },
  } = await req.json();
  await dbConnect();
  try {
    const categoryExist = await categoryModel.findOne({ category });
    if (categoryExist) {
      const duplicateSubCategory = categoryExist.subCategory.some(
        (sub: string) => subCategory.includes(sub)
      );
      if (duplicateSubCategory) {
        return ErrorMessage("This Subcategory already exists", 409);
      } else {
        categoryExist.subCategory.push(...subCategory);
        await categoryExist.save();

        return new NextResponse(
          JSON.stringify({
            message: "Subcategory added successfully",
            status: 201,
          })
        );
      }
    } else {
      const newCategory = new categoryModel({
        category,
        subCategory,
        description,
      });
      await newCategory.save();
      return new NextResponse(
        JSON.stringify({
          message: "Category created successfully",
          status: 201,
        })
      );
    }
  } catch (error) {
    console.log(error);
    return ErrorMessage("An error occurred while processing the request", 500);
  }
};
