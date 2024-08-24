import httpStatus from "http-status";
import { AppError } from "../../Errors/AppError";
import { User } from "../Users/user.model";
import { ILoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";

const userLogin = async (data: ILoginUser) => {
  const isUserExist = await User.findOne({ email: data.email }).select(
    "+password"
  );
  if (!isUserExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Email not found. Check your email"
    );
  }

  if (isUserExist.password !== data.password) {
    throw new AppError(httpStatus.NOT_FOUND, "Password not match..");
  }

  if (isUserExist.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, "You have blocked by admin");
  }

  const jwtPayload = {
    userEmail: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string
  );

  return accessToken;
};

export const authService = {
  userLogin,
};
