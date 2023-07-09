/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../handlingError/apiError';
import { ICustomer } from '../customer/customer.interface';
import { Customer } from '../customer/customer.model';
import { IProduct } from '../product/product.interface';
import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (
  order: IOrder,
  userEmail: string
): Promise<IOrder | null> => {
  const customer: ICustomer | null = await Customer.findOne({
    _id: order.customer,
  });
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }
  if (userEmail !== customer.email) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'you are not logged in user');
  }

  const product: IProduct | null = await Product.findOne({
    _id: order.product,
  });
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }

  if (product?.label === 'stock out') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'product is not available');
  }

  let newOrder: IOrder | null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    await Product.updateOne(
      { _id: order.product },
      { $inc: { quantity: -1 } },
      { session }
    );

    if (product.quantity === 1) {
      await Product.updateOne(
        { _id: order.product },
        { label: 'stock out' },
        { session }
      );
    }

    const createdOrders = await Order.create([order], { session });
    newOrder = createdOrders[0];

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newOrder) {
    newOrder = await Order.findOne({ _id: newOrder?._id })
      .populate('product')
      .populate('customer');
  }

  return newOrder;
};

const getAllOrders = async (
  userRole: string,
  userEmail: string,
  sellerId: unknown
): Promise<IOrder[]> => {
  const customer: ICustomer | null = await Customer.findOne({
    email: userEmail,
  });
  const customerId = customer?._id;

  const sellerProducts: IProduct[] = await Product.find({ seller: sellerId });

  let orders;
  if (userRole === 'admin') {
    orders = await Order.find().populate('product').populate('customer');
  } else if (userRole === 'customer') {
    orders = await Order.find({ customer: customerId })
      .populate('product')
      .populate('customer');
  } else if (userRole === 'seller') {
    orders = await Order.find({ product: { $in: sellerProducts } })
      .populate('product')
      .populate('customer');
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'you are not logged in user');
  }
  return orders;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
