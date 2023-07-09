"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const paginationField_1 = require("../../../constants/paginationField");
const catchAsync_1 = __importDefault(require("../../../functions/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../functions/sendResponse"));
const pick_1 = __importDefault(require("../../../interfaces/pick"));
const customer_constant_1 = require("./customer.constant");
const customer_service_1 = require("./customer.service");
const getAllCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, customer_constant_1.studentFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, paginationField_1.paginationFields);
    const result = yield customer_service_1.CustomerService.getAllCustomer(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Customer Data`,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield customer_service_1.CustomerService.getSingleCustomer(id);
    if (result === null) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: `${id} not found in Database`,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: `Customer Data`,
            data: result,
        });
    }
}));
const updateCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield customer_service_1.CustomerService.updateCustomer(id, updatedData);
    if (result === null) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: `${id} not found in Database`,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: `Customer Data Updated`,
            data: result,
        });
    }
}));
const deleteCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield customer_service_1.CustomerService.deleteCustomer(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer deleted successfully !',
        data: result,
    });
}));
exports.CustomerController = {
    getAllCustomer,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer,
};
