import express from 'express';
import { ProductController } from './product.controller';

const routes = express.Router();

routes.post('/', ProductController.createProduct);

routes.patch('/:id', ProductController.updateProduct);

routes.delete('/:id', ProductController.deleteProduct);

routes.get('/:id', ProductController.getSingleProduct);

routes.get('/', ProductController.getProduct);

export const ProductRoutes = routes;
