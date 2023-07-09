"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authorization_1 = __importDefault(require("../../middleWares/authorization"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const user_enum_1 = require("../user/user.enum");
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
router.get('/:id', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.getSingleAdmin);
router.delete('/:id', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.deleteAdmin);
router.patch('/:id', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(admin_validation_1.AdminValidation.updateAdmin), admin_controller_1.AdminController.updateAdmin);
router.get('/', (0, authorization_1.default)(user_enum_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.getAllAdmins);
exports.AdminRoutes = router;
