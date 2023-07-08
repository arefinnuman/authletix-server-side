import { Model, Types } from 'mongoose';
import { ISeller } from '../seller/seller.interface';
import { BrandEnum, DeliveryTimeEnum, LabelEnum } from './product.constant';

export type IProduct = {
  name: string;
  age: number;
  price: number;
  description: string;
  productPhoto?: string;
  brand: BrandEnum;
  availableForDelivery: DeliveryTimeEnum;
  label: LabelEnum;
  category: Types.ObjectId;
  seller: Types.ObjectId | ISeller;
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;
