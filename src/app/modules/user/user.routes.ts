import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-seller',
  // Authorization(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.createSellerZodSchema),
  UserController.createSeller
);

router.post(
  '/create-admin',
  // Authorization(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);

export const UserRoutes = router;
