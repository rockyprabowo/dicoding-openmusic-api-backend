const Hapi = require('@hapi/hapi')
const path = require('path')
const AlbumsService = require('@services/postgresql/albums_service')
const SongsService = require('@services/postgresql/songs_service')
const AlbumValidator = require('@validators/album')
const SongValidator = require('@validators/song')
const { printAsciiArtLogo } = require('@utils/index')

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
 * Server plugins registrations
 *
 * @returns {Promise<Hapi.Server>} Hapi server object
 */
const registerPlugins = async () => {
  await server.register(require('@hapi/inert'))

  // Documentation Plugin
  server.register({
    plugin: require('./api/docs'),
    options: {
      docsPath: path.resolve(__dirname, '../public/docs')
    },
    routes: {
      prefix: '/docs'
    }
  })

  // Albums Plugin
  server.register({
    plugin: require('./api/albums'),
    options: {
      service: new AlbumsService(),
      validator: new AlbumValidator()
    },
    routes: {
      prefix: '/albums'
    }
  })

  // Songs Plugin
  server.register({
    plugin: require('./api/songs'),
    options: {
      service: new SongsService(),
      validator: new SongValidator()
    },
    routes: {
      prefix: '/songs'
    }
  })

  // Redirect to documentation
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return h.redirect('/docs')
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
  console.log(`Server berjalan di: ${server.info.uri}`)
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
