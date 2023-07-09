'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require('express'));
const authorization_1 = __importDefault(
  require('../../middleWares/authorization')
);
const user_enum_1 = require('../user/user.enum');
const order_controller_1 = require('./order.controller');
const routes = express_1.default.Router();
routes.post(
  '/',
  (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.CUSTOMER),
  order_controller_1.OrderController.createOrder
);
routes.get(
  '/',
  (0, authorization_1.default)(
    user_enum_1.ENUM_USER_ROLE.ADMIN,
    user_enum_1.ENUM_USER_ROLE.SELLER,
    user_enum_1.ENUM_USER_ROLE.CUSTOMER
  ),
  order_controller_1.OrderController.getAllOrders
);
exports.OrderRoutes = routes;
