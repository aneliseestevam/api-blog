import { FastifyInstance, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

export async function loginRoutes(app: FastifyInstance) {
  app.post('/login', async (request: FastifyRequest) => {
    const createLoginSchema = z.object({
      email: z.string(),
      password: z.string(),
    })
    const { email, password } = createLoginSchema.parse(request.body)

    const register = await knex('register').where({ email, password }).first()

    if (!register) {
      throw new Error('Invalid credentials')
    }

    return register
  })
}
