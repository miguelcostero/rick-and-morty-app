import { startServer } from './app';
import logger from './logger';

const PORT = process.env.PORT || 4000;

startServer()
    .then((app) => {
        app.listen(PORT, () => {
            logger.info(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        logger.error(err);
    });
