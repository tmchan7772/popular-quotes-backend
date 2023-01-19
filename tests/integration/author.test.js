import chai from 'chai';
import supertest from 'supertest';
import app from '../../src/app.js';
import { createUser, createUserToken, deleteUser } from './dbHelpers/user.js';
import {
  createAuthor, getAllAuthors, deleteAuthor, createQuote, getAllAuthorQuotes,
} from './dbHelpers/author.js';

const server = supertest(app);
const { expect } = chai;

describe('Author api', () => {
  it('/author should return 401 if no token provided', async () => {
    await server.get('/author').expect(401);
  });

  it('/author should return 401 if token is invalid', async () => {
    await server.get('/author?token?INVALID').expect(401);
  });

  it('/quote should return 401 if no token provided', async () => {
    await server.get('/quote').expect(401);
  });

  it('/quote should return 401 if token is invalid', async () => {
    await server.get('/quote?token?INVALID').expect(401);
  });

  describe('for authorized users', () => {
    let user;
    let token;

    before(async () => {
      user = await createUser();
      ({ value: token } = await createUserToken(user.id));
    });

    after(async () => {
      await deleteUser(user.id);
    });

    it('/author should return random author', async () => {
      const createdAuthor1 = await createAuthor();
      const createdAuthor2 = await createAuthor();

      try {
        const { body: { data: authorResponse } } = await server.get(`/author?token=${token}`).expect(200);

        const allAuthors = await getAllAuthors();

        const authorExists = allAuthors
          .some((author) => author.id === authorResponse.authorId && author.name === authorResponse.name);

        expect(authorExists).to.be.true;
      } finally {
        await deleteAuthor(createdAuthor1.id);
        await deleteAuthor(createdAuthor2.id);
      }
    }).timeout(10000);

    it('/quote should return random quote for provided authorId', async () => {
      const createdAuthor = await createAuthor();
      await createQuote(createdAuthor.id);
      await createQuote(createdAuthor.id);

      try {
        const { body: { data: quoteResponse } } = await server.get(`/quote?token=${token}&authorId=${createdAuthor.id}`)
          .expect(200);

        const allQuotes = await getAllAuthorQuotes(createdAuthor.id);

        const quoteExists = allQuotes
          .some(
            (quote) => quote.id === quoteResponse.quoteId
              && quote.author_id === quoteResponse.authorId
              && quote.content === quoteResponse.quote,
          );

        expect(quoteExists).to.be.true;
      } finally {
        await deleteAuthor(createdAuthor.id);
      }
    }).timeout(10000);

    it('/quote should return 404 if authorId is not provided', async () => {
      await server.get(`/quote?token=${token}`).expect(400);
    });
  });
});
