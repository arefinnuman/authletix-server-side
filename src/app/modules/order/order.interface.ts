import { Document, Model, Types } from 'mongoose';

import { ICustomer } from '../customer/customer.interface';
import { IProduct } from '../product/product.interface';

export type IOrder = Document & {
  product: Types.ObjectId | IProduct;
  customer: Types.ObjectId | ICustomer;
};

export type IOrderModel = Model<IOrder, Record<string, unknown>>;
