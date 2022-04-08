require('dotenv').config()
const Hapi = require('@hapi/hapi')

const server = Hapi.server({
  port: process.env.PORT || 5000,
  host: process.env.HOST || 'localhost',
  routes: {
    cors: {
      origin: ['*']
    }
  }
})

const registerPlugins = async () => {
  /// TODO: Plugin registrations goes here
  /// For now, it's just a route for GET / with "Hello, world" as the response

  server.route({
    method: 'GET',
    path: '/',
    handler: function () {
      return 'Hello World!'
    }
  })
  return server
}

const start = async () => {
  await registerPlugins()
  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`)
  return server
}

const init = async () => {
  await registerPlugins()
  await server.initialize()
  return server
}

module.exports = { start, init }
