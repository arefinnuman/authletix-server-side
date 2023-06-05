import { IGenericErrorMessage } from './IGenericErrorMessage'

export interface IGenericErrorResponse {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}
