import express from 'express';
import cors from 'cors';

import patchResponse from './middlewares/respond.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import setupPublicInfoRoutes from './publicInfo/routes.js';
import setupUserRoutes from './user/routes.js';
import setupAuthorRoutes from './author/routes.js';

function createApp() {
  console.log('app creation');
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(patchResponse);
  setupPublicInfoRoutes(app);
  setupUserRoutes(app);
  setupAuthorRoutes(app);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export default createApp();
