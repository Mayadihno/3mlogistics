import dbConnect from "@/lib/db";
import { ErrorMessage } from "@/lib/ErrorMessage";
import { uploadImageToCloudinary } from "@/lib/uploadtocloudinary";
import { productModel } from "@/models/productModel";
import { UserModel } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const discountPrice = formData.get("discountPrice") as string;
    const stock = formData.get("stock") as string;
    const category = formData.get("category") as string;
    const subCategory = formData.get("subCategory") as string;
    const description = formData.get("description") as string;
    const weight = formData.get("weight") as string;
    const brand = formData.get("brand") as string;
    const userId = formData.get("userId") as string;

    const images: File[] = [];
    formData.forEach((value, key) => {
      if (key === "images") {
        images.push(value as File);
      }
    });

    await dbConnect();

    const user = await UserModel.findOne({ _id: userId });
    if (user.role !== "admin") {
      return ErrorMessage("UnAunthorized to create product", 401);
    }

    // Upload images to Cloudinary
    let imageUrl: string[] | string | null = null;
    const folder = "UMLproductImages";
    if (images.length > 0) {
      try {
        imageUrl = await uploadImageToCloudinary(images, folder);
      } catch (uploadError: any) {
        console.error(uploadError.message);
        return ErrorMessage(uploadError.message, 500);
      }
    }

    const productData = {
      name,
      price,
      discountPrice,
      stock,
      category,
      subCategory,
      description,
      weight,
      brand,
      image: imageUrl,
    };

    await productModel.create(productData);
    return new NextResponse(
      JSON.stringify({
        message: "Product Created successfully",
        status: 201,
      })
    );
  } catch (error) {
    console.log(error);
    return ErrorMessage("Something went wrong", 500);
  }
};
