import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/create-Category',
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategoryController.createCategory
);

router.get('/:id', CategoryController.getSingleCategory);

router.patch(
  '/:id',
  validateRequest(CategoryValidation.updateCategoryZodSchema),
  CategoryController.updateCategory
);

router.delete('/:id', CategoryController.deleteCategory);

router.get('/', CategoryController.getAllCategory);

export const CategoryRoutes = router;
