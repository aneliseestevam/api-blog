import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('posts', (table) => {
    table.string('id').primary()
    table.string('title').notNullable()
    table.string('content').notNullable()
    table.string('user').notNullable().references('id').inTable('register')
  })
}

export async function down(knex: Knex): Promise<void> {}
