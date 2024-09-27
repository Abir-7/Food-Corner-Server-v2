import httpStatus from "http-status";
import { AppError } from "../../Errors/AppError";
import {
  Categories,
  Cuisines,
  ICategory,
  ICuisine,
} from "./option.interface.model.validation";

const addCategoryIntoDB = async (data: ICategory) => {
  const isExist = await Categories.findOne({ category: data.category });
  if (isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Category is already added");
  }
  const result = await Categories.create(data);
  return result;
};

const addCuisineIntoDB = async (data: ICuisine) => {
  const isExist = await Cuisines.findOne({ cuisine: data.cuisine });
  if (isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Cuisine is already added");
  }
  const result = await Cuisines.create(data);
  return result;
};

const getCategoryFromDb = async () => {
  const result = await Categories.find();
  return result;
};

const getCuisineFromDb = async () => {
  const result = await Cuisines.find();
  return result;
};

const updateCategoryFromDb = async (id: string, data: ICategory) => {
  const isExist = await Categories.findOne({ _id: id });
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Category not found.");
  }
  const result = await Categories.findByIdAndUpdate(id, data, { new: true });

  return result;
};

const updateCuisineFromDb = async (id: string, data: ICuisine) => {
  const isExist = await Cuisines.findOne({ _id: id });
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Cuisine not found.");
  }
  const result = await Cuisines.findByIdAndUpdate(id, data);
  return result;
};

export const optionService = {
  addCategoryIntoDB,
  addCuisineIntoDB,
  getCategoryFromDb,
  getCuisineFromDb,
  updateCategoryFromDb,
  updateCuisineFromDb,
};
