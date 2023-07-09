'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.SellerRoutes = void 0;
const express_1 = __importDefault(require('express'));
const authorization_1 = __importDefault(
  require('../../middleWares/authorization')
);
const validateRequest_1 = __importDefault(
  require('../../middleWares/validateRequest')
);
const user_enum_1 = require('../user/user.enum');
const seller_controller_1 = require('./seller.controller');
const seller_validation_1 = require('./seller.validation');
const router = express_1.default.Router();
router.patch(
  '/:id',
  (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN),
  (0, validateRequest_1.default)(
    seller_validation_1.SellerValidation.updateSellerZodSchema
  ),
  seller_controller_1.SellerController.updateSeller
);
router.delete(
  '/:id',
  (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN),
  seller_controller_1.SellerController.deleteSeller
);
router.get(
  '/:id',
  (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN),
  seller_controller_1.SellerController.getSingleSeller
);
router.get(
  '/',
  (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN),
  seller_controller_1.SellerController.getAllSeller
);
exports.SellerRoutes = router;
