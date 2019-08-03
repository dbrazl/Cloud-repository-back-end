import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RestoreController from './app/controllers/RestoreController';
import AvatarController from './app/controllers/AvatarController';
import FileController from './app/controllers/FileController';

import AuthMiddleware from './app/middlewares/auth';

import ValidateUserStore from './app/middlewares/validators/UserStore';
import ValidateUserUpdate from './app/middlewares/validators/UserUpdate';
import ValidateSessionStore from './app/middlewares/validators/SessionStore';
import ValidateRestoreUpdate from './app/middlewares/validators/RestoreUpdate';
import ValidateFileUpdate from './app/middlewares/validators/FileUpdate';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', ValidateUserStore, UserController.store);
routes.post('/session', ValidateSessionStore, SessionController.store);
routes.put('/restore', ValidateRestoreUpdate, RestoreController.update);

routes.use(AuthMiddleware);

routes.put('/users', ValidateUserUpdate, UserController.update);
routes.delete('/users', UserController.delete);

routes.post('/avatar', upload.single('file'), AvatarController.store);
routes.delete('/avatar/:path', AvatarController.delete);

routes.get('/file', FileController.index);
routes.post('/file', upload.single('file'), FileController.store);
routes.put('/file', ValidateFileUpdate, FileController.update);
routes.delete('/file/:path', FileController.delete);

export default routes;
