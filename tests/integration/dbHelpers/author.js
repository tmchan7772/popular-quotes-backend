import chanceLib from 'chance';
import dbClient from '../../../src/database/client.js';

const chance = chanceLib.Chance();

async function getAllAuthors() {
  return dbClient.author.findMany();
}

async function createAuthor() {
  const author = {
    name: chance.guid(),
  };

  return dbClient.author.create({
    data: author,
  });
}

function deleteAuthor(authorId) {
  return dbClient.author.deleteMany({
    where: {
      id: authorId,
    },
  });
}

async function getAllAuthorQuotes(authorId) {
  return dbClient.quote.findMany({
    where: {
      author_id: authorId,
    },
  });
}

async function createQuote(authorId) {
  const quote = {
    author_id: authorId,
    content: chance.guid(),
  };

  return dbClient.quote.create({
    data: quote,
  });
}

export {
  createAuthor,
  deleteAuthor,
  getAllAuthorQuotes,
  getAllAuthors,
  createQuote,
};
