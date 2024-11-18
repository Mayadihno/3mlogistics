import dbConnect from "@/lib/db";
import { ErrorMessage } from "@/lib/ErrorMessage";
import { UserModel } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const { userData } = await req.json();

    // db connection
    await dbConnect();

    //check if your already exist with this email address
    const email = userData.email;
    const userEmail = await UserModel.findOne({ email });
    if (userEmail) {
      return ErrorMessage("User already exists with this email address", 401);
    }

    // hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // destructure the userData
    const newUser = {
      firstName: userData.firstName,
      email: userData.email,
      password: hashedPassword,
      phoneNumber: userData.phoneNumber,
      lastName: userData.lastName,
    };

    const user = await UserModel.create(newUser);
    if (user) {
      return new NextResponse(
        JSON.stringify({
          message: "User Created Successfully",
          status: 201,
        })
      );
    } else {
      return ErrorMessage("User Registration Failed", 401);
    }
  } catch (error) {
    const errorMessage = (error as Error).message || "Internal Server Error";
    return ErrorMessage(errorMessage, 500);
  }
};
