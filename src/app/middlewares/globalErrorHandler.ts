/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../handlingError/apiError';
import CastError from '../../handlingError/castError';
import DuplicateKeyError from '../../handlingError/duplicateEntryError';
import ValidationError from '../../handlingError/validationError';
import handleZodError from '../../handlingError/zodError';
import { IGenericErrorMessage } from '../../interfaces/genericError';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
    : console.error(`🐱‍🏍 globalErrorHandler ~~`, error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  // Validation Error
  if (error?.name === 'ValidationError') {
    const simplifiedError = ValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  // Zod Error
  else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  // Cast Error
  else if (error?.name === 'CastError') {
    const simplifiedError = CastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  // Duplicate Key Error
  else if (error?.name === 'MongoServerError') {
    const simplifiedError = DuplicateKeyError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  // Api Error
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  //  Regular Error
  else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  // Default Error
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
