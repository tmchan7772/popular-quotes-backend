import { verifyToken } from '../user/services.js';

/**
 * The middleware to verify user authentication token.
 * If it's valid then set mapped user's id to request.userId property. Otherwise 401 status
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
async function verifyAuth(req, res, next) {
  if (req.query.token) {
    const user = await verifyToken(req.query.token);
    if (user) {
      req.userId = user.userId;
      next();
    } else {
      res.status(401).end();
    }
  }

  res.status(401).end();
}

export default verifyAuth;
