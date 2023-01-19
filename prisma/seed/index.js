import dbClient from '../../src/database/client.js';
import authors from './authors.js';
import quotes from './quotes.js';

async function runSeeders() {
  await Promise.all(authors.map(async (author) => {
    return dbClient.author.upsert({
      where: { id: author.id },
      update: {},
      create: { name: author.name },
    });
  }));

  await Promise.all(quotes.map(async (quote) => {
    return dbClient.quote.upsert({
      where: { id: quote.quoteId },
      update: {},
      create: { content: quote.content, author_id: quote.author_id },
    });
  }));
}

runSeeders()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Successfully seeded database. Closing connection.');
    await dbClient.$disconnect();
  });