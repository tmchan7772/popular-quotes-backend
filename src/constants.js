const USER_ALREADY_EXISTS_ERROR = 'User with such email already exists';
const USER_REGISTER_VALIDATION_ERROR = (emptyFields) => `${emptyFields.join(', ')} should not be empty`;
const USER_NOT_FOUND_ERROR = 'User not found';
const WRONG_EMAIL_OR_PASSWORD = 'Wrong email or password';

export {
  USER_ALREADY_EXISTS_ERROR,
  USER_NOT_FOUND_ERROR,
  WRONG_EMAIL_OR_PASSWORD,
  USER_REGISTER_VALIDATION_ERROR,
};
