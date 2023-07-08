import express from 'express';
import Authorization from '../../middleWares/authorization';
import validateRequest from '../../middleWares/validateRequest';
import { ENUM_USER_ROLE } from '../user/user.enum';
import { ManagingDepartmentController } from './managingDepartment.controller';
import { ManagingDepartmentValidation } from './managingDepartment.validation';

const router = express.Router();

router.post(
  '/create-managingDepartment',
  Authorization(ENUM_USER_ROLE.ADMIN),
  validateRequest(
    ManagingDepartmentValidation.createManagingDepartmentZodSchema
  ),
  ManagingDepartmentController.createManagingDepartment
);

router.get(
  '/:id',
  Authorization(ENUM_USER_ROLE.ADMIN),
  ManagingDepartmentController.getSingleManagingDepartment
);

router.patch(
  '/:id',
  Authorization(ENUM_USER_ROLE.ADMIN),
  validateRequest(
    ManagingDepartmentValidation.updateManagingDepartmentZodSchema
  ),
  ManagingDepartmentController.updateManagingDepartment
);

router.delete(
  '/:id',
  Authorization(ENUM_USER_ROLE.ADMIN),
  ManagingDepartmentController.deleteManagingDepartment
);

router.get(
  '/',
  Authorization(ENUM_USER_ROLE.ADMIN),
  ManagingDepartmentController.getAllManagingDepartment
);

export const ManagingDepartmentRoutes = router;
