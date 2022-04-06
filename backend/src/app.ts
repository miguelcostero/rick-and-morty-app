import express from 'express';
import dotenvSafe from 'dotenv-safe';
import { connectToDatabase } from './database';

// middlewares
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import { httpLogger } from './logger';
import { authMiddleware } from './middlewares/auth.middleware';

// controllers
import userController from './controllers/user.controller';
import characterController from './controllers/character.controller';
import authController from './controllers/auth.controller';

dotenvSafe.config();

export const startServer = async () => {
    const app = express();

    app.use(httpLogger);
    app.use(helmet());
    app.use(cors());
    app.use(compression());
    app.use(bodyParser.json());

    app.get('/', (_, res) => res.send({ status: 'Ok!' }));
    app.use('/auth', authController);
    app.use('/user', authMiddleware, userController);
    app.use('/character', authMiddleware, characterController);

    await connectToDatabase();

    return app;
};
