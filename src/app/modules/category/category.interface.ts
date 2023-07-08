import { Model } from 'mongoose';

export type ICategoryFilters = {
  searchTerm: string;
};

export type ICategory = {
  title: string;
};

export type CategoryModel = Model<ICategory, Record<string, unknown>>;
