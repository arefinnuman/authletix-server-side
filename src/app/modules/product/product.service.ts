import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../handlingError/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IConstantFilters } from '../../../interfaces/constantFilters';
import { IGenericResponse } from '../../../interfaces/genericResponse';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Seller } from '../seller/seller.model';
import { User } from '../user/users.model';
import { LabelEnum, productSearchableFields } from './product.constant';
import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (payload: IProduct): Promise<IProduct | null> => {
  payload.label = LabelEnum.Available;
  const product = await Product.create(payload);
  const result = await (await product.populate('category')).populate('seller');
  return result;
};

const getProduct = async (
  filters: Partial<IConstantFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IProduct[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions: { [x: string]: unknown }[] = [];

  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map((field: string) => ({
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

  const result = await Product.find(whereConditions)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findById(id).populate('seller');

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, `Product (${id}) not found`);
  }

  return result;
};

const updateProduct = async (
  id: string,
  userEmail: string,
  payload: Partial<IProduct>
): Promise<IProduct | null> => {
  const user = await User.findOne({ email: userEmail });
  const product = await Product.findOne({ _id: id });
  if (!product) throw new ApiError(httpStatus.NOT_FOUND, `Product not found`);

  if (user?.role === 'admin') {
    const result = await Product.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    }).populate('seller');

    return result;
  } else {
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, `User not found`);

    const seller = await Seller.findOne({ _id: user?.seller });
    if (!seller) throw new ApiError(httpStatus.NOT_FOUND, `Seller not found`);

    const sellerEmail = seller?.email;

    if (sellerEmail === userEmail) {
      const result = await Product.findOneAndUpdate({ _id: id }, payload, {
        new: true,
      }).populate('seller');

      return result;
    } else {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to update this product'
      );
    }
  }
};

const deleteProduct = async (
  id: string,
  userEmail: string
): Promise<IProduct | null> => {
  const product = await Product.findOne({ _id: id });
  if (!product) throw new ApiError(httpStatus.NOT_FOUND, `Product not found`);

  const user = await User.findOne({ email: userEmail });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, `User not found`);

  let result;
  if (user?.role === 'admin') {
    result = await Product.findOneAndDelete({ _id: id }, { new: true });
  } else {
    const seller = await Seller.findOne({ _id: user?.seller });
    if (!seller) throw new ApiError(httpStatus.NOT_FOUND, `Seller not found`);

    const sellerEmail = seller?.email;

    if (sellerEmail === userEmail) {
      result = await Product.findOneAndDelete({ _id: id }, { new: true });
    } else {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to delete this product'
      );
    }
  }
  return result;
};

export const ProductService = {
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};
