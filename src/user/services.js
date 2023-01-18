import dbClient from '../database/client.js';
import { hashString, verifyHash } from '../utils/hash.js';
import generateToken from '../utils/token.js';
import { USER_NOT_FOUND_ERROR, USER_ALREADY_EXISTS_ERROR } from '../constants.js';

/**
 * Get user data by email
 * @param  {string} email
 * @returns {Promise<object>} { id, email, fullname, password, salt }
 */
async function getUserByEmail(email) {
  const [user] = await dbClient.user.findMany({
    where: {
      email: {
        equals: email,
      },
    },
  });

  return user;
}

/**
 * Verify user credentials
 * @param  {object} userCredentials of type { email, password }
 * @returns {Promise<number>} user id if credentials are valid otherwise null
 */
async function verifyCredentials({ email, password }) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error(USER_NOT_FOUND_ERROR);
  }

  const isValid = verifyHash(password, user.password, user.salt);

  return isValid ? user.id : null;
}

/**
 * Register new user
 * @param  {object} userData of type { fullname, email, password }
 * @returns {Promise<object>} created user { id, email, fullname, password, salt }
 */
async function register({ fullname, email, password }) {
  if (!fullname || !email || !password) {
    throw new Error();
  }
  const user = await getUserByEmail(email);
  if (user) {
    throw new Error(USER_ALREADY_EXISTS_ERROR);
  }

  const { salt, hash } = hashString(password);
  return dbClient.user.create({
    data: {
      fullname,
      email,
      password: hash,
      salt,
    },
  });
}

/**
 * Create new authentication token
 * @param  {string} userId
 * @returns {Promise<string>} new token
 */
async function createAuthToken(userId) {
  // TODO; implement token generation
  const { value, expiredIn } = generateToken();

  const { value: token } = await dbClient.token.upsert({
    where: {
      user_id: userId,
    },
    update: {
      value,
      expired_in: expiredIn,
    },
    create: {
      user_id: userId,
      value,
      expired_in: expiredIn,
    },
  });

  return token;
}

/**
 * Verify a token
 * @param  {string} token
 * @returns {Promise<object>} { userId: string } if a token is valid
 */
async function verifyToken(token) {
  const [userToken] = await dbClient.token.findMany({
    where: {
      value: {
        equals: token,
      },
    },
    select: {
      user_id: true,
      expired_in: true,
    },
  });

  if (userToken && userToken.user_id && new Date().getTime() <= userToken.expired_in) {
    return { userId: userToken.user_id };
  }

  return null;
}

/**
 * Log user out
 * @param  {string} userId
 * @returns {Promise<void>}
 */
async function logout(userId) {
  await dbClient.token.delete({
    where: {
      user_id: userId,
    },
  });
}

/**
 * Get user data by id
 * @param  {string} userId - id of user
 * @returns {Promise<object>} user data { id: number, fullname: string, email: string }
 */
function getUserById(userId) {
  return dbClient.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      fullname: true,
      email: true,
    },
  });
}

export {
  verifyCredentials,
  register,
  getUserById,
  createAuthToken,
  verifyToken,
  logout,
};
