import mongoose from "mongoose";
import { IErrorData, IErrorSource } from "./error.interface";

const handleCastError = (err: mongoose.Error.CastError): IErrorData => {
  const errorSources: IErrorSource[] = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid ID",
    errorSources,
  };
};

export default handleCastError;
