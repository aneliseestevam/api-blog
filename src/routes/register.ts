import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'

export async function registerRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const register = await knex('register').select('*')

    return register
  })

  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const createRegisterSchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })
    const { name, email, password } = createRegisterSchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
      })
    }

    const register = await knex('register')
      .insert({
        id: crypto.randomUUID(),
        name,
        email,
        password,
        session_id: sessionId,
      })
      .returning('*')

    return register
  })

  app.get('/:id', async (request: FastifyRequest) => {
    const createIdSchema = z.object({
      id: z.string(),
    })
    const { id } = createIdSchema.parse(request.params)

    const register = await knex('register').where({ id }).first()

    return register
  })
}
