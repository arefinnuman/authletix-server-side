import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type ISeller = {
  email: string;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  contactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  merchantName: string;
  merchantLicenseNo: string;
  websiteLink?: string;
  description?: string;
};

export type SellerModel = Model<ISeller, Record<string, unknown>>;
