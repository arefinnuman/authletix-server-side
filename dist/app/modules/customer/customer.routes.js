"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authorization_1 = __importDefault(require("../../middleWares/authorization"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const user_enum_1 = require("../user/user.enum");
const customer_controller_1 = require("./customer.controller");
const customer_validation_1 = require("./customer.validation");
const router = express_1.default.Router();
router.get('/:id', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN), customer_controller_1.CustomerController.getSingleCustomer);
router.patch('/:id', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(customer_validation_1.CustomerValidation.updateCustomerZodSchema), customer_controller_1.CustomerController.updateCustomer);
router.delete('/:id', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN), customer_controller_1.CustomerController.deleteCustomer);
router.get('/', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN), customer_controller_1.CustomerController.getAllCustomer);
exports.CustomerRoutes = router;
