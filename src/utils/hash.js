import crypto from 'crypto';

const SALT_LENGTH = 16;
const SALT_ENCODING = 'hex';
const HASH_ITERATIONS = 1000;
const HASH_LENGTH = 64;
const HASH_ALGORIGTHM = 'sha512';
const HASH_ENCODING = 'hex';

/**
 * Hash a provided string
 * @param  {string} string - original string
 * @param  {string?} salt - salt. If not specified then will be generated
 * @returns {object} { salt: string, hash: string }
 */
function hashString(string, salt) {
  const generatedSalt = salt || crypto.randomBytes(SALT_LENGTH).toString(SALT_ENCODING);
  const hash = crypto.pbkdf2Sync(string, generatedSalt, HASH_ITERATIONS, HASH_LENGTH, HASH_ALGORIGTHM)
    .toString(HASH_ENCODING);

  return { salt: generatedSalt, hash };
}

/**
 * Verify a hash of string
 * @param  {string} string - string to verify
 * @param  {string} originalHash - hash to compare with
 * @param  {string} salt - salt to use to calculate hash for original string
 * @returns {boolean}
 */
function verifyHash(string, originalHash, salt) {
  const { hash: calculatedHash } = hashString(string, salt);
  return originalHash === calculatedHash;
}

export {
  hashString,
  verifyHash,
};
