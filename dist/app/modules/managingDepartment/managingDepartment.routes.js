"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagingDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authorization_1 = __importDefault(require("../../middleWares/authorization"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const user_enum_1 = require("../user/user.enum");
const managingDepartment_controller_1 = require("./managingDepartment.controller");
const managingDepartment_validation_1 = require("./managingDepartment.validation");
const router = express_1.default.Router();
router.post('/create-managingDepartment', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(managingDepartment_validation_1.ManagingDepartmentValidation.createManagingDepartmentZodSchema), managingDepartment_controller_1.ManagingDepartmentController.createManagingDepartment);
router.get('/:id', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN), managingDepartment_controller_1.ManagingDepartmentController.getSingleManagingDepartment);
router.patch('/:id', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(managingDepartment_validation_1.ManagingDepartmentValidation.updateManagingDepartmentZodSchema), managingDepartment_controller_1.ManagingDepartmentController.updateManagingDepartment);
router.delete('/:id', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN), managingDepartment_controller_1.ManagingDepartmentController.deleteManagingDepartment);
router.get('/', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN), managingDepartment_controller_1.ManagingDepartmentController.getAllManagingDepartment);
exports.ManagingDepartmentRoutes = router;
