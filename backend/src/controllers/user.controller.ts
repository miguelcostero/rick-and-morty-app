import { Router } from 'express';
import { DocumentType } from '@typegoose/typegoose';
import { UserModel } from '../models/user.model';

const userController = Router();

userController.get('/', (_, res) => {
    return res.send((res.locals.user as DocumentType<UserModel>).publicMask());
});

export default userController;
