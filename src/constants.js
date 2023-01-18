const GET_RECOURSE_DELAY = 5000; // in ms

const USER_ALREADY_EXISTS_ERROR = 'User with such email already exists';
const USER_NOT_FOUND_ERROR = 'User not found';
const WRONG_EMAIL_OR_PASSWORD = 'Wrong email or password';

const FIELDS_EMPTY_VALIDATION_ERROR = (emptyFields) => `${emptyFields.join(', ')} should not be empty`;

export {
  USER_ALREADY_EXISTS_ERROR,
  USER_NOT_FOUND_ERROR,
  WRONG_EMAIL_OR_PASSWORD,
  FIELDS_EMPTY_VALIDATION_ERROR,
  GET_RECOURSE_DELAY,
};
