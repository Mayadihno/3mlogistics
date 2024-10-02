import dbConnect from "@/lib/db";
import { ErrorMessage } from "@/lib/ErrorMessage";
import { UserModel } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "@/lib/generateJWT";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const {
    data: { email, password },
  } = await req.json();

  await dbConnect();
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return ErrorMessage("User not found", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return ErrorMessage("Incorrect Password", 401);
    }
    const { password: savedPassword, ...usersData } = user.toObject();

    const accessToken = generateAccessToken(usersData);
    const refreshToken = generateRefreshToken(usersData);

    const response = NextResponse.json({
      message: "Login successful",
      data: usersData,
      accessToken,
      status: 200,
    });

    response.cookies.set("sessionToken", accessToken, {
      maxAge: 4 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    response.cookies.set("refreshToken", refreshToken, {
      maxAge: 8 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    return ErrorMessage("Internal server error", 500);
  }
};
