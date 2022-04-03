import joi from 'joi';
import { Router } from 'express';
import { createUserModel } from '../models/user.model';
import {
    generateSalt,
    generateToken,
    hashPassword,
} from '../helpers/auth.helpers';

const authController = Router();

const userModel = createUserModel();

authController.post('/login', async (req, res) => {
    const body = joi
        .object({
            email: joi.string().email().required(),
            password: joi.string().required(),
        })
        .validate(req.body);

    if (body.error) {
        res.status(400).json({ error: body.error });
        return;
    }

    const user = await userModel.findOne({ email: body.value.email });
    if (!user) {
        res.status(401).json({ error: 'User not found' });
        return;
    }

    if (!user.validatePassword(body.value.password)) {
        res.status(401).json({ error: 'Invalid password' });
        return;
    }

    const token = generateToken(String(user._id));

    res.send({ token, user: user.publicMask() });
});

authController.post('/signup', async (req, res) => {
    const body = joi
        .object({
            email: joi.string().email().required(),
            password: joi
                .string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required(),
            repeatPassword: joi.ref('password'),
            firstName: joi.string().required(),
            lastName: joi.string().required(),
        })
        .with('password', 'repeatPassword')
        .validate(req.body);

    if (body.error) {
        res.status(400).json({ error: body.error });
        return;
    }

    const existingUser = await userModel.findOne({ email: body.value.email });
    if (existingUser) {
        res.status(400).json({ error: 'User already exists' });
        return;
    }

    const salt = generateSalt();
    const hashedPassword = hashPassword(salt, body.value.password);
    const user = await userModel.create({
        salt: salt,
        email: body.value.email,
        firstName: body.value.firstName,
        lastName: body.value.lastName,
        password: hashedPassword,
    });

    res.send({ user: user.publicMask(), token: generateToken(String(user._id)) });
});

export default authController;
