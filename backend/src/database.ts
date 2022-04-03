import { Connection, createConnection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import logger from './logger';

export let connection: Connection;

export const connectToDatabase = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    if (!connection) {
        connection = await createConnection(mongoUri).asPromise();
        connection.set('debug', true);
    }

    logger.info('Connected to database');
    return connection;
};
