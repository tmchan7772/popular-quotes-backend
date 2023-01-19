### Prepare database
- Install pgadmin. Create new database with name "popular-quotes" with schema "public"
- Create your own .env file by copying .env_example file
- Run: npx prisma db push - this will sync you db with model
- Run: npx prisma generate - to update prisma client
- Run: npm run seed - this will run seed data

### Run API
- Create your own .env file based on .env_example
- Run npm run start
- Open localhost:8000

### Development
- Run npm run dev
- To debug in VSCode press F5
- Open localhost:8000

### Migration
#### Apply current migrations
- Run: npx prisma migrate dev

#### Create new migration
- Change a schema model (prisma/schema.prisma)
- Run: npx prisma migrate dev --name new_table_created - this will create new sql file and apply it immediately
- Run: npx prisma generate - to update prisma client

#### Sync database with model without creating migration
- Change a schema model (prisma/schema.prisma)
- Run: npx prisma db push

#### Undo manual changes
- npx prisma migrate reset

### Run tests
- Prepare database
- Run: npm run test