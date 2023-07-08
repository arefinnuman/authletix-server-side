import express from 'express';
import Authorization from '../../middleWares/authorization';
import validateRequest from '../../middleWares/validateRequest';
import { ENUM_USER_ROLE } from '../user/user.enum';
import { ProductController } from './product.controller';
import { ProductValidation } from './product.validation';

const routes = express.Router();

routes.post(
  '/create-product',
  Authorization(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER),
  validateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct
);

routes.patch(
  '/:id',
  Authorization(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER),
  validateRequest(ProductValidation.updateProductZodSchema),
  ProductController.updateProduct
);

routes.delete(
  '/:id',
  Authorization(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER),
  ProductController.deleteProduct
);

routes.get(
  '/:id',
  // Authorization(
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.SELLER,
  //   ENUM_USER_ROLE.CUSTOMER
  // ),
  ProductController.getSingleProduct
);

routes.get(
  '/',
  // Authorization(
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.SELLER,
  //   ENUM_USER_ROLE.CUSTOMER
  // ),
  ProductController.getProduct
);

export const ProductRoutes = routes;
