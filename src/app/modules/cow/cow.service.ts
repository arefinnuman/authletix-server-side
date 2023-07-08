import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../handlingError/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IConstantFilters } from '../../../interfaces/constantFilters';
import { IGenericResponse } from '../../../interfaces/genericResponse';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from './../user/user.model';
import { LabelEnum, cowSearchableFields } from './cow.constant';
import { ICow } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (payload: ICow): Promise<ICow | null> => {
  payload.label = LabelEnum.ForSale;

  const isSeller = await User.findOne({ _id: payload.seller, role: 'seller' });

  if (!isSeller) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `User (${payload.seller}) is not a seller or not found`
    );
  }

  const result = (await Cow.create(payload)).populate('seller');
  return result;
};

const getCow = async (
  filters: Partial<IConstantFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions: { [x: string]: unknown }[] = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map((field: string) => ({
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

  const result = await Cow.find(whereConditions)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate('seller');

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, `Cow (${id}) not found`);
  }

  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const isExist = await Cow.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `Student (${id}) not found`);
  }

  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('seller');

  return result;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
  const isExist = await Cow.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `Student (${id}) not found`);
  }

  const result = await Cow.findOneAndDelete({ _id: id }, { new: true });
  return result;
};

export const CowService = {
  createCow,
  getSingleCow,
  updateCow,
  deleteCow,
  getCow,
};
