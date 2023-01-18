const getCompanyInfo = require('./controller');

module.exports = function useRouter(app) {
  app.get('/author', () => {});
  app.get('/quotes', () => {});
};
