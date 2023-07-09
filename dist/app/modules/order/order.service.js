'use strict';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const mongoose_1 = __importDefault(require('mongoose'));
const apiError_1 = __importDefault(require('../../../handlingError/apiError'));
const customer_model_1 = require('../customer/customer.model');
const product_model_1 = require('../product/product.model');
const order_model_1 = require('./order.model');
const createOrder = (order, userEmail) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield customer_model_1.Customer.findOne({
      _id: order.customer,
    });
    if (!customer) {
      throw new apiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Customer not found'
      );
    }
    if (userEmail !== customer.email) {
      throw new apiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'you are not logged in user'
      );
    }
    const product = yield product_model_1.Product.findOne({
      _id: order.product,
    });
    if (!product) {
      throw new apiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Customer not found'
      );
    }
    if (
      (product === null || product === void 0 ? void 0 : product.label) ===
      'stock out'
    ) {
      throw new apiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'product is not available'
      );
    }
    let newOrder;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      yield product_model_1.Product.updateOne(
        { _id: order.product },
        { $inc: { quantity: -1 } },
        { session }
      );
      if (product.quantity === 1) {
        yield product_model_1.Product.updateOne(
          { _id: order.product },
          { label: 'stock out' },
          { session }
        );
      }
      const createdOrders = yield order_model_1.Order.create([order], {
        session,
      });
      newOrder = createdOrders[0];
      yield session.commitTransaction();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    if (newOrder) {
      newOrder = yield order_model_1.Order.findOne({
        _id: newOrder === null || newOrder === void 0 ? void 0 : newOrder._id,
      })
        .populate('product')
        .populate('customer');
    }
    return newOrder;
  });
const getAllOrders = (userRole, userEmail, sellerId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield customer_model_1.Customer.findOne({
      email: userEmail,
    });
    const customerId =
      customer === null || customer === void 0 ? void 0 : customer._id;
    const sellerProducts = yield product_model_1.Product.find({
      seller: sellerId,
    });
    let orders;
    if (userRole === 'admin') {
      orders = yield order_model_1.Order.find()
        .populate('product')
        .populate('customer');
    } else if (userRole === 'customer') {
      orders = yield order_model_1.Order.find({ customer: customerId })
        .populate('product')
        .populate('customer');
    } else if (userRole === 'seller') {
      orders = yield order_model_1.Order.find({
        product: { $in: sellerProducts },
      })
        .populate('product')
        .populate('customer');
    } else {
      throw new apiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'you are not logged in user'
      );
    }
    return orders;
  });
exports.OrderService = {
  createOrder,
  getAllOrders,
};
