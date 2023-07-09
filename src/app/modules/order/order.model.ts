import { Schema, model } from 'mongoose';
import { IOrder, IOrderModel } from './order.interface';

const OrderSchema = new Schema<IOrder>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
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

export const Order = model<IOrder, IOrderModel>('Order', OrderSchema);
