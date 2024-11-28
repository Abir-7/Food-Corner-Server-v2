import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { itemService } from "./item.service";

const createItem = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await itemService.createItemIntoDB(data);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Product created successfully",
  });
});

const getAllItem = catchAsync(async (req, res) => {
  const queries = req.query;

  const result = await itemService.getAllItemFromDB(queries);
  sendResponse(res, {
    data: result.result,
    statusCode: 200,
    success: true,
    message: "All Product are fetched successfully",
    meta: result.meta,
  });
});

const getSingleItem = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await itemService.getSingleItemFromDB(id);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Product is fetched successfully",
  });
});

const updateItem = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  console.log(id, data, "menu update");

  const result = ""; //await itemService.updateItemFromDB(id, data);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Product updated successfully",
  });
});

const deleteItem = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await itemService.deleteItemFromDB(id);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Product deleted successfully",
  });
});

const timeBasedItem = catchAsync(async (req, res) => {
  const result = await itemService.timeBasedItemFromDB();
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Time Based Products are fetched successfully",
  });
});
const ratingBasedItem = catchAsync(async (req, res) => {
  const result = await itemService.ratingBasedItemFromDB();
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Rating Based Products are fetched successfully",
  });
});

export const itemController = {
  deleteItem,
  createItem,
  getAllItem,
  updateItem,
  getSingleItem,
  timeBasedItem,
  ratingBasedItem,
};
