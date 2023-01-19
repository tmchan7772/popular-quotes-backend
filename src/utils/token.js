import { randomUUID } from 'crypto';

const TOKEN_LIFE_TIME = process.env.TOKEN_LIFE_TIME || 1; // in hours

function generateToken() {
  const token = Buffer.from(randomUUID()).toString('base64');
  const now = new Date();
  now.setHours(now.getHours() + TOKEN_LIFE_TIME);

  return {
    value: token,
    expiredIn: now.getTime(),
  };
}

export default generateToken;
