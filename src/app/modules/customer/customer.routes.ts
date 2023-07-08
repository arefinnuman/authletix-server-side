import express from 'express';
import Authorization from '../../middleWares/authorization';
import validateRequest from '../../middleWares/validateRequest';
import { ENUM_USER_ROLE } from '../user/user.enum';
import { CustomerController } from './customer.controller';
import { CustomerValidation } from './customer.validation';

const router = express.Router();

router.get(
  '/:id',
  Authorization(ENUM_USER_ROLE.ADMIN),
  CustomerController.getSingleCustomer
);

router.patch(
  '/:id',
  Authorization(ENUM_USER_ROLE.ADMIN),
  validateRequest(CustomerValidation.updateCustomerZodSchema),
  CustomerController.updateCustomer
);

router.delete(
  '/:id',
  Authorization(ENUM_USER_ROLE.ADMIN),
  CustomerController.deleteCustomer
);

router.get(
  '/',
  Authorization(ENUM_USER_ROLE.ADMIN),
  CustomerController.getAllCustomer
);

export const CustomerRoutes = router;
