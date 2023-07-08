import express from 'express';
import Authorization from '../../middleWares/authorization';
import validateRequest from '../../middleWares/validateRequest';
import { ENUM_USER_ROLE } from '../user/user.enum';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
const router = express.Router();

router.get(
  '/:id',
  Authorization(ENUM_USER_ROLE.ADMIN),
  AdminController.getSingleAdmin
);

router.delete(
  '/:id',
  Authorization(ENUM_USER_ROLE.ADMIN),
  AdminController.deleteAdmin
);

router.patch(
  '/:id',
  Authorization(ENUM_USER_ROLE.ADMIN),
  validateRequest(AdminValidation.updateAdmin),
  AdminController.updateAdmin
);

router.get(
  '/',
  Authorization(ENUM_USER_ROLE.ADMIN),
  AdminController.getAllAdmins
);

export const AdminRoutes = router;
