import { Schema, model } from 'mongoose';
import {
  IManagingDepartment,
  ManagingDepartmentModel,
} from './managingDepartment.interface';

const ManagingDepartmentSchema = new Schema<
  IManagingDepartment,
  ManagingDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const ManagingDepartment = model<
  IManagingDepartment,
  ManagingDepartmentModel
>('ManagingDepartment', ManagingDepartmentSchema);
