import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productService } from "./product.service";

const createProduct = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await productService.createProductIntoDB(data);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Product created successfully",
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await productService.getAllProductFromDB();
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "All Product are fetched successfully",
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productService.getSingleProductFromDB(id);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Product is fetched successfully",
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await productService.updateProductFromDB(id, data);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Product updated successfully",
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productService.deleteProductFromDB(id);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Product deleted successfully",
  });
});

export const productController = {
  deleteProduct,
  createProduct,
  getAllProduct,
  updateProduct,
  getSingleProduct,
};
