import { Schema, model } from 'mongoose';
import { BrandName, deliveryTime, label } from './product.constant';
import { IProduct, ProductModel } from './product.interface';

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productPhoto: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      enum: BrandName,
      required: true,
    },
    availableForDelivery: {
      type: String,
      enum: deliveryTime,
      required: true,
    },
    label: {
      type: String,
      enum: label,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
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

export const Product = model<IProduct, ProductModel>('Product', ProductSchema);
