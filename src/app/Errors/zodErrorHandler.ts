import { ZodError, ZodIssue } from "zod";
import { IErrorData } from "./error.interface";
import httpStatus from "http-status";

export const zodErrorHandler = (err: ZodError): IErrorData => {
  const statusCode = httpStatus.BAD_REQUEST;
  const message = "Zod Validation Error";
  const errorSources = err?.errors?.map((issue: ZodIssue) => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));
  const errorMessage = errorSources.map((error) => error.message).join(", ");
  const newMessage = message + ":" + " " + errorMessage;
  return {
    message: newMessage,
    errorSources,
    statusCode,
  };
};
