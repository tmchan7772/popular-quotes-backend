import getPublicInfo from './controller.js';

function useRouter(app) {
  app.get('/info', getPublicInfo);
}

export default useRouter;
