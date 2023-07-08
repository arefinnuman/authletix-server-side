import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../handlingError/apiError';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { ICustomer } from '../customer/customer.interface';
import { Customer } from '../customer/customer.model';
import { ISeller } from '../seller/seller.interface';
import { Seller } from '../seller/seller.model';
import { IUser } from './user.interface';
import { User } from './users.model';

const createCustomer = async (
  customer: ICustomer,
  user: IUser
): Promise<IUser | null> => {
  user.role = 'customer';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    customer.email = user.email;

    const newCustomer = await Customer.create([customer], { session });
    if (!newCustomer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create customer');
    }

    user.customer = newCustomer[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  newUserAllData = await User.findOne({ email: newUserAllData.email }).populate(
    'customer'
  );

  return newUserAllData;
};

const createSeller = async (
  seller: ISeller,
  user: IUser
): Promise<IUser | null> => {
  user.role = 'seller';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    seller.email = user.email;
    seller.balance = 0;

    const newSeller = await Seller.create([seller], { session });
    if (!newSeller.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create seller');
    }

    user.seller = newSeller[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  newUserAllData = await User.findOne({ email: newUserAllData.email }).populate(
    'seller'
  );

  return newUserAllData;
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  user.role = 'admin';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    admin.email = user.email;

    const newAdmin = await Admin.create([admin], { session });
    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create customer');
    }

    user.admin = newAdmin[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({
      email: newUserAllData.email,
    }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createCustomer,
  createSeller,
  createAdmin,
};
