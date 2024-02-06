import { env } from './env'
import { knex as setupKnex } from 'knex'

export const config = {
  client: 'sqlite3',
  connection: {
    filename: env.DATABASE_URL,
  },
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
  useNullAsDefault: true,
}

export const knex = setupKnex(config)
