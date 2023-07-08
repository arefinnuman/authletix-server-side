import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/genericResponse';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { managingDepartmentSearchableFields } from './managingDepartment.constant';
import {
  IManagingDepartment,
  IManagingDepartmentFilters,
} from './managingDepartment.interface';
import { ManagingDepartment } from './managingDepartment.model';

const createManagingDepartment = async (
  payload: IManagingDepartment
): Promise<IManagingDepartment> => {
  const result = await ManagingDepartment.create(payload);
  return result;
};

const getAllManagingDepartment = async (
  filters: Partial<IManagingDepartmentFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManagingDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: managingDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0
      ? {
          $and: andConditions,
        }
      : {};

  const result = await ManagingDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ManagingDepartment.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleManagingDepartment = async (
  id: string
): Promise<IManagingDepartment | null> => {
  const result = await ManagingDepartment.findById(id);
  return result;
};

const updateManagingDepartment = async (
  id: string,
  payload: Partial<IManagingDepartment>
): Promise<IManagingDepartment | null> => {
  const result = await ManagingDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const deleteManagingDepartment = async (
  id: string
): Promise<IManagingDepartment | null> => {
  const result = await ManagingDepartment.findByIdAndDelete(id, { new: true });
  return result;
};

export const ManagingDepartmentService = {
  createManagingDepartment,
  getAllManagingDepartment,
  getSingleManagingDepartment,
  updateManagingDepartment,
  deleteManagingDepartment,
};
