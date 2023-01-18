import chai from 'chai';
import supertest from 'supertest';
import app from '../../src/app.js';
import { createUser, createUserToken, deleteUser } from './dbHelper.js';

const server = supertest(app);

function get(url) {
  return server.get(url);
}

describe('User api', () => {
  describe('/profile', () => {
    it('should return 401 if token is not provided', async () => {
      await get('/profile').expect(401);
    });

    it('should return 401 if token is invalid', async () => {
      await get('/profile?token=INVALID_TOKEN').expect(401);
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
        const profileResponse = await get(`/profile?token=${token}`).expect(200);

        chai.expect(profileResponse.body.success).to.equal(true);
        chai.expect(profileResponse.body.data.fullname).to.equal(user.fullname);
        chai.expect(profileResponse.body.data.email).to.equal(user.email);
      });
    });
  });
});
