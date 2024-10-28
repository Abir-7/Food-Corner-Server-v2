import { ErrorRequestHandler } from "express";
import { IErrorSource } from "../Errors/error.interface";

import { ZodError } from "zod";
import { zodErrorHandler } from "../Errors/zodErrorHandler";
import config from "../config";

import mongooseValidationError from "../Errors/mongooseValidationError";

import handleCastError from "../Errors/mongooseCastError";
import handleDuplicateError from "../Errors/handleDuplicateError";
import { AppError } from "../Errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  let statusCode = 500;
  let message = "Internal server error";
  let errorSources: IErrorSource[] = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  // Zod Validation Error
  if (err instanceof ZodError) {
    const zodError = zodErrorHandler(err);
    statusCode = zodError.statusCode;
    errorSources = zodError.errorSources;
    message = zodError.message;
  }
  // Mongoose Validation Error
  else if (err?.name == "ValidationError") {
    const errorData = mongooseValidationError(err);
    errorSources = errorData.errorSources;
    message = errorData.message;
    statusCode = errorData.statusCode;
  }
  // Cast Error (e.g., invalid ObjectId)
  else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  // Duplicate Key Error (e.g., unique field conflict)
  else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  // JWT Expiration Error (use the actual error type instead of message check)
  else if (err?.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your session has expired. Please login again.";
    errorSources = [
      {
        path: "token",
        message: message,
      },
    ];
  }
  // AppError (custom application error)
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }
  // Generic Error
  else if (err instanceof Error) {
    console.error("Error:", err instanceof Error, err instanceof AppError);
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  // Log error details (only log stack trace in development)

  // Send error response
  return res.status(statusCode).send({
    success: false,
    message: message,
    errorSources: errorSources,
    stack: config.NODE_ENV === "development" ? err.stack : undefined, // only send stack trace in development
  });
};

export default globalErrorHandler;
