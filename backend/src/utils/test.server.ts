import { Express } from 'express';
import { startServer } from '../app';

let server: Express;

export const getServer = async () => {
    if (!server) {
        server = await startServer();
    }

    return server;
};
