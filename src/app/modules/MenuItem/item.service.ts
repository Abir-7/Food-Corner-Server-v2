import httpStatus from "http-status";
import { AppError } from "../../Errors/AppError";
import { IProduct } from "./item.interface";
import { Product } from "./item.model";

const createItemIntoDB = async (productData: IProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllItemFromDB = async () => {
  const result = await Product.find({ isDeleted: false });
  return result;
};

const getSingleItemFromDB = async (id: string) => {
  const isProductExist = await Product.isProductExist(id);
  if (!isProductExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "The Product you are searching is not found."
    );
  }
  const isProductDeleted = await Product.isProductDeleted(id);
  if (isProductDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "The Product you are searching is already deleted"
    );
  }
  const result = await Product.findOne({ _id: id });
  return result;
};

const updateItemFromDB = async (id: string, data: Partial<IProduct>) => {
  const isProductExist = await Product.isProductExist(id);
  if (!isProductExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Product not found. Delete action failed."
    );
  }

  const { limitedStatus, ...remainData } = data;
  const modifiedData: Record<string, unknown> = { ...remainData };
  if (limitedStatus && Object.keys(limitedStatus).length) {
    for (const [key, value] of Object.entries(limitedStatus)) {
      modifiedData[`limitedStatus.${key}`] = value;
    }
  }

  const result = await Product.findOneAndUpdate({ _id: id }, modifiedData, {
    new: true,
  });
  return result;
};
const deleteItemFromDB = async (id: string) => {
  const isProductExist = await Product.isProductExist(id);
  if (!isProductExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Product not not found. Delete action failed."
    );
  }
  const isProductDeleted = await Product.isProductDeleted(id);
  if (isProductDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product already deleted");
  }
  const result = await Product.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const productService = {
  createItemIntoDB,
  getAllItemFromDB,
  updateItemFromDB,
  deleteItemFromDB,
  getSingleItemFromDB,
};
