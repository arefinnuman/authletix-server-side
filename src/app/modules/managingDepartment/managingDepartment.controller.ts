import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationField';
import catchAsync from '../../../functions/catchAsync';
import sendResponse from '../../../functions/sendResponse';
import pick from '../../../interfaces/pick';
import { managingDepartmentFilterableFields } from './managingDepartment.constant';
import { IManagingDepartment } from './managingDepartment.interface';
import { ManagingDepartmentService } from './managingDepartment.service';

const createManagingDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicManagingDepartmentData } = req.body;
    const result = await ManagingDepartmentService.createManagingDepartment(
      academicManagingDepartmentData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Managing Department Created Successfully`,
      data: result,
    });
  }
);

const getAllManagingDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managingDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ManagingDepartmentService.getAllManagingDepartment(
      filters,
      paginationOptions
    );

    sendResponse<IManagingDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `ManagingDepartment Data`,
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleManagingDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ManagingDepartmentService.getSingleManagingDepartment(
      id
    );

    if (result === null) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: `${id} not found in Database`,
      });
    } else {
      sendResponse<IManagingDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `ManagingDepartment Data `,
        data: result,
      });
    }
  }
);

const updateManagingDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await ManagingDepartmentService.updateManagingDepartment(
      id,
      updatedData
    );

    if (result === null) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: `${id} not found in Database`,
      });
    } else {
      sendResponse<IManagingDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `ManagingDepartment Data Updated`,
        data: result,
      });
    }
  }
);

const deleteManagingDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ManagingDepartmentService.deleteManagingDepartment(id);

    sendResponse<IManagingDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ManagingDepartment deleted successfully !',
      data: result,
    });
  }
);

export const ManagingDepartmentController = {
  createManagingDepartment,
  getAllManagingDepartment,
  getSingleManagingDepartment,
  updateManagingDepartment,
  deleteManagingDepartment,
};
