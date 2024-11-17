import dbConnect from "@/lib/db";
import { ErrorMessage } from "@/lib/ErrorMessage";
import { uploadImageToCloudinary } from "@/lib/uploadtocloudinary";
import { productModel } from "@/models/productModel";
import { UserModel } from "@/models/userModel";
import { revalidatePath } from "next/cache";
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

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("productName");
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  console.log(search, category, page, limit);

  const query: any = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (category) {
    query.category = { $regex: category, $options: "i" };
  }

  try {
    dbConnect();
    const products = await productModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await productModel.countDocuments(query);
    return new NextResponse(
      JSON.stringify({
        products,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return ErrorMessage("Something went wrong", 500);
  }
};

export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();
  await dbConnect();
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return ErrorMessage("No product found", 404);
    }
    await productModel.findByIdAndDelete(id);
    revalidatePath("/admin-product");

    return NextResponse.json({
      message: "Product deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return ErrorMessage("Failed to delete product", 500);
  }
};

export const PATCH = async (req: NextRequest) => {
  const { id, status } = await req.json();
  await dbConnect();
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return ErrorMessage("No product found", 404);
    }
    await productModel.findByIdAndUpdate(id, {
      isAvailable: !status,
    });
    revalidatePath("/admin-product");
    return NextResponse.json({
      message: "Product updated successfully",
      status: 200,
    });
  } catch (error) {
    return ErrorMessage("Failed to update product", 500);
    console.log(error);
  }
};
