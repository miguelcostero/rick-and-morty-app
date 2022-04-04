import pino from 'pino';
import pinoHttp from 'pino-http';

const logger = pino({
    prettyPrint: !process.env.NODE_ENV || process.env.NODE_ENV === 'local',
});

export const httpLogger = pinoHttp({ logger });

export default logger;
