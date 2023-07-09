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
exports.ProductController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const paginationField_1 = require('../../../constants/paginationField');
const catchAsync_1 = __importDefault(require('../../../functions/catchAsync'));
const sendResponse_1 = __importDefault(
  require('../../../functions/sendResponse')
);
const pick_1 = __importDefault(require('../../../interfaces/pick'));
const product_constant_1 = require('./product.constant');
const product_service_1 = require('./product.service');
const createProduct = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const productData = __rest(req.body, []);
    const result = yield product_service_1.ProductService.createProduct(
      productData
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Product Created Successfully',
      data: result,
    });
  })
);
const getProduct = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      product_constant_1.productFilterableFields
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      paginationField_1.paginationFields
    );
    const result = yield product_service_1.ProductService.getProduct(
      filters,
      paginationOptions
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: `Product Data Fetched Successfully`,
      meta: result.meta,
      data: result.data,
    });
  })
);
const getSingleProduct = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield product_service_1.ProductService.getSingleProduct(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: `Product(${id}) data fetched successfully`,
      data: result,
    });
  })
);
const updateProduct = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const verifiedSeller = req.user;
    const sellerEmail =
      verifiedSeller === null || verifiedSeller === void 0
        ? void 0
        : verifiedSeller.userEmail;
    const id = req.params.id;
    const productData = req.body;
    const result = yield product_service_1.ProductService.updateProduct(
      id,
      sellerEmail,
      productData
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: `Product updated successfully`,
      data: result,
    });
  })
);
const deleteProduct = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const verifiedSeller = req.user;
    const sellerEmail =
      verifiedSeller === null || verifiedSeller === void 0
        ? void 0
        : verifiedSeller.userEmail;
    const id = req.params.id;
    const result = yield product_service_1.ProductService.deleteProduct(
      id,
      sellerEmail
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: `Product deleted successfully`,
      data: result || null,
    });
  })
);
exports.ProductController = {
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};
