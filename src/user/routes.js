import * as userController from './controller.js';
import verifyAuth from '../middlewares/auth.js';

function useRouter(app) {
  app.post('/register', userController.register);
  app.post('/login', userController.login);
  app.get('/profile', verifyAuth, userController.profile);
  app.delete('/logout', verifyAuth, userController.logout);
}

export default useRouter;
