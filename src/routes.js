import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RestoreController from './app/controllers/RestoreController';

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);
routes.put('/restore', RestoreController.update);

routes.use(AuthMiddleware);

routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

export default routes;
