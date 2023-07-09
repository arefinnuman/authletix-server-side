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
exports.ManagingDepartmentController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const paginationField_1 = require('../../../constants/paginationField');
const catchAsync_1 = __importDefault(require('../../../functions/catchAsync'));
const sendResponse_1 = __importDefault(
  require('../../../functions/sendResponse')
);
const pick_1 = __importDefault(require('../../../interfaces/pick'));
const managingDepartment_constant_1 = require('./managingDepartment.constant');
const managingDepartment_service_1 = require('./managingDepartment.service');
const createManagingDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const academicManagingDepartmentData = __rest(req.body, []);
    const result =
      yield managingDepartment_service_1.ManagingDepartmentService.createManagingDepartment(
        academicManagingDepartmentData
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: `Managing Department Created Successfully`,
      data: result,
    });
  })
);
const getAllManagingDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      managingDepartment_constant_1.managingDepartmentFilterableFields
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      paginationField_1.paginationFields
    );
    const result =
      yield managingDepartment_service_1.ManagingDepartmentService.getAllManagingDepartment(
        filters,
        paginationOptions
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: `ManagingDepartment Data`,
      meta: result.meta,
      data: result.data,
    });
  })
);
const getSingleManagingDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result =
      yield managingDepartment_service_1.ManagingDepartmentService.getSingleManagingDepartment(
        id
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
        message: `ManagingDepartment Data `,
        data: result,
      });
    }
  })
);
const updateManagingDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result =
      yield managingDepartment_service_1.ManagingDepartmentService.updateManagingDepartment(
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
        message: `ManagingDepartment Data Updated`,
        data: result,
      });
    }
  })
);
const deleteManagingDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result =
      yield managingDepartment_service_1.ManagingDepartmentService.deleteManagingDepartment(
        id
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'ManagingDepartment deleted successfully !',
      data: result,
    });
  })
);
exports.ManagingDepartmentController = {
  createManagingDepartment,
  getAllManagingDepartment,
  getSingleManagingDepartment,
  updateManagingDepartment,
  deleteManagingDepartment,
};
