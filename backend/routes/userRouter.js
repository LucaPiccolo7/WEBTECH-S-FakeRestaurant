import express from 'express';

import { userValidators } from '../middlewares/validators/userValidators.js';

import { requestValidator } from '../middlewares/requestValidator.js';

import { UserController } from '../controllers/UserController.js';

export const userRouter = express.Router();

userRouter.post('/register', [
    userValidators,
    requestValidator,
    UserController.checkUserDoesntExists,
    UserController.generateHashedPassword,
    UserController.createNewUser,
]);

userRouter.post('/login', [
    userValidators,
    requestValidator,
    UserController.checkUserAlreadyExists,
    UserController.checkUserCredentials
]);