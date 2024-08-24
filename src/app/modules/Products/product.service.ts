import httpStatus from "http-status";
import { AppError } from "../../Errors/AppError";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (productData: IProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await Product.find({ isDeleted: false });
  return result;
};

const getSingleProductFromDB = async (id: string) => {
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

const updateProductFromDB = async (id: string, data: Partial<IProduct>) => {
  const isProductExist = await Product.isProductExist(id);
  if (!isProductExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Product not found. Delete action failed."
    );
  }

  const { status, ...remainData } = data;
  const modifiedData: Record<string, unknown> = { ...remainData };
  if (status && Object.keys(status).length) {
    for (const [key, value] of Object.entries(status)) {
      modifiedData[`status.${key}`] = value;
    }
  }

  const result = await Product.findOneAndUpdate({ _id: id }, modifiedData, {
    new: true,
  });
  return result;
};
const deleteProductFromDB = async (id: string) => {
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
  createProductIntoDB,
  getAllProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
  getSingleProductFromDB,
};
