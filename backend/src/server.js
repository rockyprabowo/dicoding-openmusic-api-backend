const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Jwt = require('@hapi/jwt')
const path = require('path')

const { printAsciiArtLogo } = require('~utils/index')

const AlbumsService = require('@openmusic/common/services/postgresql/albums_service')
const AlbumValidator = require('~validators/album')

const SongsService = require('@openmusic/common/services/postgresql/songs_service')
const SongValidator = require('~validators/song')

const AuthenticationsService = require('@openmusic/common/services/postgresql/authentications_service')
const AuthenticationValidators = require('~validators/authentication')
const TokenManager = require('~utils/tokenise/token_manager')

const UsersService = require('@openmusic/common/services/postgresql/users_service')
const UserValidator = require('~validators/user')

const PlaylistsService = require('@openmusic/common/services/postgresql/playlists_service')
const PlaylistValidators = require('~validators/playlist')
const CollaborationsService = require('@openmusic/common/services/postgresql/collaborations_service')
const CollaborationValidator = require('~validators/collaboration')

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
  const songsService = new SongsService()
  const albumsService = new AlbumsService(songsService)
  const authenticationsService = new AuthenticationsService()
  const usersService = new UsersService()
  const collaborationsService = new CollaborationsService(usersService)
  const playlistsService = new PlaylistsService(collaborationsService, songsService)

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

  // Developers Documentation Plugin
  server.register({
    plugin: require('./api/devdocs'),
    options: {
      docsPath: path.resolve(__dirname, '../public/devdocs')
    },
    routes: {
      prefix: '/devdocs'
    }
  })

  // Authentications Plugin
  server.register({
    plugin: require('./api/authentications'),
    options: {
      authenticationsService,
      usersService,
      validators: AuthenticationValidators,
      tokenManager: new TokenManager()
    },
    routes: {
      prefix: '/authentications'
    }
  })

  // Collaborations Plugin
  server.register({
    plugin: require('./api/collaborations'),
    options: {
      collaborationsService,
      playlistsService,
      validator: new CollaborationValidator()
    },
    routes: {
      prefix: '/collaborations'
    }
  })

  // Playlist Plugin
  server.register({
    plugin: require('./api/playlists'),
    options: {
      playlistsService,
      validators: PlaylistValidators
    },
    routes: {
      prefix: '/playlists'
    }
  })

  // Users Plugin
  server.register({
    plugin: require('./api/users'),
    options: {
      usersService,
      validator: new UserValidator()
    },
    routes: {
      prefix: '/users'
    }
  })

  // Albums Plugin
  server.register({
    plugin: require('./api/albums'),
    options: {
      albumsService,
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
      songsService,
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
      return h.redirect('/devdocs')
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
