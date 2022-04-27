const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Jwt = require('@hapi/jwt')
const path = require('path')

const { printAsciiArtLogo } = require('@utils/index')

const AlbumsService = require('@services/postgresql/albums_service')
const { AlbumValidator } = require('@validators/album')

const SongsService = require('@services/postgresql/songs_service')
const { SongValidator } = require('@validators/song')

const AuthenticationService = require('@services/postgresql/authentication_service')
const AuthenticationValidators = require('@validators/authentication')
const TokenManager = require('@utils/tokenise/token_manager')

const UsersService = require('@services/postgresql/users_service')
const { UserValidator } = require('@validators/user')

const PlaylistValidators = require('@validators/playlist')
const PlaylistsService = require('@services/postgresql/playlists_service')

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
  /**
   * @param {any} artifacts JWT artifacts
   * @returns {{isValid: boolean, credentials: {id: string}}} Validation result
   */
  const validateJwt = (artifacts) => ({
    isValid: true,
    credentials: {
      id: artifacts.decoded.payload.id
    }
  })

  await server.register(Inert)
  await server.register(Jwt)

  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE
    },
    validate: validateJwt
  })

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

  // Authentications Plugin
  server.register({
    plugin: require('./api/authentications'),
    options: {
      authenticationsService: new AuthenticationService(),
      usersService: new UsersService(),
      validators: AuthenticationValidators,
      tokenManager: new TokenManager()
    },
    routes: {
      prefix: '/authentications'
    }
  })

  // Authentications Plugin
  server.register({
    plugin: require('./api/playlists'),
    options: {
      service: new PlaylistsService(),
      validator: PlaylistValidators
    },
    routes: {
      prefix: '/playlists'
    }
  })

  // Users Plugin
  server.register({
    plugin: require('./api/users'),
    options: {
      service: new UsersService(),
      validator: UserValidator
    },
    routes: {
      prefix: '/users'
    }
  })

  // Albums Plugin
  server.register({
    plugin: require('./api/albums'),
    options: {
      service: new AlbumsService(),
      validator: AlbumValidator
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
      validator: SongValidator
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

  // Invalid routes
  server.route({
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
      return h.response({
        status: 'error',
        message: 'Not Found'
      }).code(404)
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
