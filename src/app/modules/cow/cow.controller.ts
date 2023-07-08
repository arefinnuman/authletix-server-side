import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationField';
import catchAsync from '../../../functions/catchAsync';
import sendResponse from '../../../functions/sendResponse';
import pick from '../../../interfaces/pick';
import { cowFilterableFields } from './cow.constant';
import { ICow } from './cow.interface';
import { CowService } from './cow.service';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cowData } = req.body;
  const result = await CowService.createCow(cowData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow Created Successfully',
    data: result,
  });
});

const getCow = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CowService.getCow(filters, paginationOptions);

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Cow Data Fetched Successfully`,
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.getSingleCow(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Cow(${id}) data fetched successfully`,
    data: result,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const cowData = req.body;

  const result = await CowService.updateCow(id, cowData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Cow(${id}) updated successfully`,
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.deleteCow(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Cow ${id} deleted successfully`,
    data: result || null,
  });
});

export const CowController = {
  createCow,
  getSingleCow,
  updateCow,
  deleteCow,
  getCow,
};
