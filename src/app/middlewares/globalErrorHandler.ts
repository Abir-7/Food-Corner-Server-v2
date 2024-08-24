import { ErrorRequestHandler } from "express";
import { IErrorSource } from "../Errors/error.interface";

import { ZodError } from "zod";
import { zodErrorHandler } from "../Errors/zodErrorHandler";
import config from "../config";

import mongooseValidationError from "../Errors/mongooseValidationError";
import { AppError } from "../Errors/AppError";
import handleCastError from "../Errors/mongooseCastError";
import handleDuplicateError from "../Errors/handleDuplicateError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "error";
  let errorSources: IErrorSource[] = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const zodError = zodErrorHandler(err);
    statusCode = zodError.statusCode;
    errorSources = zodError.errorSources;
    message = zodError.message;
  } else if (err?.name == "ValidationError") {
    const errorData = mongooseValidationError(err);
    errorSources = errorData.errorSources;
    message = errorData.message;
    statusCode = errorData.statusCode;
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof AppError) {
    console.log("gg");
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  return res.status(statusCode).send({
    success: false,
    message: message,
    errorSources: errorSources,
    err: err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};
export default globalErrorHandler;
