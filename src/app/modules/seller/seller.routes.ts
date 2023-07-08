import express from 'express';
import Authorization from '../../middleWares/authorization';
import validateRequest from '../../middleWares/validateRequest';
import { ENUM_USER_ROLE } from '../user/user.enum';
import { SellerController } from './seller.controller';
import { SellerValidation } from './seller.validation';

const router = express.Router();

router.patch(
  '/:id',
  Authorization(ENUM_USER_ROLE.ADMIN),
  validateRequest(SellerValidation.updateSellerZodSchema),
  SellerController.updateSeller
);

router.delete(
  '/:id',
  Authorization(ENUM_USER_ROLE.ADMIN),
  SellerController.deleteSeller
);

router.get(
  '/:id',
  Authorization(ENUM_USER_ROLE.ADMIN),
  SellerController.getSingleSeller
);

router.get(
  '/',
  Authorization(ENUM_USER_ROLE.ADMIN),
  SellerController.getAllSeller
);

export const SellerRoutes = router;
