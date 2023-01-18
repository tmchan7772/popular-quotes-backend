import chai from 'chai';
import supertest from 'supertest';
import app from '../../src/app.js';

const server = supertest(app);

function get(url) {
  return server.get(url);
}

describe('Public Info api', () => {
  it('/info should return information', async () => {
    const infoResponse = await get('/info').expect(200);

    chai.expect(infoResponse.body.data).to.equal('Wellcome to Popular Quotes application');
  });
});
