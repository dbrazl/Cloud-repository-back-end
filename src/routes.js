import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RestoreController from './app/controllers/RestoreController';
import AvatarController from './app/controllers/AvatarController';
import FileController from './app/controllers/FileController';

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);
routes.put('/restore', RestoreController.update);

routes.use(AuthMiddleware);

routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

routes.post('/avatar', upload.single('file'), AvatarController.store);
routes.delete('/avatar/:path', AvatarController.delete);

routes.get('/file', FileController.index);
routes.post('/file', upload.single('file'), FileController.store);
routes.put('/file', FileController.update);
routes.delete('/file/:path', FileController.delete);

export default routes;
