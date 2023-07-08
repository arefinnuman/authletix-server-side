import express from 'express';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { CustomerRoutes } from '../modules/customer/customer.routes';
import { ManagingDepartmentRoutes } from '../modules/managingDepartment/managingDepartment.routes';
import { ProductRoutes } from '../modules/product/product.routes';
import { SellerRoutes } from '../modules/seller/seller.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users/',
    route: UserRoutes,
  },
  {
    path: '/auth/',
    route: AuthRoutes,
  },
  {
    path: '/admins/',
    route: AdminRoutes,
  },
  {
    path: '/sellers/',
    route: SellerRoutes,
  },
  {
    path: '/customers/',
    route: CustomerRoutes,
  },
  {
    path: '/products/',
    route: ProductRoutes,
  },

  {
    path: '/categories/',
    route: CategoryRoutes,
  },
  {
    path: '/managing-department/',
    route: ManagingDepartmentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
