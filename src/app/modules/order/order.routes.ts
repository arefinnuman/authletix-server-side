import express from 'express';
import { OrderController } from './order.controller';

const routes = express.Router();

routes.post('/', OrderController.createOrder);

routes.get('/', OrderController.getAllOrders);

export const OrderRoutes = routes;
