import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagingDepartmentController } from './managingDepartment.controller';
import { ManagingDepartmentValidation } from './managingDepartment.validation';

const router = express.Router();

router.post(
  '/create-managingDepartment',
  validateRequest(
    ManagingDepartmentValidation.createManagingDepartmentZodSchema
  ),
  ManagingDepartmentController.createManagingDepartment
);

router.get('/:id', ManagingDepartmentController.getSingleManagingDepartment);

router.patch(
  '/:id',
  validateRequest(
    ManagingDepartmentValidation.updateManagingDepartmentZodSchema
  ),
  ManagingDepartmentController.updateManagingDepartment
);

router.delete('/:id', ManagingDepartmentController.deleteManagingDepartment);

router.get('/', ManagingDepartmentController.getAllManagingDepartment);

export const ManagingDepartmentRoutes = router;
