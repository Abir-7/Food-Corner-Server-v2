import { Model } from "mongoose";

export interface IProduct {
  title: string;
  description: string;
  category: "Rice";
  price: number;
  status: { inStock: boolean; availableQuantity: number };
  isDeleted: boolean;
  availableFor: "breakFast" | "lunch" | "dinner";
}

export interface ProductModel extends Model<IProduct> {
  isProductExist(id: string): Promise<IProduct | null>;
  isProductDeleted(id: string): Promise<boolean | null>;
}
