import { Router } from 'express';
import { DocumentType } from '@typegoose/typegoose';
import { User } from '../models/user.model';

const userController = Router();

userController.get('/me', (_, res) => {
    return res.send((res.locals.user as DocumentType<User>).publicMask());
});

export default userController;
