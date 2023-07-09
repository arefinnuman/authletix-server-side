"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authorization_1 = __importDefault(require("../../middleWares/authorization"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const user_enum_1 = require("../user/user.enum");
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.post('/create-Category', 
// Authorization(ENUM_USER_ROLE.ADMIN),
(0, validateRequest_1.default)(category_validation_1.CategoryValidation.createCategoryZodSchema), category_controller_1.CategoryController.createCategory);
router.get('/:id', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.getSingleCategory);
router.patch('/:id', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(category_validation_1.CategoryValidation.updateCategoryZodSchema), category_controller_1.CategoryController.updateCategory);
router.delete('/:id', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.deleteCategory);
router.get('/', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN, user_enum_1.ENUM_USER_ROLE.SELLER), category_controller_1.CategoryController.getAllCategory);
exports.CategoryRoutes = router;
