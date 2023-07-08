import { Model, Types } from 'mongoose';
import { IUser } from './../user/user.interface';
import {
  BreedEnum,
  CategoryEnum,
  LabelEnum,
  LocationEnum,
} from './cow.constant';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: LocationEnum;
  breed: BreedEnum;
  weight: number;
  label: LabelEnum;
  category: CategoryEnum;
  seller: Types.ObjectId | IUser;
};

export type CowModel = Model<ICow, Record<string, unknown>>;
