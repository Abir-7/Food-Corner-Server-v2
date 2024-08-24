import { model, Schema } from "mongoose";
import { CustomerModel, ICustomer } from "./customer.interface";

export const customerSchema = new Schema<ICustomer, CustomerModel>({
  id: { type: String, required: [true, "Id is required."], unique: true },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
  },
  name: {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
    },
    middleName: {
      type: String,
      trim: true, // Optional field
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
    },
  },
  contactNo: {
    type: Number,
    required: [true, "Contact number is required."],
  },
  address: {
    type: String,
    required: [true, "Address is required."],
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required."],
  },
});

customerSchema.statics.isCustomerExist = async function (email: string) {
  const iscustomerExist = await Customer.findOne({ email });
  return iscustomerExist;
};

export const Customer = model<ICustomer, CustomerModel>(
  "Customer",
  customerSchema
);
