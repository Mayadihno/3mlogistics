import dbConnect from "@/lib/db";
import { ErrorMessage } from "@/lib/ErrorMessage";
import { UserModel } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const {
    userId,
    newData: { oldPassword, newPassword },
  } = await req.json();
  await dbConnect();
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return ErrorMessage("User not found", 404);
    }
    const confirmPassword = await bcrypt.compare(oldPassword, user.password);
    if (!confirmPassword) {
      return ErrorMessage("Incorrect Password", 401);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();
    return NextResponse.json({
      message: "Password updated successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return ErrorMessage("Internal Server error try again later", 500);
  }
};
