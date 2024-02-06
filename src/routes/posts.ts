import { FastifyInstance, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'

export async function postsRoute(app: FastifyInstance) {
  app.get('/', async () => {
    const posts = await knex('posts').select('*')

    return { posts }
  })

  app.post('/', async (request: FastifyRequest) => {
    const createPostsSchema = z.object({
      title: z.string(),
      content: z.string(),
      user: z.string().uuid(),
    })

    const { title, content, user } = createPostsSchema.parse(request.body)

    const register = await knex('register').where({ id: user }).first()

    const posts = await knex('posts')
      .insert({
        id: crypto.randomUUID(),
        title,
        content,
        user: register?.id,
      })
      .returning('*')

    return posts
  })

  app.get('/:id', async (request: FastifyRequest) => {
    const createIdSchema = z.object({
      id: z.string(),
    })

    const { id } = createIdSchema.parse(request.params)

    const posts = await knex('posts').where({ id }).first()

    return posts
  })

  app.delete('/:id', async (request: FastifyRequest) => {
    const createIdSchema = z.object({
      id: z.string(),
    })

    const { id } = createIdSchema.parse(request.params)

    await knex('posts').where({ id }).delete()

    return { success: true }
  })

  app.put('/:id', async (request: FastifyRequest) => {
    const createIdSchema = z.object({
      id: z.string(),
    })

    const createPostsSchema = z.object({
      title: z.string(),
      content: z.string(),
    })

    const { id } = createIdSchema.parse(request.params)
    const { title, content } = createPostsSchema.parse(request.body)

    const posts = await knex('posts')
      .where({ id })
      .update({
        title,
        content,
      })
      .returning('*')

    return posts
  })

  app.get('/user/:id', async (request: FastifyRequest) => {
    const createIdSchema = z.object({
      id: z.string(),
    })

    const { id } = createIdSchema.parse(request.params)

    const posts = await knex('posts').where({ user: id })

    return posts
  })
}
