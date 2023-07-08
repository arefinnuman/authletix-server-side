/* eslint-disable no-unused-vars */

import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { ICustomer } from '../customer/customer.interface';
import { ISeller } from '../seller/seller.interface';

export type IUser = {
  email: string;
  password: string;
  role: string;
  customer?: Types.ObjectId | ICustomer;
  seller?: Types.ObjectId | ISeller;
  admin?: Types.ObjectId | IAdmin;
};

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'email' | 'password' | 'role'> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
