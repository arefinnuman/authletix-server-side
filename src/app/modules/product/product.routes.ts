import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductController } from './product.controller';
import { ProductValidation } from './product.validation';

const routes = express.Router();

routes.post(
  '/',
  validateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct
);

routes.patch(
  '/:id',
  validateRequest(ProductValidation.updateProductZodSchema),
  ProductController.updateProduct
);

routes.delete('/:id', ProductController.deleteProduct);

routes.get('/:id', ProductController.getSingleProduct);

routes.get('/', ProductController.getProduct);

export const ProductRoutes = routes;
