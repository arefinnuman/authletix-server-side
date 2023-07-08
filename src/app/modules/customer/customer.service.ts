/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../handlingError/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IConstantFilters } from '../../../interfaces/constantFilters';
import { IGenericResponse } from '../../../interfaces/genericResponse';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../user/users.model';
import { studentSearchableFields } from './customer.constant';
import { ICustomer } from './customer.interface';
import { Customer } from './customer.model';

const getAllCustomer = async (
  filters: Partial<IConstantFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICustomer[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
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

  const result = await Customer.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Customer.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCustomer = async (id: string): Promise<ICustomer | null> => {
  const result = await Customer.findById(id);
  return result;
};

const updateCustomer = async (
  id: string,
  payload: Partial<ICustomer>
): Promise<ICustomer | null> => {
  const isExist = await Customer.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `Customer (${id}) not found`);
  }

  const { name, ...CustomerData } = payload;
  const updatedCustomerData: Partial<ICustomer> = { ...CustomerData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedCustomerData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Customer.findOneAndUpdate(
    { _id: id },
    updatedCustomerData,
    {
      new: true,
    }
  );
  return result;
};

const deleteCustomer = async (id: string): Promise<ICustomer | null> => {
  const isExist = await Customer.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete Customer first
    const customer = await Customer.findOneAndDelete({ id }, { session });
    if (!customer) {
      throw new ApiError(404, 'Failed to delete Customer');
    }
    //delete user
    await User.deleteOne({ id });
    session.commitTransaction();
    session.endSession();

    return customer;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const CustomerService = {
  getAllCustomer,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};
