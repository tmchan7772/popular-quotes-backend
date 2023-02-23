import dbClient from '../database/client.js';

/**
 * Get a random author
 * @returns {Promise<object>} { id, name }
 */
async function getRandomAuthor() {
  const authorsCount = await dbClient.author.count();
  const skip = Math.floor(Math.random() * authorsCount);
  const [author] = await dbClient.author.findMany({
    skip,
    take: 1,
  });

  return author;
}

/**
 * Get a random quote for specific author
 * @param  {number} authorId id of author
 * @returns {Promise<object>} { id, author_id, content }
 */
async function getRandomQuote(authorId) {
  const equalsToAuthorId = {
    author_id: {
      equals: authorId,
    },
  };

  const { _count: count } = await dbClient.quote.aggregate({
    where: equalsToAuthorId,
    _count: true,
  });
  const skip = Math.floor(Math.random() * count);
  const [quote] = await dbClient.quote.findMany({
    skip,
    take: 1,
    where: equalsToAuthorId,
  });

  return quote;
}

export {
  getRandomAuthor,
  getRandomQuote,
};
