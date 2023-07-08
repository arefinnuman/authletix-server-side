import { Schema, model } from 'mongoose';
import { bloodGroup, gender } from './seller.constant';
import { ISeller, SellerModel } from './seller.interface';

export const SellerSchema = new Schema<ISeller, SellerModel>(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        middleName: String,
      },
      required: true,
    },
    gender: {
      type: String,
      enum: gender,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    merchantName: {
      type: String,
      required: true,
    },
    merchantLicenseNo: {
      type: String,
      required: true,
    },
    websiteLink: {
      type: String,
    },
    description: {
      type: String,
    },
    balance: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Seller = model<ISeller, SellerModel>('Seller', SellerSchema);
