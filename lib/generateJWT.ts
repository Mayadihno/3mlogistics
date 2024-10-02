import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}
const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "4h",
};

const DEFAULT_SIGN_OPTIONR: SignOption = {
  expiresIn: "8h",
};
export function generateAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  const secret = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret!, options);
  return token;
}

export function generateRefreshToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTIONR
) {
  const secret = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret!, options);
  return token;
}
