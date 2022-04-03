import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenvSafe from 'dotenv-safe';
import environment from './environment';
import logger, { httpLogger } from './logger';
import { connectToDatabase } from './database';
import userController from './controllers/user.controller';

dotenvSafe.config();

const startServer = async () => {
    const app = express();

    app.use(cors());
    app.use(compression());
    app.use(httpLogger);

    app.get('/', (req, res) => res.send({ status: 'Ok!' }));
    app.use('/users', userController);

    await connectToDatabase();

    app.listen(environment.port, () => {
        logger.info(`Server started on port ${environment.port}`);
    });
};

startServer().catch((err) => {
    logger.error(err);
});
