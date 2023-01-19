import chai from 'chai';
import supertest from 'supertest';
import chanceLib from 'chance';
import app from '../../src/app.js';
import {
  getUserByEmail, createUser, createUserToken, deleteUser, getUserToken,
} from './dbHelpers/user.js';

const server = supertest(app);
const chance = chanceLib.Chance();
const { expect } = chai;

describe('User api', () => {
  describe('/register', () => {
    let createdUser;

    afterEach(async () => {
      await deleteUser(createdUser.id);
    });

    it('should register new user', async () => {
      const user = {
        fullname: chance.name(),
        email: chance.email(),
        password: '123456',
      };

      await server.post('/register').send(user).expect(201);

      createdUser = await getUserByEmail(user.email);

      expect(createdUser.fullname).to.equal(user.fullname);
    });

    it('should return 409 status if email already exists', async () => {
      const user = {
        fullname: chance.name(),
        email: chance.email(),
        password: '123456',
      };

      await server.post('/register').send(user).expect(201);
      createdUser = await getUserByEmail(user.email);

      await server.post('/register').send(user).expect(409);
    });

    it('should return 400 status if fullname is empty', async () => {
      const user = {
        fullname: '',
        email: chance.email(),
        password: '123456',
      };

      await server.post('/register').send(user).expect(400);
    });

    it('should return 400 status if email is empty', async () => {
      const user = {
        fullname: chance.name(),
        email: '',
        password: '123456',
      };

      await server.post('/register').send(user).expect(400);
    });

    it('should return 400 status if password is empty', async () => {
      const user = {
        fullname: chance.name(),
        email: chance.email(),
        password: '',
      };

      await server.post('/register').send(user).expect(400);
    });
  });

  describe('/login', () => {
    let user;

    before(async () => {
      user = await createUser();
    });

    after(async () => {
      await deleteUser(user.id);
    });

    it('should return valid token when credentials are valid', async () => {
      const loginResponse = await server.post('/login')
        .send({ email: user.email, password: user.password })
        .expect(200);

      expect(loginResponse.body.data).to.exist;
      expect(loginResponse.body.data.token).to.exist;

      await server.get(`/profile?token=${loginResponse.body.data.token}`).expect(200);
    });

    it('should return 400 status when email is invalid', async () => {
      await server.post('/login').send({ email: 'INVALID', password: user.password }).expect(400);
    });

    it('should return 400 status when password is invalid', async () => {
      await server.post('/login').send({ email: user.email, password: 'INVALID' }).expect(400);
    });
  });

  describe('/profile', () => {
    it('should return 401 if token is not provided', async () => {
      await server.get('/profile').expect(401);
    });

    it('should return 401 if token is invalid', async () => {
      await server.get('/profile?token=INVALID_TOKEN').expect(401);
    });

    describe('authorized', async () => {
      let token;
      let user;

      before(async () => {
        user = await createUser();
        ({ value: token } = await createUserToken(user.id));
      });

      after(async () => {
        await deleteUser(user.id);
      });

      it('should return user profile data', async () => {
        const profileResponse = await server.get(`/profile?token=${token}`).expect(200);

        expect(profileResponse.body.success).to.equal(true);
        expect(profileResponse.body.data.fullname).to.equal(user.fullname);
        expect(profileResponse.body.data.email).to.equal(user.email);
      });
    });
  });

  describe('/logout', () => {
    it('should return 401 if token is not provided', async () => {
      await server.delete('/logout').expect(401);
    });

    describe('authorized', async () => {
      let token;
      let user;

      before(async () => {
        user = await createUser();
        ({ value: token } = await createUserToken(user.id));
      });

      after(async () => {
        await deleteUser(user.id);
      });

      it('should remove user token', async () => {
        await server.delete(`/logout?token=${token}`).expect(200);
        const deletedToken = await getUserToken(user.id);

        expect(deletedToken).to.not.exist;
      });
    });
  });
});
