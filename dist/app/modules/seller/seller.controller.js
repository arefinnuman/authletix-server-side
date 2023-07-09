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
exports.SellerController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const paginationField_1 = require('../../../constants/paginationField');
const catchAsync_1 = __importDefault(require('../../../functions/catchAsync'));
const sendResponse_1 = __importDefault(
  require('../../../functions/sendResponse')
);
const pick_1 = __importDefault(require('../../../interfaces/pick'));
const seller_constant_1 = require('./seller.constant');
const seller_service_1 = require('./seller.service');
const getAllSeller = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      seller_constant_1.facultyFilterableFields
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      paginationField_1.paginationFields
    );
    const result = yield seller_service_1.SellerService.getAllSeller(
      filters,
      paginationOptions
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: `Fetching Seller Data Successfully`,
      meta: result.meta,
      data: result.data,
    });
  })
);
const getSingleSeller = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield seller_service_1.SellerService.getSingleSeller(id);
    if (result === null) {
      (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.NOT_FOUND,
        success: false,
        message: `${id} not found in Database`,
      });
    } else {
      (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Fetching Seller Data Success`,
        data: result,
      });
    }
  })
);
const updateSeller = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield seller_service_1.SellerService.updateSeller(
      id,
      updatedData
    );
    if (result === null) {
      (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.NOT_FOUND,
        success: false,
        message: `${id} not found in Database`,
      });
    } else {
      (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Seller Data Updated`,
        data: result,
      });
    }
  })
);
const deleteSeller = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield seller_service_1.SellerService.deleteSeller(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Seller deleted successfully !',
      data: result,
    });
  })
);
exports.SellerController = {
  getAllSeller,
  getSingleSeller,
  updateSeller,
  deleteSeller,
};
