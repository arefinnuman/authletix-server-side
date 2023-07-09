"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const apiError_1 = __importDefault(require("../../../handlingError/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const users_model_1 = require("../user/users.model");
const customer_constant_1 = require("./customer.constant");
const customer_model_1 = require("./customer.model");
const getAllCustomer = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: customer_constant_1.studentSearchableFields.map(field => ({
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
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.PaginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0
        ? {
            $and: andConditions,
        }
        : {};
    const result = yield customer_model_1.Customer.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield customer_model_1.Customer.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_model_1.Customer.findById(id);
    return result;
});
const updateCustomer = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield customer_model_1.Customer.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `Customer (${id}) not found`);
    }
    const { name } = payload, CustomerData = __rest(payload, ["name"]);
    const updatedCustomerData = Object.assign({}, CustomerData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updatedCustomerData[nameKey] = name[key];
        });
    }
    const result = yield customer_model_1.Customer.findOneAndUpdate({ _id: id }, updatedCustomerData, {
        new: true,
    });
    return result;
});
const deleteCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the faculty is exist
    const isExist = yield customer_model_1.Customer.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'admin is not found !');
    }
    const email = isExist === null || isExist === void 0 ? void 0 : isExist.email;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //delete student first
        const admin = yield customer_model_1.Customer.findOneAndDelete({ email }, { session });
        if (!admin) {
            throw new apiError_1.default(404, 'Failed to delete admin');
        }
        //delete user
        yield users_model_1.User.deleteOne({ email });
        session.commitTransaction();
        session.endSession();
        return admin;
    }
    catch (error) {
        session.abortTransaction();
        throw error;
    }
});
exports.CustomerService = {
    getAllCustomer,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer,
};
