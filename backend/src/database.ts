import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import logger from './logger';

export const connectToDatabase = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    const connection = await mongoose.connect(mongoUri);
    connection.set('debug', true);

    logger.info('Connected to database');

    return connection;
};
