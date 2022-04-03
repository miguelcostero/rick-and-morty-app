import { Router } from 'express';

const userController = Router();

userController.get('/', (req, res) => res.send({}));

export default userController;