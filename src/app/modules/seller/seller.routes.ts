import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SellerController } from './seller.controller';
import { SellerValidation } from './seller.validation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(SellerValidation.updateSellerZodSchema),
  SellerController.updateSeller
);

router.delete('/:id', SellerController.deleteSeller);

router.get('/:id', SellerController.getSingleSeller);

router.get('/', SellerController.getAllSeller);

export const SellerRoutes = router;
