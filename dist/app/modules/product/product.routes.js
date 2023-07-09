"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authorization_1 = __importDefault(require("../../middleWares/authorization"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const user_enum_1 = require("../user/user.enum");
const product_controller_1 = require("./product.controller");
const product_validation_1 = require("./product.validation");
const routes = express_1.default.Router();
routes.post('/create-product', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN, user_enum_1.ENUM_USER_ROLE.SELLER), (0, validateRequest_1.default)(product_validation_1.ProductValidation.createProductZodSchema), product_controller_1.ProductController.createProduct);
routes.patch('/:id', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN, user_enum_1.ENUM_USER_ROLE.SELLER), (0, validateRequest_1.default)(product_validation_1.ProductValidation.updateProductZodSchema), product_controller_1.ProductController.updateProduct);
routes.delete('/:id', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN, user_enum_1.ENUM_USER_ROLE.SELLER), product_controller_1.ProductController.deleteProduct);
routes.get('/:id', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN, user_enum_1.ENUM_USER_ROLE.SELLER, user_enum_1.ENUM_USER_ROLE.CUSTOMER), product_controller_1.ProductController.getSingleProduct);
routes.get('/', 
// Authorization(
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.SELLER,
//   ENUM_USER_ROLE.CUSTOMER
// ),
product_controller_1.ProductController.getProduct);
exports.ProductRoutes = routes;
