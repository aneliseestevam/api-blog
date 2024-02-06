import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('register', (table) => {
    table.uuid('session_id')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('register', (table) => {
    table.dropColumn('session_id')
  })
}
