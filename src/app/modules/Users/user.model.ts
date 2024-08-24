import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

export const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: [true, "Id is required."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be at least 8 characters long."],
      select: false, // Don't include password in query results by default
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: {
        values: ["customer", "admin", "delivary-man"],
        message: "Role must be either customer, admin, or delivary-man",
      },
      default: "customer",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
