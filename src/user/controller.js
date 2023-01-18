import * as userService from './services.js';
import validateRequiredFields from '../utils/validation.js';
import {
  USER_ALREADY_EXISTS_ERROR,
  USER_NOT_FOUND_ERROR,
  WRONG_EMAIL_OR_PASSWORD,
  USER_REGISTER_VALIDATION_ERROR,
} from '../constants.js';

async function register(req, res, next) {
  try {
    const inValidFields = validateRequiredFields(req.body, ['fullname', 'email', 'password']);
    if (inValidFields.length) {
      next({ status: 400, isCustom: true, message: USER_REGISTER_VALIDATION_ERROR(inValidFields) });
      return;
    }

    await userService.register(req.body);
    res.respond();
  } catch (err) {
    if (err.message === USER_ALREADY_EXISTS_ERROR) {
      next({ status: 409, isCustom: true, message: USER_ALREADY_EXISTS_ERROR });
      return;
    }

    next(err);
  }
}

async function login(req, res, next) {
  let isValidLogin;

  try {
    const userId = await userService.verifyCredentials(req.body);
    isValidLogin = !!userId;

    if (isValidLogin) {
      const token = await userService.createAuthToken(userId);
      res.respond({ token });
      return;
    }
  } catch (err) {
    if (err.message === USER_NOT_FOUND_ERROR) {
      isValidLogin = false;
    } else {
      next(err);
      return;
    }
  }

  if (!isValidLogin) {
    next({ status: 400, isCustom: true, message: WRONG_EMAIL_OR_PASSWORD });
  }
}

async function profile(req, res, next) {
  try {
    const profileData = await userService.getUserById(req.userId);
    res.respond(profileData);
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    await userService.logout(req.userId);
    res.respond();
  } catch (err) {
    next(err);
  }
}

export {
  register,
  login,
  profile,
  logout,
};
