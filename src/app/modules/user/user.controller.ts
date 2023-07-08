import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../functions/catchAsync';
import sendResponse from '../../../functions/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createCustomer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { customer, ...userData } = req.body;
    const result = await UserService.createCustomer(customer, userData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `User Created Successfully`,
      data: result,
    });
  }
);

const createSeller: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { seller, ...userData } = req.body;
    const result = await UserService.createSeller(seller, userData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `seller Created Successfully`,
      data: result,
    });
  }
);

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserService.createAdmin(admin, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  }
);

export const UserController = {
  createCustomer,
  createSeller,
  createAdmin,
};
