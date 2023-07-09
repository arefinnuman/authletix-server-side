'use strict';
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
exports.UserService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const mongoose_1 = __importDefault(require('mongoose'));
const apiError_1 = __importDefault(require('../../../handlingError/apiError'));
const admin_model_1 = require('../admin/admin.model');
const customer_model_1 = require('../customer/customer.model');
const seller_model_1 = require('../seller/seller.model');
const users_model_1 = require('./users.model');
const createCustomer = (customer, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    user.role = 'customer';
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      customer.email = user.email;
      const newCustomer = yield customer_model_1.Customer.create([customer], {
        session,
      });
      if (!newCustomer.length) {
        throw new apiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create customer'
        );
      }
      user.customer = newCustomer[0]._id;
      const newUser = yield users_model_1.User.create([user], { session });
      if (!newUser.length) {
        throw new apiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create user'
        );
      }
      newUserAllData = newUser[0];
      yield session.commitTransaction();
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    newUserAllData = yield users_model_1.User.findOne({
      email: newUserAllData.email,
    }).populate('customer');
    return newUserAllData;
  });
const createSeller = (seller, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    user.role = 'seller';
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      seller.email = user.email;
      seller.balance = 0;
      const newSeller = yield seller_model_1.Seller.create([seller], {
        session,
      });
      if (!newSeller.length) {
        throw new apiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'failed to create seller'
        );
      }
      user.seller = newSeller[0]._id;
      const newUser = yield users_model_1.User.create([user], { session });
      if (!newUser.length) {
        throw new apiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create user'
        );
      }
      newUserAllData = newUser[0];
      yield session.commitTransaction();
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    newUserAllData = yield users_model_1.User.findOne({
      email: newUserAllData.email,
    }).populate('seller');
    return newUserAllData;
  });
const createAdmin = (admin, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    user.role = 'admin';
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      admin.email = user.email;
      const newAdmin = yield admin_model_1.Admin.create([admin], { session });
      if (!newAdmin.length) {
        throw new apiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create customer'
        );
      }
      user.admin = newAdmin[0]._id;
      const newUser = yield users_model_1.User.create([user], { session });
      if (!newUser.length) {
        throw new apiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create user'
        );
      }
      newUserAllData = newUser[0];
      yield session.commitTransaction();
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    if (newUserAllData) {
      newUserAllData = yield users_model_1.User.findOne({
        email: newUserAllData.email,
      }).populate({
        path: 'admin',
        populate: [
          {
            path: 'managementDepartment',
          },
        ],
      });
    }
    return newUserAllData;
  });
exports.UserService = {
  createCustomer,
  createSeller,
  createAdmin,
};
