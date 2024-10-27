import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import { AppError } from "../../Errors/AppError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../config";

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
        values: ["customer", "admin", "delivary-man", "superAdmin"],
        message: "Role must be either customer, admin, or delivary-man",
      },
      default: "customer",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const isUserExist = await User.findOne({ email: this.email });
  if (isUserExist) {
    throw new AppError(httpStatus.CONFLICT, "User already exist");
  }
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_sault_round)
  );
  next();
});

userSchema.post("save", async function (data) {
  data.password = "**********************";
});

export const User = model<IUser>("User", userSchema);
