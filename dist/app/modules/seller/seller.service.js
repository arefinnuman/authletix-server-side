'use strict';
/* eslint-disable @typescript-eslint/no-explicit-any */
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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.SellerService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const mongoose_1 = __importDefault(require('mongoose'));
const apiError_1 = __importDefault(require('../../../handlingError/apiError'));
const paginationHelper_1 = require('../../../helper/paginationHelper');
const users_model_1 = require('../user/users.model');
const seller_constant_1 = require('./seller.constant');
const seller_model_1 = require('./seller.model');
const getAllSeller = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        $or: seller_constant_1.facultySearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.PaginationHelpers.calculatePagination(
        paginationOptions
      );
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
      andConditions.length > 0
        ? {
            $and: andConditions,
          }
        : {};
    const result = yield seller_model_1.Seller.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const total = yield seller_model_1.Seller.countDocuments();
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const getSingleSeller = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield seller_model_1.Seller.findById(id);
    return result;
  });
const updateSeller = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield seller_model_1.Seller.findOne({ _id: id });
    if (!isExist) {
      throw new apiError_1.default(
        http_status_1.default.NOT_FOUND,
        `seller not found`
      );
    }
    const { name } = payload,
      sellerData = __rest(payload, ['name']);
    const updatedSellerData = Object.assign({}, sellerData);
    if (name && Object.keys(name).length > 0) {
      Object.keys(name).forEach(key => {
        const nameKey = `name.${key}`;
        updatedSellerData[nameKey] = name[key];
      });
    }
    const result = yield seller_model_1.Seller.findOneAndUpdate(
      { _id: id },
      updatedSellerData,
      {
        new: true,
      }
    );
    return result;
  });
const deleteSeller = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield seller_model_1.Seller.findOne({ id });
    if (!isExist) {
      throw new apiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Seller not found !'
      );
    }
    const email =
      isExist === null || isExist === void 0 ? void 0 : isExist.email;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      const seller = yield seller_model_1.Seller.findOneAndDelete(
        { email },
        { session }
      );
      if (!seller) {
        throw new apiError_1.default(404, 'Failed to delete student');
      }
      yield users_model_1.User.deleteOne({ email });
      session.commitTransaction();
      session.endSession();
      return seller;
    } catch (error) {
      session.abortTransaction();
      throw error;
    }
  });
exports.SellerService = {
  getAllSeller,
  getSingleSeller,
  updateSeller,
  deleteSeller,
};
