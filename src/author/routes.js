import * as authorController from './controller.js';
import verifyAuth from '../middlewares/auth.js';

function useRouter(app) {
  app.get('/author', verifyAuth, authorController.getRandomAuthorWithDelay);
  app.get('/quote', verifyAuth, authorController.getRandomQuoteWithDelay);
}

export default useRouter;
