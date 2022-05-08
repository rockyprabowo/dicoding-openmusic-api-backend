const Hapi = require('@hapi/hapi')

const { printAsciiArtLogo } = require('~utils/index')
const { registerPlugins } = require('./plugin_registrations')

/**
 * Server module
 *
 * @module server
 */

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
 * Initialise the server and listen to configured host and port
 *
 * @returns {Promise<Hapi.Server>} Hapi server object
 */
const start = async () => {
  printAsciiArtLogo()
  await registerPlugins(server)
  await server.start()
  console.log(`Server berjalan di: ${server.info.uri}`)
  return server
}

/**
 * Initialise the server without listening to configured host and port
 *
 * @returns {Promise<Hapi.Server>} Hapi server object
 */
const init = async () => {
  await registerPlugins(server)
  await server.initialize()
  return server
}

module.exports = { start, init }
