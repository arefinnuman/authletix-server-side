'use strict';
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = require('mongoose');
const zod_1 = require('zod');
const config_1 = __importDefault(require('../../config'));
const apiError_1 = __importDefault(require('../../handlingError/apiError'));
const castError_1 = __importDefault(require('../../handlingError/castError'));
const duplicateEntryError_1 = __importDefault(
  require('../../handlingError/duplicateEntryError')
);
const validationError_1 = __importDefault(
  require('../../handlingError/validationError')
);
const zodError_1 = __importDefault(require('../../handlingError/zodError'));
const globalErrorHandler = (error, req, res, next) => {
  config_1.default.env === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
    : console.error(`🐱‍🏍 globalErrorHandler ~~`, error);
  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages = [];
  // Validation Error
  if (
    (error === null || error === void 0 ? void 0 : error.name) ===
    'ValidationError'
  ) {
    const simplifiedError = (0, validationError_1.default)(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // Zod Error
  else if (error instanceof zod_1.ZodError) {
    const simplifiedError = (0, zodError_1.default)(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // Cast Error
  else if (
    (error === null || error === void 0 ? void 0 : error.name) === 'CastError'
  ) {
    const simplifiedError = (0, castError_1.default)(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // Duplicate Key Error
  else if (
    (error === null || error === void 0 ? void 0 : error.name) ===
    'MongoServerError'
  ) {
    const simplifiedError = (0, duplicateEntryError_1.default)(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // Api Error
  else if (error instanceof apiError_1.default) {
    statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
    message = error.message;
    errorMessages = (
      error === null || error === void 0 ? void 0 : error.message
    )
      ? [
          {
            path: '',
            message:
              error === null || error === void 0 ? void 0 : error.message,
          },
        ]
      : [];
  }
  //  Regular Error
  else if (error instanceof mongoose_1.Error) {
    message = error === null || error === void 0 ? void 0 : error.message;
    errorMessages = (
      error === null || error === void 0 ? void 0 : error.message
    )
      ? [
          {
            path: '',
            message:
              error === null || error === void 0 ? void 0 : error.message,
          },
        ]
      : [];
  }
  // Default Error
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack:
      config_1.default.env !== 'production'
        ? error === null || error === void 0
          ? void 0
          : error.stack
        : undefined,
  });
};
exports.default = globalErrorHandler;
