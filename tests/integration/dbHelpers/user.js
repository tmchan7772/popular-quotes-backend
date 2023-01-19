import chanceLib from 'chance';
import dbClient from '../../../src/database/client.js';
import { hashString } from '../../../src/utils/hash.js';

const chance = chanceLib.Chance();

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

async function createUser() {
  const password = '123456';
  const { salt, hash } = hashString(password);
  const user = {
    fullname: chance.name(),
    email: chance.email(),
    password: hash,
    salt,
  };
  const creaetedUser = await dbClient.user.create({
    data: user,
  });

  return {
    ...creaetedUser,
    password,
  };
}

function deleteUser(userId) {
  if (!userId) {
    return false;
  }

  // deleteMany to prevent error when user doesn't exist
  return dbClient.user.deleteMany({
    where: {
      id: userId,
    },
  });
}

async function getUserToken(userId) {
  const [token] = await dbClient.token.findMany({
    where: {
      user_id: {
        equals: userId,
      },
    },
  });

  return token;
}

async function createUserToken(userId, expiredIn) {
  const nextHour = new Date();
  nextHour.setHours(nextHour.getHours() + 1);

  const token = {
    user_id: userId,
    value: '1234',
    expired_in: expiredIn || nextHour.getTime(),
  };

  await dbClient.token.upsert({
    where: {
      user_id: userId,
    },
    update: {
      value: token.value,
      expired_in: token.expired_in,
    },
    create: token,
  });

  return token;
}

export {
  getUserByEmail,
  createUser,
  deleteUser,
  getUserToken,
  createUserToken,
};
