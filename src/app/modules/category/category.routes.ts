import express from 'express';
import Authorization from '../../middleWares/authorization';
import validateRequest from '../../middleWares/validateRequest';
import { ENUM_USER_ROLE } from '../user/user.enum';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/create-Category',
  // Authorization(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategoryController.createCategory
);

router.get(
  '/:id',
  Authorization(ENUM_USER_ROLE.ADMIN),
  CategoryController.getSingleCategory
);

router.patch(
  '/:id',
  Authorization(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.updateCategoryZodSchema),
  CategoryController.updateCategory
);

router.delete(
  '/:id',
  Authorization(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteCategory
);

router.get(
  '/',
  Authorization(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER),
  CategoryController.getAllCategory
);

export const CategoryRoutes = router;
