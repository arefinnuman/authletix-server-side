import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorMessage } from '../interfaces/genericError';
import { IGenericErrorResponse } from '../interfaces/genericErrorResponse';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
export default handleZodError;
