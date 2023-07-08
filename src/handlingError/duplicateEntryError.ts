import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/genericErrorResponse';

const DuplicateKeyError = (error: mongoose.Error): IGenericErrorResponse => {
  const duplicateField = Object.keys((error as any).keyValue)[0];
  const errorMessage = `${duplicateField} already exists`;

  const statusCode = 409;
  return {
    statusCode,
    message: 'E11000 duplicate key error collection',
    errorMessages: [
      {
        path: duplicateField,
        message: errorMessage,
      },
    ],
  };
};

export default DuplicateKeyError;
