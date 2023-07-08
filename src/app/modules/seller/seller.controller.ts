import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationField';
import catchAsync from '../../../functions/catchAsync';
import sendResponse from '../../../functions/sendResponse';
import pick from '../../../interfaces/pick';
import { facultyFilterableFields } from './seller.constant';
import { ISeller } from './seller.interface';
import { SellerService } from './seller.service';

const getAllSeller = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await SellerService.getAllSeller(filters, paginationOptions);

  sendResponse<ISeller[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Student Data`,
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await SellerService.getSingleSeller(id);
  if (result === null) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: `${id} not found in Database`,
    });
  } else {
    sendResponse<ISeller>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Student Data`,
      data: result,
    });
  }
});

const updateSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await SellerService.updateSeller(id, updatedData);

  if (result === null) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: `${id} not found in Database`,
    });
  } else {
    sendResponse<ISeller>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Seller Data Updated`,
      data: result,
    });
  }
});

const deleteSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SellerService.deleteSeller(id);

  sendResponse<ISeller>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller deleted successfully !',
    data: result,
  });
});

export const SellerController = {
  getAllSeller,
  getSingleSeller,
  updateSeller,
  deleteSeller,
};
