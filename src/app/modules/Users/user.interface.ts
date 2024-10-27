import User_Role from "./user.constant";

export type IUserRole = "customer" | "admin" | "delivary-man" | "superAdmin";
export interface IUser {
  id: string;
  email: string;
  password: string;
  passwordChangeAt?: Date;
  role: IUserRole;
  isBlocked: boolean;
  isDeleted: boolean;
  isVerified: boolean;
  verificationToken: string;
}

export type TUserRole = keyof typeof User_Role;
