import { Model } from "mongoose";

export interface IProduct {
  title: string;
  description: string;
  category: "Rice" | "Kabab";
  price: { price: number; size: string }[];
  status: { inStock: boolean; availableQuantity: number | "nolimit" };
  isDeleted: boolean;
  availableFor: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  photo: string;
  cuisine: string;
}

export interface ProductModel extends Model<IProduct> {
  isProductExist(id: string): Promise<IProduct | null>;
  isProductDeleted(id: string): Promise<boolean | null>;
}
