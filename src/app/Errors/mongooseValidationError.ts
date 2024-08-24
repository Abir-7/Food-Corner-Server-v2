import mongoose from "mongoose";
import { IErrorData, IErrorSource } from "./error.interface";

const mongooseValidationError = (
  err: mongoose.Error.ValidationError
): IErrorData => {
  const errorSources: IErrorSource[] = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );
  const errorMessage = errorSources.map((error) => error.message).join(", ");
  const statusCode = 400;

  return {
    statusCode,
    message: `ValidationError: ${errorMessage}`,
    errorSources,
  };
};

export default mongooseValidationError;
