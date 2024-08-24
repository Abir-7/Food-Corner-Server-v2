import User_Role from "./user.constant";

export type IUserRole = "customer" | "admin" | "delivary-man";
export interface IUser {
  id: string;
  email: string;
  password: string;
  passwordChangeAt?: Date;
  role: IUserRole;
  isBlocked: boolean;
}

export type TUserRole = keyof typeof User_Role;
