import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { optionService } from "./option.service";

const addCategory = catchAsync(async (req, res) => {
  const data = req.body;
  console.log(data);
  const result = await optionService.addCategoryIntoDB(data);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Category added Successfully",
  });
});
const addCuisine = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await optionService.addCuisineIntoDB(data);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Cuisine added Successfully",
  });
});

const getCategory = catchAsync(async (req, res) => {
  const result = await optionService.getCategoryFromDb();
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Category are fetch Successfully",
  });
});

const getCuisine = catchAsync(async (req, res) => {
  const result = await optionService.getCuisineFromDb();
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Cuisine are fetch Successfully",
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const result = await optionService.updateCategoryFromDb(id, data);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Category updated Successfully",
  });
});

const updateCuisine = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await optionService.updateCuisineFromDb(id, data);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Cuisine updated Successfully",
  });
});

export const optionController = {
  getCategory,
  getCuisine,
  addCategory,
  addCuisine,
  updateCategory,
  updateCuisine,
};
