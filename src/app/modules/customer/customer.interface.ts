import { Model } from 'mongoose';

export type ICustomerFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type ICustomer = {
  name: UserName; //embedded object
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  balance?: number;
  profileImage?: string;
};

export type CustomerModel = Model<ICustomer, Record<string, unknown>>;
