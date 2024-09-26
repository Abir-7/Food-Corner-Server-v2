import { Model } from "mongoose";

export interface IProduct {
  title: string;
  description: string;
  category: "Rice" | "Kabab";
  price: { price: number; size: string }[];
  inStock: boolean;
  isDeleted: boolean;
  availableFor: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  photo: string;
  cuisine: string;
  limitedStatus: { quantity: number; isLimited: boolean };
  rating: { averageRating: number; ratingCount: number };
}

export interface ProductModel extends Model<IProduct> {
  isProductExist(id: string): Promise<IProduct | null>;
  isProductDeleted(id: string): Promise<boolean | null>;
}
