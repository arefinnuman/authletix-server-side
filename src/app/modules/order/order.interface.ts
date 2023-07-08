import { Model, Types } from 'mongoose';
import { ICow } from '../product/product.interface';
import { IUser } from '../user/user.interface';

export type IOrder = {
  cow: Types.ObjectId | ICow;
  buyer: Types.ObjectId | IUser;
};

export type IOrderModel = Model<IOrder, Record<string, unknown>>;
