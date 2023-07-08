/* eslint-disable no-unused-expressions */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../handlingError/apiError';
import { ICow } from '../cow/product.interface';
import { Cow } from '../cow/product.model';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (order: IOrder): Promise<IOrder | null> => {
  const buyer: IUser | null = await User.findOne({
    _id: order.buyer,
  });

  if (buyer?.role !== 'buyer') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only buyer can create order');
  }

  const cow: ICow | null = await Cow.findOne({
    _id: order.cow,
  });

  if (cow?.label !== 'for sale') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cow is not available');
  }

  if (cow?.price > buyer?.budget) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not Enough Money');
  }

  let newOrder: IOrder | null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    await Cow.updateOne({ _id: order.cow }, { label: 'sold out' }, { session });
    await User.updateOne(
      { _id: order.buyer },
      { $inc: { budget: -cow.price } },
      { session }
    );

    await User.updateOne(
      { _id: cow.seller },
      { $inc: { income: cow.price } },
      { session }
    );

    const createdOrders = await Order.create([order], { session });
    newOrder = createdOrders[0];

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return newOrder;
};

const getAllOrders = async (): Promise<IOrder[]> => {
  const orders: IOrder[] = await Order.find().populate('cow').populate('buyer');
  return orders;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
