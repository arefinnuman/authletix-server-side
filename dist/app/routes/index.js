"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_routes_1 = require("../modules/admin/admin.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const category_routes_1 = require("../modules/category/category.routes");
const customer_routes_1 = require("../modules/customer/customer.routes");
const managingDepartment_routes_1 = require("../modules/managingDepartment/managingDepartment.routes");
const order_routes_1 = require("../modules/order/order.routes");
const product_routes_1 = require("../modules/product/product.routes");
const seller_routes_1 = require("../modules/seller/seller.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users/',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/auth/',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/admins/',
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: '/sellers/',
        route: seller_routes_1.SellerRoutes,
    },
    {
        path: '/customers/',
        route: customer_routes_1.CustomerRoutes,
    },
    {
        path: '/products/',
        route: product_routes_1.ProductRoutes,
    },
    {
        path: '/orders/',
        route: order_routes_1.OrderRoutes,
    },
    {
        path: '/categories/',
        route: category_routes_1.CategoryRoutes,
    },
    {
        path: '/managing-department/',
        route: managingDepartment_routes_1.ManagingDepartmentRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
