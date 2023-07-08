import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/genericError';
import { IGenericErrorResponse } from './../interfaces/genericErrorResponse';

const CastError = (error: mongoose.Error.CastError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: `Invalid Id`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default CastError;
