import express from 'express';
import Authorization from '../../middleWares/authorization';
import { ENUM_USER_ROLE } from '../user/user.enum';
import { OrderController } from './order.controller';

const routes = express.Router();

routes.post(
  '/',
  Authorization(ENUM_USER_ROLE.CUSTOMER),
  OrderController.createOrder
);

routes.get(
  '/',
  Authorization(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SELLER,
    ENUM_USER_ROLE.CUSTOMER
  ),
  OrderController.getAllOrders
);

export const OrderRoutes = routes;
