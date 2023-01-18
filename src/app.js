import express from 'express';

import patchResponse from './middlewares/respond.js';
import useErrorHandler from './middlewares/errorHandler.js';
import usePublicInfoRoutes from './publicInfo/routes.js';
import useUserRoutes from './user/routes.js';
import useAuthorRoutes from './author/routes.js';

function createApp() {
  const app = express();

  app.use(express.json());

  app.use(patchResponse);

  usePublicInfoRoutes(app);
  useUserRoutes(app);
  useAuthorRoutes(app);

  app.use(useErrorHandler);
  return app;
}

export default createApp();
