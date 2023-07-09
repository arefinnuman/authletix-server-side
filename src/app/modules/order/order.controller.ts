/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../functions/catchAsync';
import sendResponse from '../../../functions/sendResponse';
import ApiError from '../../../handlingError/apiError';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user?.userEmail;
  const { ...orderData } = req.body;

  const result = await OrderService.createOrder(orderData, userEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Order Created Successfully`,
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const verifiedUser = req.user;
  if (!verifiedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }

  const userRole = verifiedUser.role;
  const userEmail = verifiedUser.userEmail;
  const sellerId = verifiedUser.seller;

  const result = await OrderService.getAllOrders(userRole, userEmail, sellerId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `All Orders Fetched Successfully`,
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
};
