/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../../modules/Users/user.interface";
import catchAsync from "../../utils/catchAsync";
import { AppError } from "../../Errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { User } from "../../modules/Users/user.model";

export const auth = (...userRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    try {
      const decoded = jwt.verify(
        token,
        config.JWT_ACCESS_SECRET as string
      ) as JwtPayload;

      const { role, userEmail } = decoded as JwtPayload;

      // checking if the user is exist
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
      }

      // checking if the user is already deleted

      const isBlocked = user?.isBlocked;

      if (isBlocked) {
        throw new AppError(httpStatus.FORBIDDEN, "This user is Blocked!");
      }

      if (userRoles && !userRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!!");
      }

      req.user = decoded as JwtPayload & { userEmail: string; role: string };
      next();
    } catch (error: any) {
      throw new Error(error);
    }
  });
};
