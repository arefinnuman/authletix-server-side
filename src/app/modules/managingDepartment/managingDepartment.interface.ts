import { Model } from 'mongoose';

export type IManagingDepartment = {
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ManagingDepartmentModel = Model<
  IManagingDepartment,
  Record<string, unknown>
>;

export type IManagingDepartmentFilters = {
  searchTerm: string;
};
