import express from 'express';
import { CowController } from './cow.controller';

const routes = express.Router();

routes.post('/', CowController.createCow);

routes.patch('/:id', CowController.updateCow);

routes.delete('/:id', CowController.deleteCow);

routes.get('/:id', CowController.getSingleCow);

routes.get('/', CowController.getCow);

export const CowRoutes = routes;
