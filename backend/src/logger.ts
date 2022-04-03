import pino from 'pino';
import pinoHttp from 'pino-http';
import environment from './environment';

const logger = pino({ prettyPrint: environment.env === 'local' });

export const httpLogger = pinoHttp({ logger });

export default logger;
