import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('posts', (table) => {
    table.uuid('user').references('id').inTable('register')
  })
}

export async function down(knex: Knex): Promise<void> {}
