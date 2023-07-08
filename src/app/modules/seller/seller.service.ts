/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../handlingError/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IConstantFilters } from '../../../interfaces/constantFilters';
import { IGenericResponse } from '../../../interfaces/genericResponse';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../user/users.model';
import { facultySearchableFields } from './seller.constant';
import { ISeller } from './seller.interface';
import { Seller } from './seller.model';

const getAllSeller = async (
  filters: Partial<IConstantFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISeller[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
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

  const result = await Seller.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Seller.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSeller = async (id: string): Promise<ISeller | null> => {
  const result = await Seller.findById(id);
  return result;
};

const updateSeller = async (
  id: string,
  payload: Partial<ISeller>
): Promise<ISeller | null> => {
  const isExist = await Seller.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `seller not found`);
  }

  const { name, ...sellerData } = payload;

  const updatedSellerData: Partial<ISeller> = { ...sellerData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedSellerData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Seller.findOneAndUpdate({ _id: id }, updatedSellerData, {
    new: true,
  });
  return result;
};

const deleteSeller = async (id: string): Promise<ISeller | null> => {
  const isExist = await Seller.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const seller = await Seller.findOneAndDelete({ id }, { session });
    if (!seller) {
      throw new ApiError(404, 'Failed to delete student');
    }

    await User.deleteOne({ id });
    session.commitTransaction();
    session.endSession();

    return seller;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const SellerService = {
  getAllSeller,
  getSingleSeller,
  updateSeller,
  deleteSeller,
};
