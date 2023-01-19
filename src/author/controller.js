import * as authorService from './services.js';
import runWithMinDelay from '../utils/delay.js';
import { GET_RECOURSE_DELAY, FIELDS_EMPTY_VALIDATION_ERROR } from '../constants.js';
import validateRequiredFields from '../utils/validation.js';

/**
 * Get random author with a specific delay
 */
async function getRandomAuthorWithDelay(req, res, next) {
  try {
    const { id, name } = await runWithMinDelay(authorService.getRandomAuthor, GET_RECOURSE_DELAY);

    res.respond({ authorId: id, name });
  } catch (err) {
    next(err);
  }
}

/**
 * Get random quotes by authorId with a specific delay.
 * Returns 400 if no authorId is provided
 */
async function getRandomQuoteWithDelay(req, res, next) {
  try {
    const inValidFields = validateRequiredFields(req.query, ['authorId']);
    if (inValidFields.length) {
      next({ status: 400, isCustom: true, message: FIELDS_EMPTY_VALIDATION_ERROR(inValidFields) });
      return;
    }

    const getRandomQuote = () => authorService.getRandomQuote(+req.query.authorId);
    const { id, content, author_id: authorId } = await runWithMinDelay(getRandomQuote, GET_RECOURSE_DELAY);

    res.respond({ authorId, quoteId: id, quote: content });
  } catch (err) {
    next(err);
  }
}

export {
  getRandomAuthorWithDelay,
  getRandomQuoteWithDelay,
};
