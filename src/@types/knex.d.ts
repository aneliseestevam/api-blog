// eslint-disable-next-line
import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface Tables {
    register: {
      id: string
      name: string
      email: string
      password: string
      session_id: string
    }
    posts: {
      id: string
      title: string
      content: string
      user: string
    }
  }
}
