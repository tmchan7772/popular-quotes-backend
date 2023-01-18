import chanceLib from 'chance';
import dbClient from '../../src/database/client.js';
import { hashString } from '../../src/utils/hash.js';

const chance = chanceLib.Chance();

async function createUser() {
  const password = '123456';
  const { salt, hash } = hashString(password);
  const user = {
    fullname: 'Test',
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
  return dbClient.user.delete({
    where: {
      id: userId,
    },
  });
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
  createUser,
  deleteUser,
  createUserToken,
};
