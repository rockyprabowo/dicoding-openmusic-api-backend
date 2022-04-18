const Hapi = require('@hapi/hapi')
const path = require('path')

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
 * Prints ASCII Art Logo to console
 *
 */
const printAsciiArtLogo = () => {
  console.log(require('../ascii_art.json').projectName)
}

/**
 * Server plugins registrations
 *
 * @returns {Promise<Hapi.Server>} Hapi server object
 */
const registerPlugins = async () => {
  // TODO: Plugin registrations goes here
  await server.register(require('@hapi/inert'))

  server.register({
    plugin: require('./api/docs'),
    options: {
      docsPath: path.resolve(__dirname, '../public/docs')
    },
    routes: {
      prefix: '/docs'
    }
  })

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
  printAsciiArtLogo()
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
