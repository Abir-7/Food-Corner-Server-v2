import { Model, Types } from "mongoose";

interface Iname {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface ICustomer {
  id: string;
  email: string;
  name: Iname;
  contactNo: number;
  address: string;
  user: Types.ObjectId;
}

export interface ICustomerUpdate {
  contactNo: number;
  address: string;
  name: Iname;
}

export interface CustomerModel extends Model<ICustomer> {
  isCustomerExist(email: string): Promise<ICustomer | null>;
}
