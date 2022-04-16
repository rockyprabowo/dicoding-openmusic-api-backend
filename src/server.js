const Hapi = require('@hapi/hapi')
require('dotenv').config()

/**
 * Server object
 *
 * @type {Hapi.Server}
 */
const server = Hapi.server({
  port: process.env.PORT,
  host: process.env.HOST,
  routes: {
    cors: {
      origin: ['*']
    }
  }
})

/**
 * Server plugins registrations
 *
 * @returns {Promise<Hapi.Server>} Hapi server object
 */
const registerPlugins = async () => {
  // TODO: Plugin registrations goes here
  // For now, it's just a route for GET / with "Hello, world" as the response
  server.route({
    method: 'GET',
    path: '/',
    handler: function () {
      return 'Hello World!'
    }
  })
  return server
}

/**
 * Initialise the server and listen to configured host and port
 *
 * @returns {Promise<Hapi.Server>} Hapi server object
 */
const start = async () => {
  await registerPlugins()
  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`)
  return server
}

/**
 * Initialise the server without listening to configured host and port
 *
 * @returns {Promise<Hapi.Server>} Hapi server object
 */
const init = async () => {
  await registerPlugins()
  await server.initialize()
  return server
}

module.exports = { start, init }
