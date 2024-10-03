import dbConnect from "@/lib/db";
import { ErrorMessage } from "@/lib/ErrorMessage";
import { UserModel } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export const PATCH = async (req: NextRequest) => {
  const { data } = await req.json();
  await dbConnect();
  try {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) {
      return ErrorMessage("User not found", 404);
    }
    //compare password
    const comparePassword = await bcrypt.compare(data.password, user.password);
    if (!comparePassword) {
      return ErrorMessage("Incorrect Password", 401);
    }

    const newData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
    };

    const userData = await UserModel.findOneAndUpdate(
      { email: data.email },
      newData,
      {
        new: true,
      }
    );
    const { password: savedPassword, ...usersData } = userData.toObject();
    return NextResponse.json({
      message: "Profile updated successfully",
      data: usersData,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return ErrorMessage("Internal Server error try again later", 500);
  }
};
