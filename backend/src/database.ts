import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import logger from './logger';
import loadTestData from './load-test-data';

export const connectToDatabase = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    const connection = await mongoose.connect(mongoUri);
    connection.set('debug', process.env.NODE_ENV !== 'production');

    logger.info('Connected to database');

    if (process.env.NODE_ENV !== 'production') {
        logger.info(`MongoDB URI: ${mongoUri}`);
        logger.debug('loading test data...');
        await loadTestData();
    }

    return connection;
};
