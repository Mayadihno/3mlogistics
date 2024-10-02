import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
  _id: string;
  email: string;
}

export async function veryUser(req: NextRequest) {
  const accessToken = req.cookies.get("sessionToken")?.value;

  if (!accessToken) {
    const renewed = await renewToken(req);
    if (renewed) {
      return NextResponse.next();
    } else {
      return NextResponse.json({ valid: false, message: "No Access Token" });
    }
  } else {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_SECRET_KEY as string
      ) as DecodedToken;
      (req as any).email = decoded.email;
      (req as any)._id = decoded._id;
      return NextResponse.next();
    } catch (err) {
      console.error("Token verification error:", err);
      return NextResponse.json({ valid: false, message: "Invalid Token" });
    }
  }
}

async function renewToken(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return false;
  } else {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_KEY as string
      ) as DecodedToken;
      const accessToken = jwt.sign(
        { _id: decoded._id, email: decoded.email },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "4h" }
      );
      const response = NextResponse.next();
      response.cookies.set("sessionToken", accessToken, {
        maxAge: 4 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return true;
    } catch (err) {
      console.error("Refresh token verification error:", err);
      return false;
    }
  }
}
