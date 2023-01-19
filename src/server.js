import app from './app.js';
import logger from './logger.js';

const port = process.env.SERVER_PORT || 8000;

app.listen(port, (err) => {
  if (err) {
    logger.error('Server start is failed');
    process.exit(1);
  }

  logger.info('Server is started');
});
