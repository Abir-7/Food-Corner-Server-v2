import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productService } from "./item.service";

const createItem = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await productService.createItemIntoDB(data);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Product created successfully",
  });
});

const getAllItem = catchAsync(async (req, res) => {
  const result = await productService.getAllItemFromDB();
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "All Product are fetched successfully",
  });
});

const getSingleItem = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productService.getSingleItemFromDB(id);
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
  const result = await productService.updateItemFromDB(id, data);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Product updated successfully",
  });
});

const deleteItem = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productService.deleteItemFromDB(id);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Product deleted successfully",
  });
});

export const productController = {
  deleteItem,
  createItem,
  getAllItem,
  updateItem,
  getSingleItem,
};
