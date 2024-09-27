import { Model } from "mongoose";
import { Types } from "mongoose";
export interface IProduct {
  title: string;
  description: string;
  category: Types.ObjectId;
  price: { price: number; size: string }[];
  inStock: boolean;
  isDeleted: boolean;
  availableFor: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  photo: string;
  cuisine: Types.ObjectId;
  limitedStatus: { quantity: number; isLimited: boolean };
  rating: { averageRating: number; ratingCount: number };
}

export interface ProductModel extends Model<IProduct> {
  isProductExist(id: string): Promise<IProduct | null>;
  isProductDeleted(id: string): Promise<boolean | null>;
}
