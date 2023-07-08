import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CustomerController } from './customer.controller';
import { CustomerValidation } from './customer.validation';

const router = express.Router();

router.get('/:id', CustomerController.getSingleCustomer);

router.patch(
  '/:id',
  validateRequest(CustomerValidation.updateCustomerZodSchema),
  CustomerController.updateCustomer
);

router.delete('/:id', CustomerController.deleteCustomer);

router.get('/', CustomerController.getAllCustomer);

export const CustomerRoutes = router;
