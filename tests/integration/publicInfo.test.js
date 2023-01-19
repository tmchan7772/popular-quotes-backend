import chai from 'chai';
import supertest from 'supertest';
import app from '../../src/app.js';
import { PUBLIC_INFO } from '../../src/constants.js';

const server = supertest(app);
const { expect } = chai;

describe('Public info api', () => {
  it('/info should return information', async () => {
    const infoResponse = await server.get('/info').expect(200);

    expect(infoResponse.body.data.info).to.equal(PUBLIC_INFO);
  });
});
