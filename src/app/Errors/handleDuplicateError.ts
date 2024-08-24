/* eslint-disable @typescript-eslint/no-explicit-any */

import { IErrorData, IErrorSource } from "./error.interface";

const handleDuplicateError = (err: any): IErrorData => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSources: IErrorSource[] = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: `Invalid: ${extractedMessage} is already exists`,
    errorSources,
  };
};

export default handleDuplicateError;
