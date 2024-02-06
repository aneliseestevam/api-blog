import fastify from 'fastify'
import { env } from './env'
import { loginRoutes } from './routes/login'
import { registerRoutes } from './routes/register'
import { postsRoute } from './routes/posts'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)
app.register(loginRoutes)
app.register(registerRoutes, {
  prefix: '/register',
})
app.register(postsRoute, {
  prefix: '/posts',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server is running on port ${env.PORT}`)
  })
